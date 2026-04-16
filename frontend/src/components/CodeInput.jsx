import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const MODES = [
  { id: 'groq',   label: 'GROQ',   color: 'bg-violet-600', desc: 'Expert Auditor' },
  { id: 'rag',    label: 'RAG',    color: 'bg-emerald-600', desc: 'Knowledge-Enhanced' },
  { id: 'ollama', label: 'OLLAMA', color: 'bg-amber-500',   desc: 'Local gemma4:e4b' },
];

const PLACEHOLDER = `// Paste your smart contract here...
// Example:
// pragma solidity ^0.8.20;
//
// contract MyContract {
//     mapping(address => uint256) public balances;
//
//     function withdraw() external {
//         require(balances[msg.sender] > 0, "No balance");
//         (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
//         require(success);
//         balances[msg.sender] = 0;
//     }
// }`;

export default function CodeInput({ onAnalyze, isLoading }) {
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('groq');
  const textareaRef = useRef(null);
  const gutterRef   = useRef(null);

  const selectedMode = MODES.find((m) => m.id === mode);
  const handleAnalyze = () => { if (code.trim() && !isLoading) onAnalyze(code, mode); };

  // Keep gutter scroll in sync with textarea scroll
  const syncScroll = useCallback(() => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  // Pre-render enough line-number rows; grows only when we actually exceed 200 lines
  const lineCount = Math.max(code.split('\n').length + 5, 30);

  return (
    <div className="flex flex-col h-full overflow-hidden" data-testid="code-input-panel">

      {/* ── Editor Card ── */}
      <div className="flex-1 min-h-0 bg-white rounded-3xl shadow-lg border border-slate-200/70 overflow-hidden flex flex-col">
        
        {/* Title bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 flex-shrink-0" data-testid="code-editor-header">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest ml-2">
            contract.sol
          </span>
        </div>

        {/* Editor body — fixed height, scrolls internally */}
        <div className="flex flex-1 min-h-0 overflow-hidden" data-testid="code-editor-area">
          {/* Line numbers — scrolls in sync with textarea, never expands the card */}
          <div
            ref={gutterRef}
            className="flex-shrink-0 select-none bg-slate-50/60 border-r border-slate-100 text-right px-4 py-6 overflow-hidden"
            data-testid="line-numbers"
            style={{ minWidth: '3rem' }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="font-mono text-[12px] text-slate-300 leading-7">{i + 1}</div>
            ))}
          </div>

          {/* Code textarea — scrolls independently, drives gutter sync */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={syncScroll}
            placeholder={PLACEHOLDER}
            spellCheck={false}
            data-testid="code-textarea"
            className="flex-1 resize-none outline-none font-mono text-[13px] leading-7 text-slate-800 placeholder:text-slate-300 bg-transparent p-6 overflow-auto"
            style={{ tabSize: 4 }}
          />
        </div>
      </div>

      {/* ── Bottom Controls (outside card) ── */}
      <div className="flex-shrink-0 mt-5 space-y-4 px-1">

        {/* Mode label */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Analysis Mode:
          </span>
          <span className="text-[10px] font-medium text-slate-400">
            {selectedMode?.desc}
          </span>
        </div>

        {/* Mode buttons */}
        <div className="flex gap-3" data-testid="mode-selector">
          {MODES.map((m) => {
            const isActive = mode === m.id;
            return (
              <motion.button
                key={m.id}
                onClick={() => setMode(m.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-testid={`mode-btn-${m.id}`}
                className={`flex-1 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all border ${
                  isActive
                    ? `${m.color} text-white border-transparent shadow-md`
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600'
                }`}
              >
                {m.label}
              </motion.button>
            );
          })}
        </div>

        {/* Run Analysis */}
        <motion.button
          onClick={handleAnalyze}
          disabled={isLoading || !code.trim()}
          whileHover={{ scale: (!isLoading && code.trim()) ? 1.01 : 1 }}
          whileTap={{ scale: (!isLoading && code.trim()) ? 0.99 : 1 }}
          data-testid="run-analysis-btn"
          className="w-full py-4 bg-black text-white font-semibold rounded-full hover:bg-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-xl"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span className="text-base">⚡</span>
              <span className="text-[15px]">Run Analysis</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
