import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CodeInput = ({ onAnalyze, isLoading }) => {
  const [code, setCode] = useState('');
  const [useRag, setUseRag] = useState(false);
  const placeholder = `// Paste your smart contract here...
// Example:
// pragma solidity ^0.8.20;
//
// contract MyContract {
//     mapping(address => uint256) public balances;
//
//     function withdraw() external {
//         require(balances[msg.sender] > 0, "No balance");
//         {bool success, } = msg.sender.call{value: balances[msg.sender]}("");
//         require(success);
//         balances[msg.sender] = 0;
//     }
// }`;

  const handleAnalyze = () => {
    if (code.trim() && !isLoading) {
      onAnalyze(code, useRag ? 'rag' : 'groq');
    }
  };

  return (
    <div className="flex flex-col h-full" data-testid="code-input-panel">
      <div className="flex-1 bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-200" data-testid="code-editor-header">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <span className="text-xs text-slate-700 ml-3 font-semibold uppercase tracking-wider">contract.sol</span>
        </div>

        <div className="flex-1 flex overflow-y-auto overflow-x-hidden">
          {/* Line Numbers */}
          <div className="bg-gray-50 px-4 py-6 select-none" data-testid="line-numbers">
            <div className="font-mono text-xs text-gray-400 leading-6">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="text-right">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={placeholder}
              className="w-full h-full px-6 py-6 font-mono text-sm leading-6 resize-none focus:outline-none bg-white text-slate-950 placeholder:text-slate-400 font-medium"
              style={{ tabSize: 4 }}
              data-testid="code-textarea"
            />
          </div>
        </div>
      </div>

      {/* Mode Toggle & Analyze Button */}
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-700 font-bold">Analysis Mode:</span>
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${useRag ? 'text-emerald-500' : 'text-slate-950'}`}>
              {useRag ? 'RAG Enhanced' : 'Standard Groq'}
            </span>
          </div>
          
          <button 
            onClick={() => setUseRag(!useRag)}
            className="flex items-center bg-gray-100 p-1 rounded-full w-24 relative overflow-hidden transition-colors border border-gray-200"
          >
            <div className={`flex-1 text-[9px] font-bold z-10 transition-colors ${!useRag ? 'text-white' : 'text-gray-500'}`}>GROQ</div>
            <div className={`flex-1 text-[9px] font-bold z-10 transition-colors ${useRag ? 'text-white' : 'text-gray-500'}`}>RAG</div>
            <motion.div 
              animate={{ x: useRag ? '100%' : '0%' }}
              className="absolute inset-y-0 left-0 w-1/2 bg-black rounded-full"
            />
          </button>
        </div>

        <motion.button
          whileHover={{ scale: isLoading ? 1 : 1.01 }}
          whileTap={{ scale: isLoading ? 1 : 0.99 }}
          onClick={handleAnalyze}
          disabled={isLoading || !code.trim()}
          className="w-full py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          data-testid="run-analysis-btn"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>Run Analysis</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default CodeInput;
