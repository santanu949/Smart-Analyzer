import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 lg:px-12 bg-white border-t border-gray-200" data-testid="footer">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xl font-bold text-gray-900 mb-2">NexusScan AI</div>
            <p className="text-xs text-gray-500">
              © 2024 NEXUSSCAN AI. PRECISION INTELLIGENCE FOR THE DECENTRALIZED WEB.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <a href="#security" className="hover:text-gray-900 transition-colors" data-testid="footer-security-link">
              SECURITY AUDIT
            </a>
            <a href="#privacy" className="hover:text-gray-900 transition-colors" data-testid="footer-privacy-link">
              PRIVACY POLICY
            </a>
            <a href="#status" className="hover:text-gray-900 transition-colors" data-testid="footer-status-link">
              STATUS
            </a>
            <a href="#twitter" className="hover:text-gray-900 transition-colors" data-testid="footer-twitter-link">
              TWITTER
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
