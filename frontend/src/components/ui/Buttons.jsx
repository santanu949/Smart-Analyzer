import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  theme = 'public', 
  className = "",
  icon = null,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200";
  
  // Public styles: Soft Minimalism
  const publicStyles = {
    primary: "bg-zinc-950 text-white rounded-full hover:bg-zinc-800 px-6 py-3 font-sans font-medium text-sm shadow-sm",
    secondary: "bg-white text-zinc-900 border border-zinc-200 rounded-full hover:bg-zinc-50 px-6 py-3 font-sans font-medium text-sm shadow-sm",
    ghost: "text-zinc-600 hover:text-zinc-900 px-4 py-2 font-sans font-medium text-sm rounded-full hover:bg-zinc-100"
  };

  // Admin styles: Cyber-Tactical Brutalism
  const adminStyles = {
    primary: "bg-brand-cyan text-black px-6 py-3 font-mono uppercase text-xs tracking-tactical font-bold hover:bg-brand-cyanDim border border-brand-cyan",
    secondary: "bg-transparent text-brand-cyan border-2 border-brand-cyan px-6 py-3 font-mono uppercase text-xs tracking-tactical font-bold hover:bg-brand-cyan/10",
    ghost: "text-tactical-textDim hover:text-brand-cyan px-4 py-2 font-mono uppercase text-[10px] tracking-tactical hover:bg-white/5 border border-transparent hover:border-tactical-border/50"
  };

  const styles = theme === 'admin' ? adminStyles : publicStyles;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${styles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};
