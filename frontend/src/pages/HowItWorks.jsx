import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ContactModal, LoginModal } from '../components/Modals';

const HowItWorks = () => {
  const [isContactOpen, setContactOpen] = useState(false);
  const [isAdminLoginOpen, setAdminLoginOpen] = useState(false);

  return (
    <div className="min-h-screen relative bg-white" data-testid="how-it-works-page">
      {/* Animated Shared Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-300/80 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-300/80 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-emerald-200/60 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <Navbar onAdminClick={() => setAdminLoginOpen(true)} />

        {/* Hero Area */}
        <section className="pt-40 pb-24 px-6 lg:px-12 bg-transparent">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-700 mb-6 font-mono">
                TECHNICAL WORKFLOW
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9]">
                <span className="text-slate-950 block">High-Fidelity</span>
                <span className="text-slate-400 block mt-2 drop-shadow-sm">Semantic Analysis</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-800 max-w-xl leading-relaxed font-medium">
                NexusScan AI utilizes a proprietary neural-static hybrid engine to dissect smart contracts with surgical precision. Transparency is not a feature, it is our architecture.
              </p>
            </motion.div>

            {/* Simulated UI Card Right Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-[0_24px_48px_rgba(0,0,0,0.04)] lg:ml-auto max-w-md w-full"
            >
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#0e0e11] font-bold">Critical Vulnerability Found</h4>
                  <p className="text-xs text-gray-400 mt-1 font-mono">FILE: Vault.sol | LINE: 47</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-red-50 text-red-600 text-[10px] font-bold tracking-wider">UNRESOLVED</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h5 className="text-[10px] font-bold text-gray-400 tracking-wider mb-2">DESCRIPTION</h5>
                <p className="text-sm text-gray-600 leading-relaxed font-mono bg-gray-50 p-4 rounded-xl border border-gray-100">
                  The 'withdraw' function enables state modification after external calls, enabling a classic Reentrancy attack vector.
                </p>
              </div>

              <div className="mb-8">
                <h5 className="text-[10px] font-bold text-gray-400 tracking-wider mb-2">MITIGATION PROPOSAL</h5>
                <p className="text-[11px] text-gray-500 leading-relaxed font-mono whitespace-pre-line bg-[#f8fafc] p-4 rounded-xl border border-gray-100/50">
                  {`Apply CEI pattern. Ensure effects (balances[msg.sender] = 0;) occur before external calls.`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">9.4</div>
                  <div className="text-[9px] font-bold text-gray-400 tracking-wider">SEVERITY SCORE</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">12ms</div>
                  <div className="text-[9px] font-bold text-gray-400 tracking-wider">RESPONSE TIME</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 01 Submission */}
        <section className="py-32 px-6 lg:px-12 bg-transparent border-t border-gray-100/50">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
            {/* Left Code Mock */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              <div className="border-b border-gray-50 px-6 py-4 flex items-center gap-2 bg-gray-50/50">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                <div className="ml-4 text-[10px] font-mono text-gray-400">Vault.sol</div>
              </div>
              <div className="p-8 font-mono text-xs text-gray-600 leading-loose">
                <div className="text-purple-600">pragma <span className="text-gray-600">solidity ^0.8.0;</span></div>
                <br/>
                <div><span className="text-blue-600">contract</span> Vault {'{'}</div>
                <div className="pl-6"><span className="text-blue-600">mapping</span>(address ={'>'} uint) <span className="text-blue-600">public</span> balances;</div>
                <br/>
                <div className="pl-6"><span className="text-blue-600">function</span> withdraw(uint amount) <span className="text-blue-600">public</span> {'{'}</div>
                <div className="pl-12">require(balances[msg.sender] &gt;= amount);</div>
                <div className="pl-12 text-gray-400 italic">// user logic field active...</div>
                <div className="pl-6">{'}'}</div>
                <div>{'}'}</div>
              </div>
            </motion.div>

            {/* Right Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-slate-100 font-extrabold text-8xl md:text-9xl tracking-tighter mb-4 -ml-2 select-none">
                01
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-6 tracking-tight">Submission</h2>
              <p className="text-slate-800 text-lg leading-relaxed mb-10 max-w-lg font-medium">
                Input your Solidity or Vyper smart contracts directly into the Nexus gateway. Our system accepts raw code, GitHub repositories, or verified Ethereum addresses. The analysis layer performs an immediate syntax validation to ensure structural integrity before processing.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-900 tracking-wider">MULTI-CHAIN COMPATIBILITY</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-900 tracking-wider">INSTANT SYNTAX VERIFICATION</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 02 Neural Processing */}
        <section className="py-32 px-6 lg:px-12 bg-transparent border-t border-gray-100/50">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="text-slate-100 font-extrabold text-8xl md:text-9xl tracking-tighter mb-4 -ml-2 select-none">
                02
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-6 tracking-tight">Neural Processing</h2>
              <div className="w-16 h-1 bg-slate-900 mb-8"></div>
              <p className="text-slate-800 text-lg leading-relaxed max-w-lg font-medium">
                The core of NexusScan AI. Our LLM-powered engine goes beyond simple pattern matching. It constructs a dynamic control flow graph and applies semantic reasoning to identify logic flaws, reentrancy vectors, and complex economic exploits that traditional static analyzers miss.
              </p>
            </motion.div>

            {/* Right Blocks */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 grid grid-cols-2 gap-4"
            >
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)] min-h-[300px] flex flex-col">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mb-auto">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Deep Logic Scans</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">Semantic reasonability interactions across state changes.</p>
                </div>
              </div>
              <div className="bg-[#0e0e11] rounded-3xl p-8 shadow-2xl min-h-[300px] flex flex-col relative top-12">
                <div className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center mb-auto">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Semantic Mapping</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">Correlate vulnerability identification via neural weights.</p>
                </div>
              </div>

              {/* Smaller Bottom Panel mimicking live stream */}
              <div className="col-span-2 mt-8 bg-white/60 backdrop-blur-md rounded-2xl border border-gray-100 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[9px] font-bold tracking-widest text-gray-400">LIVE PROCESSING STREAM</span>
                </div>
                <div className="space-y-3">
                  <div className="h-1 bg-gray-200 w-full rounded-full overflow-hidden">
                    <div className="h-full bg-gray-300 w-3/4"></div>
                  </div>
                  <div className="h-1 bg-gray-200 w-2/3 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-300 w-1/2"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 03 Report Generation */}
        <section className="pt-32 pb-48 px-6 lg:px-12 bg-transparent border-t border-slate-100/50">
          <div className="max-w-[1200px] mx-auto text-center relative">
            <div className="text-slate-100 font-extrabold text-8xl md:text-9xl tracking-tighter mb-4 select-none flex justify-center">
              03
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-6 tracking-tight relative z-10 -mt-10 md:-mt-16">Report Generation</h2>
            <p className="text-slate-800 text-lg leading-relaxed max-w-2xl mx-auto mb-16 relative z-10 font-medium">
              High-fidelity results delivered in seconds. No PDF fluff—just pure, actionable intelligence formatted for developers and security teams.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0e0e11] rounded-[2rem] overflow-hidden shadow-2xl p-6 sm:p-8 font-mono text-left text-xs sm:text-sm border border-gray-800"
            >
              <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="text-[10px] text-gray-500 font-bold tracking-widest">NEXUSSCAN TERMINAL V3.2.0</div>
              </div>
              <div className="space-y-4 leading-relaxed mt-6">
                <div>
                  <span className="text-emerald-500">user@nexus</span>
                  <span className="text-gray-500 ml-2">$</span>
                  <span className="text-gray-200 ml-4">nexus-scan --target ./vault.sol --depth high --precision tactical</span>
                </div>
                <div>
                  <span className="text-yellow-500">[SYSTEM]</span>
                  <span className="text-gray-400 ml-4">Initializing Neural Static Analysis Engine...</span>
                </div>
                <div>
                  <span className="text-yellow-500">[SYSTEM]</span>
                  <span className="text-gray-400 ml-4">Mapping Control Flow Graph (CFG)...</span>
                </div>
                <div>
                  <span className="text-yellow-500">[SYSTEM]</span>
                  <span className="text-gray-400 ml-4">Scanning 124 reachable paths...</span>
                </div>
                <div>
                  <span className="text-emerald-500 font-bold">[SUCCESS]</span>
                  <span className="text-gray-200 ml-4">Scan complete in 1.2s</span>
                </div>
                
                <div className="mt-8 bg-[#181010] border-l-2 border-red-500 p-6 rounded-r-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-red-500 font-bold text-[10px] tracking-widest">VULNERABILITY DETECTED CRITICAL</span>
                    <span className="text-gray-500 text-[10px]">12.5ms</span>
                  </div>
                  <h4 className="text-white font-bold mb-3">Potential Reentrancy in 'withdraw' function</h4>
                  <p className="text-gray-400 text-xs leading-loose mb-6">
                    Potential call resonance before state update. Line 8 performs transfer of native asset while state variable 'balances' is updated in line 12. Potential for recursive drainage.
                  </p>
                  <div className="flex gap-4">
                    <button className="text-[10px] px-3 py-1.5 border border-white/10 rounded text-gray-400 hover:text-white transition-colors bg-white/5">
                      UNDERSTAND CALL-OR PATTERN
                    </button>
                    <button className="text-[10px] px-3 py-1.5 border border-white/10 rounded text-gray-400 hover:text-white transition-colors bg-white/5">
                      CONTEXTUAL FIX v
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <span className="text-emerald-500">user@nexus</span>
                  <span className="text-gray-500 ml-2">$</span>
                  <span className="ml-4 animate-pulse inline-block w-2 bg-gray-500">&nbsp;</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Deploy Call to Action */}
        <section className="py-24 px-6 bg-[#09090b]">
          <div className="max-w-4xl mx-auto text-center border-y border-white/5 py-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Deploy with Confidence</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium">
              Join 500+ DeFi protocols that secure their smart contracts with NexusScan AI's surgical precision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-white text-black text-sm font-bold rounded-full min-w-[200px]"
                >
                  Start Scan
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-[#18181b] text-white border border-white/10 text-sm font-bold rounded-full min-w-[200px] hover:bg-[#27272a] transition-colors"
              >
                View Documentation
              </motion.button>
            </div>
          </div>
        </section>

        {/* Overlays */}
        <AnimatePresence>
          {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />}
          {isAdminLoginOpen && <LoginModal isOpen={isAdminLoginOpen} onClose={() => setAdminLoginOpen(false)} onLoginSuccess={() => { setAdminLoginOpen(false); /* Handled generally */ }} />}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
};

export default HowItWorks;
