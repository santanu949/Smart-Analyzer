import React from 'react';
import { motion } from 'framer-motion';

const CTASection = ({ onContactClick }) => {
  return (
    // Added contrast-[1.10] for the 10% contrast bump
    <section className="py-20 px-6 lg:px-12 bg-transparent contrast-[1.10]" data-testid="cta-section">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden border border-gray-800 shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
              data-testid="cta-title"
            >
              Ready to secure your
              <br className="hidden sm:block" /> protocol?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium"
              data-testid="cta-description"
            >
              Join the world's most innovative DeFi teams building the future of the
              <br className="hidden md:block" />
              decentralized web with confidence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                data-testid="start-free-scan-btn"
              >
                Start Free Scan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactClick}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-gray-600 hover:border-gray-400 hover:bg-white/5 transition-colors"
                data-testid="connect-us-cta-btn"
              >
                Connect Us
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;