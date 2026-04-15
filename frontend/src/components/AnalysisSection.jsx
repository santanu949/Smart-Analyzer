import React, { useState } from 'react';
import axios from 'axios';
import CodeInput from './CodeInput';
import OutputPanel from './OutputPanel';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';
// Added GAS_URL so the sync script knows where to send the data. 
// Make sure VITE_GAS_URL is set in your .env file!
const GAS_URL = import.meta.env.VITE_GAS_URL;

const AnalysisSection = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (code) => {
    setIsLoading(true);
    setError(null);
    setAnalysisData(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/analyze`, {
        code: code,
      });
      
      // Remap backend response format to the frontend format expected by the new UI
      const mappedData = {
        summary: response.data.summary,
        vulnerabilities: response.data.vulnerabilities?.map(v => ({
           severity: v.risk_level?.toUpperCase() || 'HIGH',
           type: v.name || 'Unknown Issue',
           description: v.explanation || '',
           recommendation: v.suggested_fix || '',
           location: v.location || null
        })) || []
      };

      // --- NON-BLOCKING SYNC TO ADMIN DASHBOARD ---
      if (GAS_URL) {
        fetch(GAS_URL, {
          method: 'POST',
          body: JSON.stringify({
            fullName: "Automated AI Scan",
            phone: "N/A",
            email: "N/A",
            subject: "Smart Contract Analysis",
            message: "User generated analysis via the landing page engine.",
            contractInput: code,
            contractOutput: JSON.stringify(mappedData, null, 2)
          }),
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        }).catch(e => console.log("GAS Sync minor failure:", e));
      }
      // ---------------------------------------------

      setAnalysisData(mappedData);
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to analyze contract. Please try again.';
      setError(errorMessage);
      setAnalysisData({
        vulnerabilities: [
          {
            severity: 'CRITICAL',
            type: 'Analysis Failed',
            description: errorMessage,
            location: 'N/A',
          },
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-8 px-6 lg:px-12" data-testid="analysis-section">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Code Input */}
          <div className="h-[500px]">
            <CodeInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>

          {/* Right: Output Panel */}
          <div className="h-[500px]">
            <OutputPanel analysisData={analysisData} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;