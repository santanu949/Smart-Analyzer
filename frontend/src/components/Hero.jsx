import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-12" data-testid="hero-section">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium" data-testid="hero-subtitle">
            DECENTRALIZED SECURITY ENGINE
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900" data-testid="hero-title">
            Hardened Intelligence for
            <br />
            Smart Contracts.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
            NexusScan leverages deep neural analysis to detect zero-day
            <br className="hidden md:block" />
            vulnerabilities in Solidity and Rust before they reach the mainnet.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
