import React from 'react';
import { Navbar } from '../components/public/Navbar';
import { AnalyzerGrid } from '../components/public/AnalyzerGrid';
import { Display, Body, Label } from '../components/ui/Typography';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingView = ({ onAdminSwap }) => {
  return (
    <div className="min-h-screen bg-zinc-50 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-slate-200/50 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-zinc-200/30 blur-[120px] pointer-events-none"></div>

      <Navbar onAdminSwap={onAdminSwap} />

      <main className="public-container pt-40 pb-24 relative z-10">
        
        {/* Editoral Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <ShieldCheck className="w-5 h-5 text-zinc-900" />
            <Label className="text-zinc-900 font-bold tracking-widest">NEXUSSCAN AI · V4.0</Label>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Display className="text-zinc-950">
              Hardened Intelligence <br/> for Smart Contracts.
            </Display>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Body className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto mt-6">
              NexusScan leverages deep neural analysis to detect zero-day vulnerabilities in Solidity and Rust before they reach the mainnet. No noise. Just ground truth.
            </Body>
          </motion.div>
        </div>

        {/* Neural Scanner Interactive Area */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <AnalyzerGrid />
        </motion.div>

      </main>
    </div>
  );
};
