import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CodeInput = ({ onAnalyze, isLoading }) => {
  const [code, setCode] = useState('');
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
      onAnalyze(code);
    }
  };

  return (
    <div className="flex flex-col h-full" data-testid="code-input-panel">
      <div className="flex-1 bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200" data-testid="code-editor-header">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <span className="text-xs text-gray-500 ml-3 font-medium">contract.sol</span>
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
              className="w-full h-full px-6 py-6 font-mono text-sm leading-6 resize-none focus:outline-none bg-white text-gray-900 placeholder:text-gray-400"
              style={{ tabSize: 4 }}
              data-testid="code-textarea"
            />
          </div>
        </div>
      </div>

      {/* Analyze Button */}
      <motion.button
        whileHover={{ scale: isLoading ? 1 : 1.01 }}
        whileTap={{ scale: isLoading ? 1 : 0.99 }}
        onClick={handleAnalyze}
        disabled={isLoading || !code.trim()}
        className="mt-6 w-full py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
  );
};

export default CodeInput;
