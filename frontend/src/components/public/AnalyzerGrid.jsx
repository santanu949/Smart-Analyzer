import React, { useState } from 'react';
import { TextArea } from '../ui/Inputs';
import { Button } from '../ui/Buttons';
import { Label, Title, Body } from '../ui/Typography';
import { Activity, ShieldCheck, TerminalSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const AnalyzerGrid = () => {
  const [code, setCode] = useState('function withdraw(uint256 amount) public {\n  require(balances[msg.sender] >= amount);\n  msg.sender.call.value(amount)("");\n  balances[msg.sender] -= amount;\n}');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);

  const handleScan = async () => {
    setIsScanning(true);
    setResults(null);
    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to analyze contract');
      }
      
      // Map backend vulnerability model to frontend visual type
      const mappedResults = data.vulnerabilities.map(v => ({
        type: v.risk_level.toLowerCase() === 'high' ? 'critical' : 'warning',
        msg: `${v.name}: ${v.explanation}`,
        fix: v.suggested_fix
      }));
      
      setResults(mappedResults.length > 0 ? mappedResults : [{ type: 'warning', msg: 'No vulnerabilities detected by AI.' }]);
    } catch (err) {
      setResults([{ type: 'critical', msg: `Connection Error: ${err.message}` }]);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 glass-panel p-2 sm:p-4 block lg:flex gap-4 min-h-[500px]">
      
      {/* Editor Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 p-4 lg:p-6 bg-zinc-50/50 rounded-xl border border-zinc-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalSquare className="w-5 h-5 text-zinc-500" />
            <Title className="text-zinc-700">Contract Source</Title>
          </div>
          <Label className="bg-white px-3 py-1 rounded-full shadow-sm text-zinc-500">Solidity / Rust</Label>
        </div>
        
        <div className="flex-1 relative">
          <TextArea 
            value={code} 
            onChange={(e) => setCode(e.target.value)}
            className="h-full min-h-[300px] font-mono text-xs md:text-sm text-zinc-800 bg-white"
            style={{ tabSize: 2 }}
          />
        </div>
        
        <div className="flex justify-end pt-2">
          <Button onClick={handleScan} disabled={isScanning} className="w-full sm:w-auto shadow-md">
            {isScanning ? (
              <span className="flex items-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Activity className="w-4 h-4" /></motion.div>
                Scanning...
              </span>
            ) : "Analyze Contract"}
          </Button>
        </div>
      </div>

      {/* Output / Terminal Section (Dark Mode Preview within Light Mode) */}
      <div className="w-full lg:w-1/2 mt-4 lg:mt-0 bg-[#0e0e10] rounded-xl border border-[#353437] shadow-xl p-4 lg:p-6 flex flex-col">
        <div className="flex items-center justify-between border-b border-[#353437] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-cyan" />
            <span className="font-mono text-xs uppercase tracking-tactical text-brand-cyan">Neural Output</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ffb4ab]"></div>
            <div className="w-3 h-3 rounded-full bg-[#f9bd22]"></div>
            <div className="w-3 h-3 rounded-full bg-[#45dfa4]"></div>
          </div>
        </div>

        <div className="flex-1 font-mono text-xs md:text-sm text-tactical-text space-y-4 overflow-y-auto">
          {!results && !isScanning && (
            <div className="text-tactical-textDim opacity-50 flex flex-col items-center justify-center h-full gap-2">
              <Activity className="w-8 h-8 mb-2" />
              <p>Awaiting payload for neural analysis.</p>
            </div>
          )}
          
          {isScanning && (
            <div className="space-y-2">
              <p className="text-brand-cyan">{"["}SYS{"]"} Initializing heuristic scanner v4.0.2...</p>
              <p className="text-brand-cyan opacity-80">{"["}DECRYPT{"]"} Parsing contract AST...</p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-brand-cyan opacity-60">{"["}STATIC{"]"} Checking for common anti-patterns...</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-brand-cyan opacity-40">{"["}NEURAL{"]"} Running intent simulation...</motion.p>
            </div>
          )}

          {results && (
            <div className="space-y-3">
              <p className="text-brand-emerald">{"["}SUCCESS{"]"} Scan complete. Anomalies detected.</p>
              {results.map((res, i) => (
                <div key={i} className={`p-3 border-l-2 ${res.type === 'critical' ? 'border-[#ffb4ab] bg-[#ffb4ab]/10 text-[#ffb4ab]' : 'border-[#f9bd22] bg-[#f9bd22]/10 text-[#f9bd22]'}`}>
                  <span className="uppercase font-bold tracking-wider text-[10px] block mb-1 opacity-80">{res.type} THREAT</span>
                  {res.msg}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-[#353437]/50">
                <Button theme="admin" variant="secondary" className="w-full">Export Cryptographic Proof</Button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
