import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Cpu, ShieldCheck, Layers, Activity } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      className="relative group overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-800 transition-all duration-500 hover:border-blue-500/50 hover:-translate-y-2 shadow-2xl"
      data-testid={`feature-card-${index}`}
    >
      {/* Cinematic Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Cyberpunk Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500"
           style={{
             backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
             backgroundSize: '100% 2px, 3px 100%'
           }} 
      />

      {/* Subtle dotted grid matrix overlay inside cards */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Decorative Neon Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Vector Icon with Neon Accent */}
        <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-800/50 border border-gray-700 group-hover:border-blue-500/50 group-hover:bg-blue-500/5 transition-all duration-300">
          <Icon className="w-7 h-7 text-gray-400 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-5 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {title}
        </h3>
        <p className="text-base text-gray-400 leading-relaxed font-medium font-inter">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: 'Neural Pattern Discovery',
      description: 'Going beyond simple static analysis. Our LLM-powered engine understands intent, identifying complex logic flaws that traditional scanners miss.',
      icon: Cpu,
    },
    {
      title: 'Immutable Audits',
      description: 'Each scan generates a cryptographic proof of analysis scored on-chain for complete transparency and historical tracking.',
      icon: ShieldCheck,
    },
    {
      title: 'Instant CI/CD',
      description: 'Integrate directly into your Github Actions and Hardhat workflows for real-time protection and automated security checks.',
      icon: Layers,
    },
    {
      title: 'Ecosystem Intelligence',
      description: 'Our database updates every block, learning from every exploit across 14+ chains in real-time to prevent zero-day attacks.',
      icon: Activity,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-transparent relative overflow-hidden font-inter" data-testid="features-section">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;