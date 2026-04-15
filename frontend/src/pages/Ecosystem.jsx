import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ContactModal, LoginModal } from '../components/Modals';

const Ecosystem = () => {
  const [isContactOpen, setContactOpen] = useState(false);
  const [isAdminLoginOpen, setAdminLoginOpen] = useState(false);

  return (
    <div className="min-h-screen relative bg-white" data-testid="ecosystem-page">
      {/* Animated Background from Landing Page */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-100/60 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-100/60 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-emerald-100/40 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <Navbar onContactClick={() => setContactOpen(true)} onAdminClick={() => setAdminLoginOpen(true)} />

        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 lg:px-12 bg-transparent">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6 font-mono">
              PRECISION TRANSPARENCY
            </p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              <span className="text-gray-900 block">The Nexus</span>
              <span className="text-gray-200 block mt-2">Ecosystem</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed mb-10">
              A multi-layered architecture of interconnected security products, automated
              <br className="hidden md:block" /> audit engines, and real-time guard protocols designed for the next
              <br className="hidden md:block" /> generation of decentralized finance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-black text-white text-sm font-medium rounded-full flex items-center justify-center min-w-[200px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Launch Dashboard <span className="ml-2 font-serif">→</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-white text-gray-900 border border-gray-200 text-sm font-medium rounded-full flex items-center justify-center min-w-[200px] hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
              >
                View Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Foundation Layers */}
      <section className="py-24 px-6 lg:px-12 bg-transparent border-t border-gray-100/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Foundation Layers</h2>
              <p className="text-gray-500 max-w-lg">Three pillars of security automated by high-performance AI engines.</p>
            </div>
            <div className="mt-6 md:mt-0 text-xs font-mono tracking-widest text-gray-400 uppercase">
              Nexus Core V2.0
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Scan Engine */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[360px]"
            >
              <div>
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scan Engine</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Millisecond latency static analysis across 50+ smart contract vulnerabilities including reentrancy and overflow.
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">UPTIME</span>
                <span className="text-sm font-bold text-gray-900">99.9%</span>
              </div>
            </motion.div>

            {/* Audit Tool */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[360px]"
            >
              <div>
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Audit Tool</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Automated formal verification reporting compatible with major audit standards and DeFi protocols.
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">PROCESSED</span>
                <span className="text-sm font-bold text-gray-900">8.4M OPS</span>
              </div>
            </motion.div>

            {/* Guard Protocols */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[360px]"
            >
              <div>
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Guard Protocols</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  On-chain runtime monitoring and transaction interceptors for post-deployment security enforcement.
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">ACTIVE NODES</span>
                <span className="text-sm font-bold text-gray-900">1,304</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Multi-Chain Native */}
      <section className="py-24 px-6 lg:px-12 bg-transparent border-t border-gray-100/50">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Multi-Chain Native</h2>
          <p className="text-gray-500 mb-12 text-sm max-w-xl mx-auto">Seamlessly integrated with leading blockchain infrastructures and development environments.</p>
          
          <div className="flex flex-wrap justify-center gap-0 max-w-5xl mx-auto border border-gray-100 bg-white rounded-2xl overflow-hidden shadow-sm">
            {[
              { name: 'ETHEREUM', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l4 10-4 3-4-3 4-10zM12 22l4-5-4-3-4 3 4 5z" /> },
              { name: 'POLYGON', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14l8 4 8-4-8-4-8 4v-4l8 4 8-4-8-4-8 4v4z" /> },
              { name: 'ARBITRUM', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4l-8 4v8l8 4 8-4V8l-8-4z M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" /> },
              { name: 'BASENET', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M5 6l7-3 7 3M4 18h16m-2-4H6l-2 4h16l-2-4z" /> },
              { name: 'FOUNDRY', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> }
            ].map((chain, i) => (
              <div key={i} className={`flex-1 min-w-[160px] py-10 flex flex-col items-center justify-center ${i !== 0 ? 'border-l border-gray-100' : ''}`}>
                <div className="w-10 h-10 mb-4 text-gray-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                    {chain.icon}
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-gray-900 tracking-widest">{chain.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineered for Builders */}
      <section className="py-24 px-6 lg:px-12 bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Terminal View */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0e0e11] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl p-6 sm:p-8 font-mono text-xs sm:text-sm"
            >
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
              </div>
              <div className="space-y-3 leading-relaxed">
                <div>
                  <span className="text-gray-500">01</span>
                  <span className="text-brand-emerald ml-4">nexus-cli</span>
                  <span className="text-gray-300 ml-2">scan ./contracts/Vault.sol</span>
                </div>
                <div>
                  <span className="text-gray-500">02</span>
                  <span className="text-blue-400 ml-4">[info]</span>
                  <span className="text-gray-300 ml-2">Initializing NexusScan Engine v2.4.0...</span>
                </div>
                <div>
                  <span className="text-gray-500">03</span>
                  <span className="text-blue-400 ml-4">[info]</span>
                  <span className="text-gray-300 ml-2">124 security patterns loaded.</span>
                </div>
                <div>
                  <span className="text-gray-500">04</span>
                  <span className="text-gray-500 italic ml-4">// Static Analysis Result:</span>
                </div>
                <div>
                  <span className="text-gray-500">05</span>
                  <span className="text-red-500 font-bold ml-4">CRITICAL:</span>
                  <span className="text-gray-200 ml-2">Reentrancy vulnerability at line 40.</span>
                </div>
                <div>
                  <span className="text-gray-500">06</span>
                  <span className="text-amber-400 ml-4">Suggestion:</span>
                  <span className="text-gray-300 ml-2">Use nonReentrant modifier.</span>
                </div>
                <div>
                  <span className="text-gray-500">07</span>
                  <span className="text-brand-emerald font-bold ml-4">SUCCESS:</span>
                  <span className="text-gray-200 ml-2">Report generated: security-audit.pdf</span>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">BUILT WITH AUTHORITY</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Engineered for<br/>Builders</h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Integrate NexusScan directly into your CI/CD pipelines. Our SDKs and command-line interfaces provide the same clinical precision as our web dashboard.
                </p>
              </div>

              <div className="space-y-8 mt-10">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">REST & GraphQL APIs</h4>
                    <p className="text-gray-500 text-sm">Real-time data feeds for contract health and risk scores.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Powerful CLI Tooling</h4>
                    <p className="text-gray-500 text-sm">Local-first scanning for rapid development cycles.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Governed by the Community */}
      <section className="py-24 px-6 lg:px-12 bg-[#09090b]">
        <div className="max-w-[1400px] mx-auto border-t border-white/5 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Governed by the Community</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">The evolution of NexusScan AI is guided by a global network of researchers and developers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* DAO Portal */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#121214] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-colors hover:bg-[#18181b]"
            >
              <div className="w-12 h-12 mb-6 text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 18h16M7 18V9M11 18V9M15 18V9M19 18V9M12 3l8 6H4l8-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">DAO Portal</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-8">
                Vote on protocol upgrades, new chain integrations, and security model adjustments.
              </p>
              <button className="mt-auto text-[10px] uppercase tracking-widest font-bold text-white hover:text-gray-300 transition-colors">
                GO TO PORTAL
              </button>
            </motion.div>

            {/* Research Labs */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#121214] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-colors hover:bg-[#18181b]"
            >
              <div className="w-12 h-12 mb-6 text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Research Labs</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-8">
                Collaborate on whitepapers and zero-knowledge vulnerability proof research.
              </p>
              <button className="mt-auto text-[10px] uppercase tracking-widest font-bold text-white hover:text-gray-300 transition-colors">
                JOIN LABS
              </button>
            </motion.div>

            {/* Discord */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#121214] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-colors hover:bg-[#18181b]"
            >
              <div className="w-12 h-12 mb-6 text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Discord</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-8">
                Connect with 20k+ security engineers and receive real-time support from the core team.
              </p>
              <button className="mt-auto text-[10px] uppercase tracking-widest font-bold text-white hover:text-gray-300 transition-colors">
                JOIN COMMUNITY
              </button>
            </motion.div>
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

export default Ecosystem;
