import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Map, 
  Layers, 
  Sliders, 
  Search, 
  MapPin, 
  Camera, 
  Satellite, 
  TreeDeciduous, 
  Droplets, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Info
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    watershed, 
    layers, 
    toggleLayer, 
    setAllLayers, 
    setActiveTab, 
    mapBase, 
    setMapBase, 
    loadSampleWatershed 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isStudyAreaOpen, setIsStudyAreaOpen] = useState(true);
  const [isLayersOpen, setIsLayersOpen] = useState(true);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(true);

  return (
    <aside className="w-80 shrink-0 bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col h-[calc(100vh-80px)] overflow-y-auto select-none">
      
      {/* 1. STUDY AREA SECTION */}
      <div className="border-b border-slate-800">
        <button
          onClick={() => setIsStudyAreaOpen(!isStudyAreaOpen)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-850 hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center space-x-2 text-sky-400">
            <Map className="w-4 h-4" />
            <span>1. Study Area (Watershed)</span>
          </span>
          {isStudyAreaOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {isStudyAreaOpen && (
          <div className="p-3.5 space-y-2.5 bg-slate-900/60 text-xs">
            {/* Hierarchy Selectors */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">State</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-sky-500 font-medium">
                  <option value="KA">Karnataka</option>
                  <option value="MH">Maharashtra</option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="MP">Madhya Pradesh</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">District</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-sky-500 font-medium">
                  <option value="VIJ">Vijayapura</option>
                  <option value="BAG">Bagalkot</option>
                  <option value="BEL">Belagavi</option>
                  <option value="KAL">Kalaburagi</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Watershed Micro-Catchment</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-sky-500 font-medium">
                <option value="WS-07">Sample Watershed 07 (Doni Basin)</option>
                <option value="WS-08" disabled>Sample Watershed 08 (Upcoming)</option>
                <option value="WS-12" disabled>Sample Watershed 12 (Upcoming)</option>
              </select>
            </div>

            {/* Location Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search intervention, lat/lng or village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded pl-7 pr-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400" />
            </div>

            {/* Study Area Snapshot Card */}
            <div className="bg-slate-800/80 rounded-md p-2.5 border border-slate-700/80 space-y-1 text-[11px]">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Watershed Code:</span>
                <span className="font-mono text-sky-300 font-semibold">{watershed.code}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Total Area:</span>
                <span className="font-semibold text-white">{watershed.areaHa.toLocaleString()} Ha ({watershed.areaSqKm} km²)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Sub-Basin:</span>
                <span className="text-slate-200">{watershed.subBasin}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Soil Moisture Interventions:</span>
                <span className="text-amber-400 font-semibold">{watershed.totalInterventions} units mapped</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Geo-coded Photographs:</span>
                <span className="text-emerald-400 font-semibold">{watershed.totalFieldImages} field photos</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. DATA LAYERS SECTION */}
      <div className="border-b border-slate-800">
        <button
          onClick={() => setIsLayersOpen(!isLayersOpen)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-850 hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center space-x-2 text-sky-400">
            <Layers className="w-4 h-4" />
            <span>2. Data Layers</span>
          </span>
          {isLayersOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {isLayersOpen && (
          <div className="p-3.5 space-y-2 bg-slate-900/60 text-xs">
            {/* Quick Presets */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Layer Stack</span>
              <div className="space-x-1.5 text-[10px]">
                <button
                  onClick={() => setAllLayers({
                    watershedBoundary: true,
                    drainageNetwork: true,
                    waterBodies: true,
                    interventions: true,
                    fieldImages: true,
                    satelliteBase: false,
                    lulcLayer: false,
                    ndviHeatmap: false,
                    changeZones: false
                  })}
                  className="text-sky-400 hover:underline"
                >
                  Standard
                </button>
                <span className="text-slate-600">•</span>
                <button
                  onClick={() => setAllLayers({
                    watershedBoundary: true,
                    drainageNetwork: true,
                    waterBodies: true,
                    interventions: true,
                    fieldImages: true,
                    satelliteBase: true,
                    lulcLayer: true,
                    ndviHeatmap: true,
                    changeZones: true
                  })}
                  className="text-sky-400 hover:underline"
                >
                  All On
                </button>
              </div>
            </div>

            {/* Layer Toggles */}
            <div className="space-y-1.5">
              {/* Watershed Boundary */}
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/80 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm border-2 border-amber-400 bg-amber-400/20 inline-block"></span>
                  <span className="font-medium text-slate-200">Watershed Boundary</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.watershedBoundary}
                  onChange={() => toggleLayer('watershedBoundary')}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-700 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Geo-coded Field Images */}
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/80 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <Camera className="w-3.5 h-3.5 text-pink-400" />
                  <span className="font-medium text-slate-200">Geo-coded Field Images</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-pink-900/60 text-pink-300 rounded font-mono">24</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.fieldImages}
                  onChange={() => toggleLayer('fieldImages')}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-700 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Interventions */}
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/80 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-medium text-slate-200">Interventions (Check Dams/Ponds)</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-900/60 text-amber-300 rounded font-mono">18</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.interventions}
                  onChange={() => toggleLayer('interventions')}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-700 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Water Bodies */}
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/80 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-medium text-slate-200">Water Bodies & Reservoirs</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.waterBodies}
                  onChange={() => toggleLayer('waterBodies')}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-700 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Drainage Network */}
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/80 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-0.5 bg-blue-400 inline-block"></span>
                  <span className="font-medium text-slate-200">Drainage Streams (Orders 1-3)</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.drainageNetwork}
                  onChange={() => toggleLayer('drainageNetwork')}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-700 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Satellite Imagery Base Toggle */}
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/80 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <Satellite className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-medium text-slate-200">Satellite Imagery Base</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.satelliteBase}
                  onChange={() => toggleLayer('satelliteBase')}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-700 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Vegetation (NDVI) */}
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/80 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <TreeDeciduous className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-medium text-slate-200">Vegetation Index (NDVI)</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.ndviHeatmap}
                  onChange={() => toggleLayer('ndviHeatmap')}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-700 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Land Use / Land Cover (LULC) */}
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/80 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-medium text-slate-200">Land Use / Land Cover (LULC)</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.lulcLayer}
                  onChange={() => toggleLayer('lulcLayer')}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-700 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Detected Change Zones */}
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/80 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm border border-emerald-500 bg-emerald-500/40 inline-block"></span>
                  <span className="font-medium text-slate-200">Detected Change Zones</span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.changeZones}
                  onChange={() => toggleLayer('changeZones')}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-700 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Base Map Selector */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-1 font-medium">Cartographic Base Map</span>
              <div className="grid grid-cols-3 gap-1">
                {(['street', 'satellite', 'terrain'] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setMapBase(b)}
                    className={`py-1 rounded text-[11px] capitalize font-medium border ${
                      mapBase === b
                        ? 'bg-sky-600 border-sky-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. ANALYSIS TOOLS & SHORTCUTS */}
      <div className="border-b border-slate-800">
        <button
          onClick={() => setIsAnalysisOpen(!isAnalysisOpen)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-850 hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center space-x-2 text-sky-400">
            <Sliders className="w-4 h-4" />
            <span>3. Analysis Workflows</span>
          </span>
          {isAnalysisOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {isAnalysisOpen && (
          <div className="p-3.5 space-y-1.5 bg-slate-900/60 text-xs">
            <button
              onClick={() => setActiveTab('field-evidence')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded bg-slate-800 hover:bg-slate-750 text-left border border-slate-700/60 text-slate-200 transition-colors group"
            >
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-pink-400" />
                <div>
                  <div className="font-semibold text-white group-hover:text-sky-300">Image Interpretation</div>
                  <div className="text-[10px] text-slate-400">Field photo + GIS alignment</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => setActiveTab('satellite')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded bg-slate-800 hover:bg-slate-750 text-left border border-slate-700/60 text-slate-200 transition-colors group"
            >
              <div className="flex items-center space-x-2">
                <Satellite className="w-4 h-4 text-sky-400" />
                <div>
                  <div className="font-semibold text-white group-hover:text-sky-300">Spatial Remote Sensing</div>
                  <div className="text-[10px] text-slate-400">Sentinel-2 MSI spectral indices</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => setActiveTab('change-analysis')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded bg-slate-800 hover:bg-slate-750 text-left border border-slate-700/60 text-slate-200 transition-colors group"
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-semibold text-white group-hover:text-sky-300">Change Detection (2021-2025)</div>
                  <div className="text-[10px] text-slate-400">Before vs after slider swipe</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => setActiveTab('interventions')}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded bg-slate-800 hover:bg-slate-750 text-left border border-slate-700/60 text-slate-200 transition-colors group"
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="font-semibold text-white group-hover:text-sky-300">Intervention Assessment</div>
                  <div className="text-[10px] text-slate-400">18 structures audit & outcomes</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-auto p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-start space-x-1.5">
          <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
          <span>
            Demonstration mode: Integrates simulated Bhuvan field camera coordinates with 30m/10m Sentinel-2 raster layers.
          </span>
        </div>
      </div>
    </aside>
  );
};
