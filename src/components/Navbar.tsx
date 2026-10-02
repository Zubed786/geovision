import React from 'react';
import { useApp } from '../context/AppContext';
import { PageTab } from '../types';
import { 
  Layers, 
  Camera, 
  Satellite, 
  GitCompare, 
  CheckCircle2, 
  FileText, 
  LayoutDashboard, 
  MapPin, 
  Sparkles, 
  RotateCcw,
  ShieldCheck,
  User
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    loadSampleWatershed, 
    setIsJudgeDemoOpen,
    setJudgeStep
  } = useApp();

  const navItems: { tab: PageTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { tab: 'map', label: 'Map Analysis', icon: <Layers className="w-4 h-4" /> },
    { tab: 'field-evidence', label: 'Field Evidence', icon: <Camera className="w-4 h-4" /> },
    { tab: 'satellite', label: 'Satellite Analysis', icon: <Satellite className="w-4 h-4" /> },
    { tab: 'change-analysis', label: 'Change Analysis', icon: <GitCompare className="w-4 h-4" /> },
    { tab: 'interventions', label: 'Interventions', icon: <CheckCircle2 className="w-4 h-4" /> },
    { tab: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleStartJudgeDemo = () => {
    setJudgeStep(1);
    setIsJudgeDemoOpen(true);
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 select-none shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-1 text-xs flex justify-between items-center text-slate-400">
        <div className="flex items-center space-x-3">
          <span className="flex items-center text-amber-400 font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block mr-1.5 animate-pulse"></span>
            SIH 2026 PROTOTYPE • PS 26015
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">National Watershed Geospatial Monitoring Platform</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            DEMO DATASET
          </span>
          <span className="text-slate-500 text-[11px]">Simulated Sentinel-2 & Ground Bhuvan-GNSS Feed</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-lg bg-sky-600 flex items-center justify-center shadow-inner border border-sky-400/40">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-7 h-7">
              <path d="M10 26C13 22 16 19 20 19C24 19 26 23 29 23C32 23 33 21 35 19" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M6 31C10 27 15 27 18 29C21 31 25 31 29 28C31 26.5 33 27 35 28" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="20" cy="13" r="5" fill="#FFFFFF"/>
              <circle cx="20" cy="13" r="2.5" fill="#0284C7"/>
              <path d="M20 18L20 22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-white leading-tight">Watershed GeoVision</h1>
              <span className="text-[10px] uppercase tracking-wider font-bold bg-sky-950 text-sky-300 border border-sky-700/60 px-1.5 py-0.5 rounded">
                GIS v2.4
              </span>
            </div>
            <p className="text-xs text-slate-300 tracking-wide">
              Geospatial Visualization & Analysis for Watershed Development
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Demo Mode */}
        <div className="flex items-center space-x-2">
          {/* Load Sample Watershed */}
          <button
            onClick={loadSampleWatershed}
            title="Reset map view and reload Sample Watershed 07 (Vijayapura, Karnataka)"
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reload Sample WS</span>
          </button>

          {/* Judge Demo Stepper Trigger */}
          <button
            onClick={handleStartJudgeDemo}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 shadow-sm border border-sky-400/30 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Judge Demo Flow (11 Steps)</span>
          </button>

          {/* User profile area */}
          <div className="hidden md:flex items-center pl-2 ml-1 border-l border-slate-700 space-x-2 text-xs text-slate-300">
            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-200 border border-slate-600">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="text-left leading-tight hidden xl:block">
              <div className="font-medium text-slate-200">Dr. M. S. Rao</div>
              <div className="text-[10px] text-slate-400">Technical Director (WDD)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-2 py-1.5 bg-slate-800/90 border-t border-slate-700/60 space-x-1 text-xs">
        {navItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === item.tab ? 'bg-sky-600 text-white font-medium' : 'text-slate-300'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
