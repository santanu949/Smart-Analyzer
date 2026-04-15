import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-6 lg:px-12 bg-white border-t border-slate-100" data-testid="footer">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-base font-bold text-slate-900 mb-1">NexusScan AI</div>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest">
              © 2024 NEXUSSCAN AI. PRECISION INTELLIGENCE.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2">
            {[
              { id: 'security', label: 'SECURITY AUDIT' },
              { id: 'privacy', label: 'PRIVACY POLICY' },
              { id: 'status', label: 'STATUS' },
              { id: 'twitter', label: 'TWITTER' }
            ].map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors tracking-widest uppercase" 
                data-testid={`footer-${link.id}-link`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
