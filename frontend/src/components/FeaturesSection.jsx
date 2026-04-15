import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🧠',
      title: 'Neural Pattern Discovery',
      description: 'Going beyond simple static analysis. Our LLM-powered engine understands intent, identifying complex logic flaws that traditional scanners miss.',
      theme: 'from-emerald-500/20 via-emerald-900/40 to-[#030712]',
      borderTheme: 'border-emerald-500/30 hover:border-emerald-400/60',
      shadowTheme: 'shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]'
    },
    {
      icon: '🔒',
      title: 'Immutable Audits',
      description: 'Each scan generates a cryptographic proof of analysis scored on-chain for complete transparency and historical tracking.',
      theme: 'from-amber-500/20 via-amber-900/40 to-[#030712]',
      borderTheme: 'border-amber-500/30 hover:border-amber-400/60',
      shadowTheme: 'shadow-[inset_0_0_20px_rgba(245,158,11,0.05)] hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]'
    },
    {
      icon: '⚡',
      title: 'Instant CI/CD',
      description: 'Integrate directly into your Github Actions and Hardhat workflows for real-time protection and automated security checks.',
      theme: 'from-rose-500/20 via-rose-900/40 to-[#030712]',
      borderTheme: 'border-rose-500/30 hover:border-rose-400/60',
      shadowTheme: 'shadow-[inset_0_0_20px_rgba(244,63,94,0.05)] hover:shadow-[0_0_40px_rgba(244,63,94,0.2)]'
    },
    {
      icon: '🌐',
      title: 'Ecosystem Intelligence',
      description: 'Our database updates every block, learning from every exploit across 14+ chains in real-time to prevent zero-day attacks.',
      theme: 'from-orange-500/20 via-orange-900/40 to-[#030712]',
      borderTheme: 'border-orange-500/30 hover:border-orange-400/60',
      shadowTheme: 'shadow-[inset_0_0_20px_rgba(249,115,22,0.05)] hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]'
    },
  ];

  return (
    // Added contrast-[1.10] for the 10% contrast bump
    <section className="py-20 px-6 lg:px-12 bg-transparent contrast-[1.10]" data-testid="features-section">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${feature.theme} border ${feature.borderTheme} ${feature.shadowTheme} backdrop-blur-xl transition-all duration-500 group hover:-translate-y-2`}
              data-testid={`feature-card-${index}`}
            >
              {/* Subtle mesh overlay for cards */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}></div>
              </div>

              <div className="relative z-10">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-bottom-left">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed opacity-90">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;