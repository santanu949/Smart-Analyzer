import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GAS_URL = import.meta.env.VITE_GAS_URL;

export const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          contractInput: "", // Empty for standard contact forms
          contractOutput: "" // Empty for standard contact forms
        }),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      setStatus('success');
      setTimeout(() => { onClose(); setStatus('idle'); setFormData({ fullName: '', phone: '', email: '', subject: 'General Inquiry', message: '' }); }, 2000);
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-xl">&times;</button>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Send a Message</h2>
          <p className="text-sm text-gray-500 mb-6">We'll respond as soon as possible.</p>
          
          {status === 'success' ? (
            <div className="text-center py-10 text-emerald-600 font-semibold">Message sent successfully!</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Full Name*" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" onChange={e => setFormData({...formData, fullName: e.target.value})} />
              <input type="tel" placeholder="Phone (+91...)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" onChange={e => setFormData({...formData, phone: e.target.value})} />
              <input required type="email" placeholder="Email Address*" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" onChange={e => setFormData({...formData, email: e.target.value})} />
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-gray-700" onChange={e => setFormData({...formData, subject: e.target.value})}>
                <option>General Inquiry</option>
                <option>Enterprise Audit</option>
                <option>Technical Support</option>
                <option>Partnership</option>
              </select>
              <textarea required rows="4" placeholder="Your Message..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              <button disabled={status === 'loading'} type="submit" className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const [status, setStatus] = useState('idle');

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Changed to GET request formatting to match your GAS script
      const authUrl = `${GAS_URL}?type=auth&user=${encodeURIComponent(credentials.userId)}&pass=${encodeURIComponent(credentials.password)}`;
      const response = await fetch(authUrl);
      const data = await response.json();
      
      if (data.success) {
        onLoginSuccess();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0a0a0a] border border-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">&times;</button>
        <h2 className="text-2xl font-bold text-white mb-2 font-mono tracking-tight">System_Auth</h2>
        <p className="text-xs text-gray-500 mb-6 font-mono tracking-widest uppercase">Admin access required</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input required type="text" placeholder="User ID" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500 text-white font-mono text-sm" onChange={e => setCredentials({...credentials, userId: e.target.value})} />
          <input required type="password" placeholder="Password" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500 text-white font-mono text-sm" onChange={e => setCredentials({...credentials, password: e.target.value})} />
          {status === 'error' && <p className="text-red-400 text-xs font-mono">Invalid credentials. Access denied.</p>}
          
          <button disabled={status === 'loading'} type="submit" className="w-full py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors uppercase tracking-widest text-sm font-mono mt-4">
            {status === 'loading' ? 'Verifying...' : 'Authorize'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};