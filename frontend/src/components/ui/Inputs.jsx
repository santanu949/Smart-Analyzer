import React from 'react';

export const Input = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  theme = "public", 
  className = "",
  ...props
}) => {
  const publicStyles = "w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 font-sans text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all";
  
  // Tactical input with glowing focus
  const adminStyles = "w-full admin-input";

  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${theme === 'admin' ? adminStyles : publicStyles} ${className}`}
      {...props}
    />
  );
};

export const TextArea = ({ 
  placeholder, 
  value, 
  onChange, 
  theme = "public", 
  className = "",
  rows = 4,
  ...props
}) => {
  const publicStyles = "w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none shadow-sm";
  
  const adminStyles = "w-full bg-tactical-containerHigh border border-tactical-border/20 text-brand-emerald placeholder:text-tactical-textDim focus:outline-none focus:border-brand-emerald shadow-[inset_0_0_0_1px_rgba(69,223,164,0)] focus:shadow-[inset_0_0_0_1px_rgba(69,223,164,0.3)] transition-all duration-200 px-4 py-3 font-mono text-xs resize-none";

  return (
    <textarea 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`${theme === 'admin' ? adminStyles : publicStyles} ${className}`}
      {...props}
    />
  );
};
