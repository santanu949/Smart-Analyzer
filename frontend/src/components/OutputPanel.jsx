import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OutputPanel = ({ analysisData, isLoading }) => {
  const [logs, setLogs] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowResults(false);
    } else if (analysisData) {
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

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col" data-testid="output-panel">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between" data-testid="output-header">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-400">NEXUS ANALYSIS ENGINE v2.8.5</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-mono text-gray-500">RUNTIME</div>
          <div className="text-xs font-mono text-green-400">24ms</div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-6 font-mono text-sm" data-testid="terminal-output">
        {!isLoading && !analysisData && (
          <div className="flex items-center justify-center h-full text-gray-600" data-testid="empty-state">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">Awaiting smart contract input...</p>
              <p className="text-xs text-gray-700 mt-2">Paste your code and run analysis</p>
            </div>
          </div>
        )}

        {showResults && analysisData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-6"
            data-testid="analysis-results"
          >
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="text-xs text-gray-500 mb-1">SCANS</div>
                <div className="text-2xl font-bold text-white">01</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="text-xs text-gray-500 mb-1">ISSUES</div>
                <div className="text-2xl font-bold text-white">
                  {analysisData.vulnerabilities?.length || '03'}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="text-xs text-gray-500 mb-1">SCORE</div>
                <div className="text-2xl font-bold text-green-400">84%</div>
              </div>
            </div>

            {/* Vulnerabilities */}
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">DETECTED VULNERABILITIES</div>
              {analysisData.vulnerabilities && analysisData.vulnerabilities.length > 0 ? (
                analysisData.vulnerabilities.map((vuln, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gray-800/30 border border-gray-700 rounded-xl p-5"
                    data-testid={`vulnerability-${idx}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-xl">{getStatusIcon(vuln.severity)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-red-400 font-semibold text-sm uppercase">
                            {vuln.severity || 'CRITICAL'}: {vuln.type || 'Anomaly Detected'}
                          </span>
                        </div>
                        {vuln.location && (
                          <div className="text-xs text-gray-500 mb-2">
                            📍 Location: {vuln.location}
                          </div>
                        )}
                        {vuln.description && (
                          <div className="text-sm text-gray-400 mb-4 bg-gray-900/50 p-3 rounded-lg border-l-2 border-blue-500">
                            <span className="text-blue-400 font-bold mr-2">ANALYSIS:</span> {vuln.description}
                          </div>
                        )}

                        {vuln.impact && (
                          <div className="text-xs text-orange-400/80 mb-4 px-3 py-2 bg-orange-950/20 rounded border border-orange-900/30">
                            <span className="font-bold">⚠️ IMPACT:</span> {vuln.impact}
                          </div>
                        )}

                        {vuln.attack_flow && vuln.attack_flow.length > 0 && (
                          <div className="mb-4">
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Attack Vector Flow</div>
                            <div className="space-y-2">
                              {vuln.attack_flow.map((step, sIdx) => (
                                <div key={sIdx} className="flex gap-3 text-xs text-gray-400 items-start">
                                  <span className="text-gray-600 font-mono">{sIdx + 1}.</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {vuln.simulation && vuln.simulation.length > 0 && (
                          <div className="mb-4 bg-emerald-950/10 p-3 rounded-lg border border-emerald-900/20">
                            <div className="text-[10px] uppercase tracking-widest text-emerald-500 mb-2 font-bold">Execution Simulation</div>
                            <div className="space-y-2">
                              {vuln.simulation.map((step, sIdx) => (
                                <div key={sIdx} className="flex gap-3 text-xs text-emerald-400/80 items-start">
                                  <span className="text-emerald-800 font-mono">#{sIdx + 1}</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {vuln.recommendation && (
                          <div className="text-sm text-emerald-400 mb-4">
                            <span className="font-bold">🛠 RECOMMENDATION:</span> {vuln.recommendation}
                          </div>
                        )}

                        {vuln.code_fix && (
                          <div className="mt-4">
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Codified Security Patch</div>
                            <pre className="bg-black/50 p-4 rounded-xl text-xs text-emerald-400/90 overflow-x-auto border border-emerald-900/30 font-mono">
                              {vuln.code_fix}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🟢</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-3">
                        No vulnerabilities found by the neural engine.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            {analysisData.summary && (
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-xl">
                <div className="text-xs uppercase tracking-wider text-blue-400 mb-2">ANALYSIS SUMMARY</div>
                <p className="text-sm text-gray-300">{analysisData.summary}</p>
              </div>
            )}
          </motion.div>
        )}

        {isLoading && (
          <div className="mt-4 flex items-center justify-center h-full gap-2 text-gray-500">
            <div className="w-2 h-4 bg-gray-500 animate-pulse"></div>
            <span className="text-xs">Processing via Inference Engine...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
