import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CHANGE_RECORDS, SAMPLE_WATERSHED } from '../data/mockData';
import { createSatelliteViewSvg } from '../data/imageAssets';
import { 
  GitCompare, 
  Layers, 
  TrendingUp, 
  Droplets, 
  TreeDeciduous, 
  Building, 
  ShieldCheck, 
  MapPin, 
  Sliders, 
  ExternalLink,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const ChangeAnalysisView: React.FC = () => {
  const { setActiveTab, setMapCenter, setMapZoom, openInterventionDetail } = useApp();
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 to 100)
  const [activeTabMode, setActiveTabMode] = useState<'slider' | 'side-by-side'>('slider');
  const [selectedChangeId, setSelectedChangeId] = useState<string>(CHANGE_RECORDS[0].id);

  const beforeSvg = createSatelliteViewSvg({ year: 2021, type: 'true_color' });
  const afterSvg = createSatelliteViewSvg({ year: 2025, type: 'true_color' });

  const selectedRecord = CHANGE_RECORDS.find(r => r.id === selectedChangeId) || CHANGE_RECORDS[0];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] bg-slate-100 overflow-y-auto">
      
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <GitCompare className="w-5 h-5 text-sky-600" />
              <span>Watershed Change Analysis</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              DEMO DATASET &bull; 2021 vs 2025
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Temporal change detection quantifying vegetation canopy regeneration, surface water impoundment, and erosion abatement.
          </p>
        </div>

        {/* Comparison Presentation Modes */}
        <div className="flex items-center space-x-2">
          <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs flex">
            <button
              onClick={() => setActiveTabMode('slider')}
              className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                activeTabMode === 'slider' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Swipe Slider
            </button>
            <button
              onClick={() => setActiveTabMode('side-by-side')}
              className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                activeTabMode === 'side-by-side' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side Dual Synchronized
            </button>
          </div>
        </div>
      </div>

      {/* Summary Metrics Bar (Official Prompt Values) */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          
          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <TreeDeciduous className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-emerald-800 uppercase font-semibold">Vegetation Change</div>
              <div className="text-lg font-bold text-emerald-900">+12.4%</div>
              <div className="text-[10px] text-emerald-700">Canopy Biomass Vigor (Demo)</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-md bg-sky-600 text-white flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-sky-800 uppercase font-semibold">Water Surface Change</div>
              <div className="text-lg font-bold text-sky-900">+8.7%</div>
              <div className="text-[10px] text-sky-700">Permanent Water Retention (Demo)</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-md bg-rose-600 text-white flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-rose-800 uppercase font-semibold">Built-up Change</div>
              <div className="text-lg font-bold text-rose-900">+2.1%</div>
              <div className="text-[10px] text-rose-700">Farmsteads & Habitation (Demo)</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-md bg-amber-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-amber-800 uppercase font-semibold">Intervention Coverage</div>
              <div className="text-lg font-bold text-amber-900">+14.8%</div>
              <div className="text-[10px] text-amber-700">Catchment Protection Area (Demo)</div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Interactive Visualizer */}
      <div className="p-4 flex-1 space-y-4">
        
        {/* Swipe Comparison Canvas */}
        <div className="bg-slate-900 rounded-xl p-4 shadow-md border border-slate-800">
          
          <div className="flex justify-between items-center pb-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="font-bold text-amber-300">BEFORE 2021 (Baseline Pre-Treatment)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-emerald-400">AFTER 2025 (Post-Treatment Outcome)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>

          {activeTabMode === 'slider' ? (
            /* INTERACTIVE SWIPE SLIDER */
            <div className="relative w-full max-h-[520px] aspect-[16/9] rounded-lg overflow-hidden border-2 border-slate-700 select-none">
              
              {/* After 2025 Image (Bottom Layer) */}
              <img
                src={afterSvg}
                alt="After 2025 Satellite Layer"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before 2021 Image (Clipped Top Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={beforeSvg}
                  alt="Before 2021 Satellite Layer"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              {/* Vertical Divider Line with Draggable Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-2xl flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-slate-900 font-bold shadow-lg flex items-center justify-center text-xs border-2 border-sky-600">
                  ↔
                </div>
              </div>

              {/* Range Input for Accessible Control */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label="Swipe comparison slider between 2021 and 2025"
              />

              {/* Corner Watermarks */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded text-amber-400 font-mono text-xs font-bold pointer-events-none">
                2021 BASELINE
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-950/80 px-2.5 py-1 rounded text-emerald-400 font-mono text-xs font-bold pointer-events-none">
                2025 OUTCOME (+12.4% Biomass)
              </div>
            </div>
          ) : (
            /* SIDE-BY-SIDE DUAL SYNCHRONIZED */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden border-2 border-amber-600/70 aspect-[4/3]">
                <img src={beforeSvg} alt="2021 Baseline" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-amber-400 font-mono text-xs font-bold">
                  2021 BASELINE
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden border-2 border-emerald-600/70 aspect-[4/3]">
                <img src={afterSvg} alt="2025 Outcome" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-emerald-400 font-mono text-xs font-bold">
                  2025 OUTCOME
                </div>
              </div>
            </div>
          )}

          {/* Slider Instruction Prompt */}
          <div className="mt-2 text-center text-[11px] text-slate-400">
            Drag the slider horizontally across the map to inspect spatial transformation around Check Dam 014 and Farm Pond clusters.
          </div>
        </div>

        {/* DETECTED CHANGES TABLE (Mandatory Section 9 Requirement) */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Detected Change Polygons & Intervention Links</h3>
              <p className="text-xs text-slate-500">Autonomous remote sensing change extraction corroborated with ground observations</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
              {CHANGE_RECORDS.length} Verified Positive Shift Zones
            </span>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px]">
                  <th className="py-2 px-3 font-semibold">Location / Sector</th>
                  <th className="py-2 px-3 font-semibold">Change Type</th>
                  <th className="py-2 px-3 font-semibold">Baseline (2021)</th>
                  <th className="py-2 px-3 font-semibold">Outcome (2025)</th>
                  <th className="py-2 px-3 font-semibold">Change %</th>
                  <th className="py-2 px-3 font-semibold">Confidence</th>
                  <th className="py-2 px-3 font-semibold">Linked Intervention</th>
                  <th className="py-2 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {CHANGE_RECORDS.map((rec) => (
                  <tr 
                    key={rec.id}
                    onClick={() => setSelectedChangeId(rec.id)}
                    className={`hover:bg-sky-50/60 cursor-pointer transition-colors ${
                      selectedChangeId === rec.id ? 'bg-sky-50 font-medium' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-900">{rec.locationName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {rec.latitude.toFixed(4)}°N, {rec.longitude.toFixed(4)}°E &bull; {rec.sector}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {rec.changeType}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{rec.beforeValue}</td>
                    <td className="py-2.5 px-3 text-emerald-800 font-bold font-mono text-[11px]">{rec.afterValue}</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-bold text-xs">+{rec.changePct}%</td>
                    <td className="py-2.5 px-3">
                      <span className="font-mono font-semibold text-slate-700">{rec.confidencePct}%</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[11px]">
                        {rec.linkedInterventionName}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMapCenter([rec.latitude, rec.longitude]);
                          setMapZoom(16);
                          setActiveTab('map');
                        }}
                        className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs transition-colors"
                      >
                        Inspect on Map
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
