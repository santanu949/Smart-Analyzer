import React from 'react';

export const Display = ({ children, className = "" }) => (
  <h1 className={`font-display font-bold text-5xl md:text-6xl tracking-tight leading-tight ${className}`}>
    {children}
  </h1>
);

export const Headline = ({ children, className = "" }) => (
  <h2 className={`font-display font-bold text-2xl md:text-3xl leading-snug ${className}`}>
    {children}
  </h2>
);

export const Title = ({ children, className = "" }) => (
  <h3 className={`font-sans font-medium text-base ${className}`}>
    {children}
  </h3>
);

export const Body = ({ children, className = "" }) => (
  <p className={`font-sans text-sm leading-relaxed ${className}`}>
    {children}
  </p>
);

export const Label = ({ children, className = "", theme = "public" }) => (
  <span className={`font-mono text-[10px] md:text-xs uppercase tracking-tactical ${theme === 'admin' ? 'text-brand-cyan tactical-text-glow' : 'text-zinc-500 font-semibold'} ${className}`}>
    {children}
  </span>
);
