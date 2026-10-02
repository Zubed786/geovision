import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  SAMPLE_WATERSHED, 
  FIELD_IMAGES, 
  INTERVENTIONS, 
  CHANGE_RECORDS, 
  LULC_CLASSES 
} from '../data/mockData';
import { 
  MapPin, 
  Camera, 
  ShieldCheck, 
  Droplets, 
  TreeDeciduous, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Layers, 
  Compass, 
  Clock, 
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    setActiveTab, 
    openFieldImageDetail, 
    openInterventionDetail, 
    setIsJudgeDemoOpen,
    setJudgeStep 
  } = useApp();

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto p-4 sm:p-6 space-y-6">
      
      {/* Top Banner: Workflow Diagram (Obvious to judge in 30 seconds) */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-xl p-5 shadow-sm border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Core Scientific Workflow
              </span>
              <span className="text-xs text-slate-400">SIH 2026 Problem Statement 26015 Solution</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Field Geotagging to Satellite Outcome Verification Chain
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Integrating geo-coded field photographs and Sentinel-2 multi-spectral satellite imagery with GIS boundaries to evaluate soil and moisture conservation interventions.
            </p>
          </div>

          <button
            onClick={() => {
              setJudgeStep(1);
              setIsJudgeDemoOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-amber-950" />
            <span>Launch Judge Demo (2-Min Flow)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 7-Step Workflow Pipeline Diagram */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <div className="text-[10px] font-bold text-sky-400 uppercase">1. Field Data</div>
            <div className="font-semibold text-white mt-0.5">Geo-coded Photos</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Bhuvan / GNSS EXIF</div>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <div className="text-[10px] font-bold text-sky-400 uppercase">2. Remote Sensing</div>
            <div className="font-semibold text-white mt-0.5">Satellite Imagery</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Sentinel-2 10m/30m</div>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <div className="text-[10px] font-bold text-sky-400 uppercase">3. Spatial Link</div>
            <div className="font-semibold text-white mt-0.5">GIS Alignment</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Watershed Boundary</div>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <div className="text-[10px] font-bold text-sky-400 uppercase">4. Indices</div>
            <div className="font-semibold text-white mt-0.5">Thematic Maps</div>
            <div className="text-[10px] text-slate-400 mt-0.5">NDVI, NDWI, LULC</div>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <div className="text-[10px] font-bold text-sky-400 uppercase">5. Temporal</div>
            <div className="font-semibold text-white mt-0.5">Change Detection</div>
            <div className="text-[10px] text-slate-400 mt-0.5">2021 vs 2025 Swipe</div>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <div className="text-[10px] font-bold text-sky-400 uppercase">6. Verification</div>
            <div className="font-semibold text-white mt-0.5">Intervention Audit</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Check dams & Ponds</div>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <div className="text-[10px] font-bold text-sky-400 uppercase">7. Outcome</div>
            <div className="font-semibold text-white mt-0.5">Evidence Report</div>
            <div className="text-[10px] text-slate-400 mt-0.5">PDF / GeoJSON Export</div>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Watershed Area */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-medium">Watershed Extent</span>
            <MapPin className="w-4 h-4 text-sky-600" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-slate-900">{SAMPLE_WATERSHED.areaHa.toLocaleString()} <span className="text-sm font-normal text-slate-500">Ha</span></div>
            <div className="text-[11px] text-slate-600 font-mono">48.2 km² &bull; Vijayapura (WS-07)</div>
          </div>
          <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Perimeter: {SAMPLE_WATERSHED.perimeterKm} km</span>
            <span className="text-sky-700 font-semibold">Krishna Basin</span>
          </div>
        </div>

        {/* Card 2: Field Images */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-medium">Field Photographs</span>
            <Camera className="w-4 h-4 text-pink-600" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-slate-900">{SAMPLE_WATERSHED.totalFieldImages} <span className="text-sm font-normal text-slate-500">Photos</span></div>
            <div className="text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{SAMPLE_WATERSHED.verifiedImages} Verified on Ground</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('field-evidence')}
            className="text-[11px] text-pink-700 font-medium hover:underline pt-2 border-t border-slate-100 text-left flex items-center justify-between"
          >
            <span>Inspect Evidence Gallery</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Card 3: Interventions */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-medium">S&MC Interventions</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-slate-900">{SAMPLE_WATERSHED.totalInterventions} <span className="text-sm font-normal text-slate-500">Units</span></div>
            <div className="text-[11px] text-slate-600">Check dams, farm ponds, bunds</div>
          </div>
          <button 
            onClick={() => setActiveTab('interventions')}
            className="text-[11px] text-amber-700 font-medium hover:underline pt-2 border-t border-slate-100 text-left flex items-center justify-between"
          >
            <span>Monitor 18 Structures</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Card 4: Water Spread Increase */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-medium">Surface Water Retention</span>
            <Droplets className="w-4 h-4 text-sky-600" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-emerald-700">+55.1%</div>
            <div className="text-[11px] text-slate-600">184.5 Ha &rarr; 286.2 Ha (+101.7 Ha)</div>
          </div>
          <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>8 Water Bodies</span>
            <span className="text-emerald-700 font-semibold">+2.8m aquifer rise</span>
          </div>
        </div>

        {/* Card 5: Vegetation Gain */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-medium">Vegetation (Mean NDVI)</span>
            <TreeDeciduous className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-emerald-700">+12.4%</div>
            <div className="text-[11px] text-slate-600">28.4% &rarr; 40.8% Canopy Cover</div>
          </div>
          <button 
            onClick={() => setActiveTab('change-analysis')}
            className="text-[11px] text-emerald-700 font-medium hover:underline pt-2 border-t border-slate-100 text-left flex items-center justify-between"
          >
            <span>Compare 2021 vs 2025</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive GIS Map Action & Recent Observations Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: GIS Interactive Exploration Gateway */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Geospatial Decision Support Center</h3>
              <p className="text-xs text-slate-500">Interactive GIS Map, 24 Geo-tagged Field Markers, and 18 Structures</p>
            </div>
            <button
              onClick={() => setActiveTab('map')}
              className="px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs flex items-center space-x-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Open Full GIS Workstation</span>
            </button>
          </div>

          {/* Interactive Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div 
              onClick={() => setActiveTab('field-evidence')}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-sky-50/50 hover:border-sky-300 cursor-pointer transition-all group"
            >
              <div className="flex items-center space-x-2 text-pink-700 font-semibold text-xs">
                <Camera className="w-4 h-4" />
                <span>Field Image Split-Screen</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Click any ground photo to instantly center map coordinates and compare ground photo with satellite context.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('change-analysis')}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-300 cursor-pointer transition-all group"
            >
              <div className="flex items-center space-x-2 text-emerald-700 font-semibold text-xs">
                <Activity className="w-4 h-4" />
                <span>Swipe Change Detection</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Synchronized 2021 vs 2025 slider showing biomass increase, surface water spread, and erosion prevention.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('reports')}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-purple-50/50 hover:border-purple-300 cursor-pointer transition-all group"
            >
              <div className="flex items-center space-x-2 text-purple-700 font-semibold text-xs">
                <FileText className="w-4 h-4" />
                <span>Assessment Reporting</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Generate official watershed development reports with quantitative evidence, PDF print view, and GeoJSON export.
              </p>
            </div>
          </div>

          {/* Land Use / Land Cover Transition Summary Table */}
          <div className="mt-2 pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-800">LULC Dynamic Shift (2021 Baseline &rarr; 2025 Outcome)</span>
              <span className="text-[10px] text-slate-500 font-mono">DEMO DATASET &bull; SENTINEL-2 MSI</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[11px]">
                    <th className="py-1 font-medium">Land Classification</th>
                    <th className="py-1 font-medium">2021 (Ha)</th>
                    <th className="py-1 font-medium">2025 (Ha)</th>
                    <th className="py-1 font-medium">Net Shift</th>
                    <th className="py-1 font-medium">Change %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {LULC_CLASSES.map((c) => (
                    <tr key={c.name} className="hover:bg-slate-50">
                      <td className="py-1.5 flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }}></span>
                        <span className="font-medium text-slate-900">{c.name}</span>
                      </td>
                      <td className="py-1.5 text-slate-600">{c.areaHa2021}</td>
                      <td className="py-1.5 font-semibold text-slate-900">{c.areaHa2025}</td>
                      <td className={`py-1.5 font-semibold ${c.changeHa >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {c.changeHa >= 0 ? `+${c.changeHa}` : c.changeHa} Ha
                      </td>
                      <td className={`py-1.5 font-bold ${c.changePct >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {c.changePct >= 0 ? `+${c.changePct}%` : `${c.changePct}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Recent Geo-coded Field Photographs Feed */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Field Evidence</h3>
              <p className="text-xs text-slate-500">Geo-tagged photos with GNSS metadata</p>
            </div>
            <button
              onClick={() => setActiveTab('field-evidence')}
              className="text-xs text-sky-600 font-semibold hover:underline"
            >
              View All (24)
            </button>
          </div>

          <div className="divide-y divide-slate-100 my-2 space-y-2 overflow-y-auto max-h-[380px] pr-1">
            {FIELD_IMAGES.slice(0, 4).map((img) => (
              <div 
                key={img.id}
                onClick={() => {
                  openFieldImageDetail(img);
                  setActiveTab('field-evidence');
                }}
                className="pt-2 flex items-start space-x-3 cursor-pointer group hover:bg-slate-50 p-1.5 rounded transition-colors"
              >
                <div className="w-16 h-14 rounded overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                  <img src={img.thumbnail} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-sky-600 truncate">{img.id}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{img.captureDate}</span>
                  </div>
                  <div className="text-[11px] text-slate-700 font-medium truncate">{img.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    Lat: {img.latitude.toFixed(4)}°, Lon: {img.longitude.toFixed(4)}°
                  </div>
                  <div className="mt-1 flex items-center space-x-1.5">
                    <span className="text-[9px] px-1 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      ✓ Verified
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">Linked: {img.interventionId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <button
              onClick={() => setActiveTab('field-evidence')}
              className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
            >
              <span>Explore All Field Photographs</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
