import React from 'react';
import { Title, Label, Body } from '../ui/Typography';
import { Shield, Activity, HardDrive, Settings, Search, Terminal, Menu } from 'lucide-react';
import { Input } from '../ui/Inputs';
import { Button } from '../ui/Buttons';

export const AdminSidebar = ({ onPublicSwap }) => {
  return (
    <div className="w-64 bg-[#0e0e10] border-r border-[#47474e]/50 h-screen flex flex-col p-4 fixed left-0 top-0">
      <div className="mb-8 px-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-cyan" />
          <Label theme="admin" className="text-sm">NEXUSSCAN</Label>
        </div>
      </div>
      
      <div className="flex-1 space-y-6">
        <div>
          <Label className="px-2 mb-3 block text-tactical-textDim font-bold">Tactical Operations</Label>
          <div className="space-y-1">
            <SidebarItem icon={<Terminal size={16} />} label="Dashboard" active />
            <SidebarItem icon={<Activity size={16} />} label="Live Logs" />
            <SidebarItem icon={<Shield size={16} />} label="Contracts" />
          </div>
        </div>
        
        <div>
          <Label className="px-2 mb-3 block text-tactical-textDim font-bold">System Core</Label>
          <div className="space-y-1">
            <SidebarItem icon={<HardDrive size={16} />} label="Neural Engine" />
            <SidebarItem icon={<Settings size={16} />} label="Parameters" />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#47474e]/50 text-xs font-mono">
        <div className="px-2 text-tactical-textDim mb-4">
          <div className="uppercase tracking-widest mb-1">ID: 0xFF92A</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></div>
            System Nominal
          </div>
        </div>
        <Button variant="ghost" theme="admin" className="w-full justify-start" onClick={onPublicSwap}>
          ← Exit Terminal
        </Button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active }) => (
  <button className={`w-full flex items-center gap-3 px-2 py-2 rounded-none transition-colors border-l-2 ${active ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan' : 'border-transparent text-tactical-textDim hover:bg-[#1f1f24] hover:text-tactical-text'}`}>
    {icon}
    <span className="font-mono text-[11px] uppercase tracking-wider">{label}</span>
  </button>
);

export const AdminHeader = () => {
  return (
    <div className="h-16 border-b border-[#47474e]/50 bg-[#131316] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-tactical-textDim">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tactical-textDim" />
          <Input theme="admin" placeholder="COMMAND_PALETTE... (CMD+K)" className="pl-9 bg-[#1f1f24]" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Label theme="admin" className="hidden sm:block">Admin_01</Label>
      </div>
    </div>
  );
};
