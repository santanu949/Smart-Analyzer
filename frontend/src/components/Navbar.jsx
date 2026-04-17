import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ onAdminClick }) => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 flex justify-center pointer-events-none">
      <nav className="w-full max-w-[1400px] bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] pointer-events-auto" data-testid="navbar">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center" data-testid="logo">
            <span className="text-lg font-bold tracking-tight text-gray-900">NexusScan AI</span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center gap-8" data-testid="nav-menu">
            <Link to="/#platform" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Platform
            </Link>
            <Link to="/ecosystem" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Ecosystem
            </Link>
            <Link to="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link to="/#pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Analyze
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4" data-testid="nav-actions">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAdminClick}
              className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-colors"
            >
              Admin Login
            </motion.button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
