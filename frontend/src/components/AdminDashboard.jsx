import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, RefreshCw, LogOut, ShieldAlert, Mail, User, Phone, 
  Clock, FileText, ChevronRight, Activity, Terminal
} from 'lucide-react';

const GAS_URL = import.meta.env.VITE_GAS_URL;

const AdminDashboard = ({ onLogout }) => {
  const [data, setData] = useState({ contacts: [], scans: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setSelectedEntry(null);
    
    // Add a timeout controller 
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const res = await fetch(`${GAS_URL}?type=data`, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      const rows = await res.json();
      
      // Catch backend errors explicitly
      if (rows && rows.success === false) {
        throw new Error(`Data Layer Error: ${rows.message}. Did you replace YOUR_GOOGLE_SHEET_ID?`);
      }

      // Attempt to parse out sheets data safely
      if (!Array.isArray(rows)) {
        throw new Error("Invalid payload structure received from the Data Layer: " + JSON.stringify(rows));
      }

      const dataRows = rows.length > 1 ? rows.slice(1) : []; // skip header
      const contactsList = [];
      const scansList = [];

      dataRows.forEach(row => {
        const item = {
          date: row[0],
          name: row[1],
          phone: row[2],
          email: row[3],
          subject: row[4],
          message: row[5],
          contractInput: row[6],
          contractOutput: row[7]
        };

        if (item.contractInput && item.contractInput !== "") {
          scansList.push(item);
        } else {
          contactsList.push(item);
        }
      });

      setData({ 
        contacts: contactsList.reverse(), 
        scans: scansList.reverse() 
      });
      
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Connection to Nexus Data Layer timed out. The server might be unreachable.');
      } else if (err.message) {
        // Allow explicit error messages (like our Data Layer Error) to pass through to the UI
        setError(err.message);
      } else {
        setError('Failed to authenticate or fetch data. Please check your Google Apps Script configuration and CORS permissions.');
      }
      console.error("Transmission Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const formatDate = (isoString) => {
    if (!isoString) return 'Unknown';
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return String(isoString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(d);
  };

  const getLogSeverity = (outputString) => {
    if(!outputString) return 'LOW';
    if(outputString.includes('"severity": "CRITICAL"') || outputString.includes('"severity": "HIGH"')) return 'CRITICAL';
    if(outputString.includes('"severity": "MEDIUM"')) return 'MEDIUM';
    return 'LOW';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 p-4 sm:p-6 lg:p-10 font-sans relative overflow-hidden flex flex-col items-center">
      {/* Background Ambience */}
      <div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-900/10 mix-blend-screen filter blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gray-800/30 mix-blend-screen filter blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-[1500px] relative z-10 flex flex-col h-full gap-6">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800/80 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <Database className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Nexus Command Center
              </h1>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 tracking-widest mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE SYSTEM FEED
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={fetchData} 
              disabled={loading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-700/50 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>
            <button 
              onClick={onLogout} 
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black font-semibold rounded-lg text-sm hover:bg-gray-200 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Exit
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-160px)]">
          
          {/* Main List Section */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-900/40 border border-gray-800/60 rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Tabs */}
            <div className="flex border-b border-gray-800/60 bg-gray-900/60 font-mono text-xs tracking-widest uppercase">
              <button 
                onClick={() => { setActiveTab('contacts'); setSelectedEntry(null); }} 
                className={`flex items-center gap-2 flex-1 py-4 px-6 transition-all border-b-2 ${activeTab === 'contacts' ? 'border-emerald-500 text-white bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
              >
                <Mail className="w-4 h-4" /> Signups & Inquiries
              </button>
              <button 
                onClick={() => { setActiveTab('scans'); setSelectedEntry(null); }} 
                className={`flex items-center gap-2 flex-1 py-4 px-6 transition-all border-b-2 ${activeTab === 'scans' ? 'border-emerald-500 text-white bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
              >
                <ShieldAlert className="w-4 h-4" /> Security Scans
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-emerald-500/80 gap-3">
                  <Activity className="w-8 h-8 animate-pulse" />
                  <span className="font-mono text-sm tracking-widest animate-pulse">ESTABLISHING UPLINK...</span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
                    <ShieldAlert className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Transmission Sequence Failed</h3>
                  <p className="text-sm text-gray-400 max-w-sm">{error}</p>
                  <button onClick={fetchData} className="mt-6 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg border border-gray-700 transition">Retry Connection</button>
                </div>
              ) : (
                <div className="space-y-2">
                  {(activeTab === 'contacts' ? data.contacts : data.scans).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <Terminal className="w-10 h-10 mb-4 opacity-50" />
                      <p className="text-sm">No records found for this sector.</p>
                    </div>
                  ) : (
                    (activeTab === 'contacts' ? data.contacts : data.scans).map((item, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedEntry(item)} 
                        className={`group p-4 rounded-xl cursor-pointer transition-all border ${selectedEntry === item ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-black/40 border-gray-800/60 hover:border-gray-600 hover:bg-gray-800/40'} flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`p-2 rounded-lg ${activeTab === 'contacts' ? 'bg-blue-500/10 text-blue-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {activeTab === 'contacts' ? <User className="w-4 h-4" /> : <CodeIcon />}
                          </div>
                          <div className="min-w-0">
                            <div className={`font-semibold text-sm mb-0.5 truncate ${selectedEntry === item ? 'text-white' : 'text-gray-200'}`}>
                              {activeTab === 'contacts' ? item.name : 'Automated Neural Scan'}
                            </div>
                            <div className="text-xs text-gray-500 truncate flex items-center gap-2">
                              {activeTab === 'contacts' ? item.subject : item.contractInput.substring(0, 50) + '...'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                          <div className="text-[11px] text-gray-500 font-mono hidden sm:flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {formatDate(item.date)}
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform ${selectedEntry === item ? 'text-emerald-400 translate-x-1' : 'text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5'}`} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="xl:w-[500px] flex-shrink-0 flex flex-col bg-gray-900/40 border border-gray-800/60 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800/60 bg-gray-900/60 flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <h2 className="font-semibold text-white tracking-tight">Payload Visualizer</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
              <AnimatePresence mode="wait">
                {!selectedEntry ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-gray-500"
                  >
                    <div className="w-16 h-16 rounded-full border border-gray-800 border-dashed flex items-center justify-center mb-4">
                      <ChevronRight className="w-6 h-6 text-gray-600 outline-none" />
                    </div>
                    <p className="text-sm font-medium text-gray-400 mb-1">No Trace Selected</p>
                    <p className="text-xs max-w-[200px] mx-auto">Select a transmission from the logs to decrypt its payload.</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key={selectedEntry.date}
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {activeTab === 'contacts' ? (
                      <>
                        <PayloadCard label="TIMESTAMP" content={formatDate(selectedEntry.date)} />
                        <div className="grid grid-cols-2 gap-4">
                          <PayloadCard label="NAME" content={selectedEntry.name} />
                          <PayloadCard label="PHONE" content={selectedEntry.phone !== 'N/A' && selectedEntry.phone ? selectedEntry.phone : 'Not Provided'} />
                        </div>
                        <PayloadCard label="EMAIL" content={selectedEntry.email} />
                        <PayloadCard label="SUBJECT" content={selectedEntry.subject} />
                        <div>
                          <label className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest block mb-2">DECRYPTED MESSAGE</label>
                          <div className="text-sm bg-black/60 p-4 rounded-xl border border-gray-800/80 text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                            {selectedEntry.message}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-end">
                          <PayloadCard label="TIMESTAMP" content={formatDate(selectedEntry.date)} />
                          <div className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-widest ${getLogSeverity(selectedEntry.contractOutput) === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                            {getLogSeverity(selectedEntry.contractOutput)} DETECTED
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest block mb-2">RAW_SOURCE_CODE.sol</label>
                          <pre className="text-xs bg-[#050505] p-4 rounded-xl border border-gray-800/80 text-gray-400 font-mono overflow-x-auto max-h-48 custom-scrollbar">
                            {selectedEntry.contractInput}
                          </pre>
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest block mb-2">NEXUS_REPORT.json</label>
                          <pre className="text-xs bg-[#050505] p-4 rounded-xl border border-emerald-900/30 text-emerald-400/90 font-mono overflow-x-auto max-h-64 custom-scrollbar">
                            {selectedEntry.contractOutput}
                          </pre>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
};

const PayloadCard = ({ label, content }) => (
  <div>
    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1.5">{label}</label>
    <div className="text-sm text-gray-200 font-medium">{content}</div>
  </div>
);

const CodeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

export default AdminDashboard;