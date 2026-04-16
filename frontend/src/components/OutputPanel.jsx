import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OutputPanel = ({ analysisData, isLoading }) => {
  const [logs, setLogs] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [runtimeMs, setRuntimeMs] = useState(null);
  const startTimeRef = React.useRef(null);

  useEffect(() => {
    if (isLoading) {
      setShowResults(false);
      startTimeRef.current = performance.now();
    } else if (analysisData) {
      if (startTimeRef.current) {
        setRuntimeMs(Math.round(performance.now() - startTimeRef.current));
        startTimeRef.current = null;
      }
      setShowResults(true);
    }
  }, [isLoading, analysisData]);

  const getLogColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'success':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'text-red-500';
      case 'high':
        return 'text-red-400';
      case 'medium':
      case 'warning':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-blue-400';
    }
  };

  const getStatusIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return '🔴';
      case 'medium':
      case 'warning':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '🔵';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const formatRuntime = (ms) => {
    if (!ms) return null;
    return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
  };

  const getModeLabel = (m) => {
    switch (m) {
      case 'groq': return { label: 'GROQ', cls: 'text-violet-400 border-violet-700 bg-violet-900/20' };
      case 'rag': return { label: 'RAG', cls: 'text-emerald-400 border-emerald-700 bg-emerald-900/20' };
      case 'ollama': return { label: 'OLLAMA', cls: 'text-amber-400 border-amber-700 bg-amber-900/20' };
      default: return { label: m?.toUpperCase() || 'LLM', cls: 'text-gray-400 border-gray-700' };
    }
  };

  const modeInfo = getModeLabel(analysisData?.mode_used);

  return (
    <div className="relative h-full bg-[#050508]/80 backdrop-blur-3xl rounded-[32px] shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col border border-white/10 ring-1 ring-inset ring-white/5" data-testid="output-panel">
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNeCAzMGg0ME0xMCAwdjQwbTEwLTQwdjQwbTEwLTQwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] pointer-events-none opacity-60"></div>

      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      {/* Header */}
      <div className="relative px-7 py-5 flex items-center justify-between border-b border-white/5 bg-black/20" data-testid="output-header">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
          </div>
          <span className="text-[11px] font-bold tracking-widest text-slate-300">NEXUS ANALYSIS ENGINE <span className="text-emerald-400">v2.8.5</span></span>
        </div>
        <div className="flex items-center gap-4">
          {analysisData?.mode_used && (
            <span className={`text-[10px] font-black font-mono px-2.5 py-1 rounded border shadow-sm ${modeInfo.cls}`}>
              {modeInfo.label}
            </span>
          )}
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-mono tracking-widest text-slate-500">RUNTIME</div>
            <div className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
              {runtimeMs !== null ? `${runtimeMs}ms` : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden p-8 font-mono text-sm z-10 custom-scrollbar" data-testid="terminal-output">
        {!isLoading && !analysisData && (
          <div className="flex items-center justify-center h-full text-slate-500" data-testid="empty-state">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center flex flex-col items-center"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                <svg className="w-20 h-20 text-slate-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm tracking-wide text-slate-300 font-semibold mb-2">Awaiting smart contract input...</p>
              <p className="text-xs text-slate-500">Paste your code and run analysis</p>
            </motion.div>
          </div>
        )}

        {showResults && analysisData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
            data-testid="analysis-results"
          >
            {/* Metrics */}
            <div className="grid grid-cols-4 gap-5 mb-10">
              {[
                { label: 'SCANS',    val: '01', col: 'text-white' },
                { label: 'ISSUES',   val: analysisData.vulnerabilities?.length ?? 0, col: 'text-white' },
                {
                  label: 'SCORE',
                  val: analysisData.score !== undefined ? `${analysisData.score}%` : '—',
                  col: getScoreColor(analysisData.score ?? 100),
                },
                {
                  label: 'ACCURACY',
                  val: analysisData.accuracy !== undefined ? `${analysisData.accuracy}%` : '—',
                  col: 'text-cyan-400',
                },
              ].map((item, i) => (
                <div key={i} className="relative bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-lg group hover:bg-slate-800/50 transition-colors">
                  <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
                  <div className="text-[10px] font-bold text-slate-500 mb-2 tracking-widest">{item.label}</div>
                  <div className={`text-3xl font-light tracking-tight ${item.col}`}>{item.val}</div>
                </div>
              ))}
            </div>

            {/* Vulnerabilities */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-px bg-slate-800 flex-1"></div>
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-500">DETECTED VULNERABILITIES</div>
                <div className="h-px bg-slate-800 flex-1"></div>
              </div>

              {analysisData.vulnerabilities && analysisData.vulnerabilities.length > 0 ? (
                analysisData.vulnerabilities.map((vuln, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15, ease: 'easeOut' }}
                    className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl overflow-hidden group hover:border-white/20 transition-all duration-300"
                    data-testid={`vulnerability-${idx}`}
                  >
                    {/* Left accent line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/50 to-orange-500/50 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex items-start gap-4">
                      <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{getStatusIcon(vuln.severity)}</span>
                      <div className="flex-1 w-full min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className={`inline-flex items-center px-3 py-1 space-x-2 font-bold text-[10px] uppercase rounded-full border shadow-sm ${getSeverityColor(vuln.severity)} bg-opacity-10 border-opacity-20`}>
                            <span>{vuln.severity || 'CRITICAL'}</span>
                          </span>
                          <span className="text-sm font-bold text-slate-200 truncate pr-4">
                            {vuln.type || 'Anomaly Detected'}
                          </span>
                        </div>

                        {vuln.location && (
                          <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-400 mb-4 font-medium">
                            <span className="text-cyan-500 mr-2">📍 Location</span> {vuln.location}
                          </div>
                        )}

                        {(vuln.description || vuln.explanation) && (
                          <div className="text-sm text-slate-300 mb-5 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 shadow-inner">
                            <span className="text-cyan-400 font-bold mr-2 text-[11px] tracking-widest uppercase">Analysis //</span>
                            {vuln.description || vuln.explanation}
                          </div>
                        )}

                        {vuln.impact && (
                          <div className="text-xs text-orange-300 mb-5 px-4 py-3 bg-gradient-to-r from-orange-500/10 to-transparent rounded-xl border border-orange-500/20 border-l-2 border-l-orange-500">
                            <span className="font-bold tracking-widest uppercase text-[10px] text-orange-400 mr-2">⚠️ Impact</span> {vuln.impact}
                          </div>
                        )}

                        {vuln.attack_flow && vuln.attack_flow.length > 0 && (
                          <div className="mb-6">
                            <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500 mb-3 font-bold">Attack Vector Flow</div>
                            <div className="space-y-3">
                              {vuln.attack_flow.map((step, sIdx) => (
                                <div key={sIdx} className="flex gap-4 text-[13px] text-slate-400 items-start group-hover:text-slate-300 transition-colors">
                                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-500">{sIdx + 1}</span>
                                  <span className="mt-0.5">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {vuln.simulation && vuln.simulation.length > 0 && (
                          <div className="mb-6 bg-gradient-to-br from-emerald-950/30 to-blue-950/20 p-4 rounded-xl border border-emerald-900/30 shadow-inner">
                            <div className="text-[10px] uppercase tracking-[0.15em] text-emerald-500 mb-3 font-bold flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Execution Simulation
                            </div>
                            <div className="space-y-3">
                              {vuln.simulation.map((step, sIdx) => (
                                <div key={sIdx} className="flex gap-3 text-xs text-emerald-300/80 items-start font-mono">
                                  <span className="text-emerald-600 font-bold opacity-70">#{(sIdx + 1).toString().padStart(2, '0')}</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {(vuln.recommendation || vuln.fix) && (
                          <div className="text-[13px] text-emerald-400 mb-5 bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                            <span className="font-bold tracking-widest uppercase text-[10px] mr-2">🛠 Recommendation</span> {vuln.recommendation || vuln.fix}
                          </div>
                        )}

                        {vuln.code_fix && (
                          <div className="mt-5 relative">
                            <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-2 font-bold px-1">Codified Security Patch</div>
                            <pre className="relative bg-[#0d0d12] p-5 rounded-xl text-[12px] text-emerald-400/90 overflow-x-auto border border-white/5 font-mono shadow-inner custom-scrollbar">
                              <div className="absolute top-0 right-0 p-2 opacity-50"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></div>
                              <code>{vuln.code_fix}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">🟢</span>
                    <div>
                      <h4 className="text-emerald-400 font-bold text-sm tracking-wide mb-1">Architecture Secure</h4>
                      <p className="text-xs text-slate-400 font-medium">No vulnerabilities found by the neural engine during analysis.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Summary Box */}
            {analysisData.summary && (
              <div className="mt-10 p-5 bg-gradient-to-br from-cyan-950/40 to-blue-900/20 border border-cyan-700/30 rounded-2xl shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-cyan-400 mb-3 font-bold flex items-center justify-between">
                  <span>Analysis Summary</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-300 font-medium relative z-10">{analysisData.summary}</p>
              </div>
            )}
          </motion.div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-[#050508]/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500/30 blur-2xl rounded-full animate-pulse"></div>
              <div className="w-16 h-16 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
            <div className="flex items-center gap-3 bg-black/40 px-5 py-2.5 rounded-full border border-white/5 shadow-xl">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-[11px] font-bold tracking-widest text-indigo-300 uppercase">Processing via Inference Engine...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
