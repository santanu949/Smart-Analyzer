import React from 'react';
import { AdminSidebar, AdminHeader } from '../components/admin/AdminLayout';
import { Label } from '../components/ui/Typography';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminView = ({ onPublicSwap }) => {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#e7e4ec] font-sans selection:bg-brand-cyan/30">
      <AdminSidebar onPublicSwap={onPublicSwap} />
      
      <div className="md:ml-64 flex flex-col min-h-screen">
        <AdminHeader />
        
        <main className="flex-1 p-4 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Threats Neutralized" value="1,284" trend="+12" trendUp />
            <StatCard label="High-Risk Buffers" value="42" alert />
            <StatCard label="Network Uptime" value="99.99%" />
            <StatCard label="Active Nodes" value="8,102" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#131316] border border-[#47474e]/50 p-4 min-h-[400px]">
              <div className="flex items-center justify-between mb-4 border-b border-[#47474e]/50 pb-2">
                <Label theme="admin">AI Analysis Logs :: Live_Stream</Label>
                <Label className="text-tactical-textDim text-[10px]">Showing 5 of 2,492 Records</Label>
              </div>
              
              <div className="space-y-2 font-mono text-xs">
                <LogEntry type="system" text="Initializing heuristic scanner v4.0.2..." />
                <LogEntry type="decrypt" text="Analyzing NX-8829-QX packet structure..." />
                <LogEntry type="success" text="Hash verified. No malicious injects detected in layer-7." />
                <LogEntry type="warn" text="Unusual gas limit optimization detected in NX-7120-KL. Flags raised for review." />
                <LogEntry type="scan" text="Monitoring global node network... STABLE" />
              </div>
            </div>

            <div className="bg-[#131316] border border-[#47474e]/50 p-4">
              <div className="border-b border-[#47474e]/50 pb-2 mb-4">
                <Label theme="admin">Neural Load Distribution</Label>
              </div>
              <div className="h-48 flex items-end gap-2 justify-between px-2">
                 {/* Fake chart bars */}
                 {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     className="w-full bg-brand-cyan/20 border-t border-brand-cyan tactical-glow"
                   ></motion.div>
                 ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, alert, trend, trendUp }) => (
  <div className={`bg-[#131316] border p-4 relative overflow-hidden ${alert ? 'border-brand-amber' : 'border-[#47474e]/50'}`}>
    {alert && <div className="absolute top-0 right-0 w-2 h-2 bg-brand-amber"></div>}
    <Label className="text-tactical-textDim mb-2 block">{label}</Label>
    <div className="flex items-end justify-between">
      <div className={`font-display text-4xl font-bold ${alert ? 'text-brand-amber' : 'text-tactical-text'}`}>
        {value}
      </div>
      {trend && (
        <span className={`font-mono text-[10px] ${trendUp ? 'text-brand-emerald' : 'text-brand-amber'}`}>
          {trendUp ? '▲' : '▼'} {trend}
        </span>
      )}
    </div>
  </div>
);

const LogEntry = ({ type, text }) => {
  const styles = {
    system: "text-tactical-textDim",
    decrypt: "text-brand-cyan/70",
    success: "text-brand-emerald border-l-2 border-brand-emerald pl-2 bg-brand-emerald/5",
    warn: "text-brand-amber border-l-2 border-brand-amber pl-2 bg-brand-amber/5",
    scan: "text-tactical-text",
  };
  
  return (
    <div className={`py-2 border-b border-[#47474e]/30 last:border-0 ${styles[type]}`}>
      <span className="uppercase font-bold tracking-widest mr-2 opacity-70">[{type}]</span>
      {text}
    </div>
  );
};
