import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createSatelliteViewSvg } from '../data/imageAssets';
import { SAMPLE_WATERSHED, LULC_CLASSES, WATER_BODIES } from '../data/mockData';
import { 
  Satellite, 
  Layers, 
  Calendar, 
  TreeDeciduous, 
  Droplets, 
  Activity, 
  Info, 
  Sliders, 
  Crosshair,
  BarChart2,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const SatelliteAnalysisView: React.FC = () => {
  const { 
    satelliteYear, 
    setSatelliteYear, 
    satelliteMode, 
    setSatelliteMode,
    setActiveTab
  } = useApp();

  const [opacity, setOpacity] = useState<number>(90);
  const [selectedPixel, setSelectedPixel] = useState<{
    x: number;
    y: number;
    bandValues: { blue: number; green: number; red: number; nir: number; swir1: number };
    ndvi: number;
    ndwi: number;
    classification: string;
  }>({
    x: 440,
    y: 280,
    bandValues: { blue: 0.08, green: 0.12, red: 0.09, nir: 0.58, swir1: 0.14 },
    ndvi: 0.73,
    ndwi: 0.45,
    classification: 'Check Dam 014 Command Area (Irrigated Cropland)'
  });

  const handleSimulateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    // Generate realistic spectral values based on year and position
    const isLush = satelliteYear === 2025 && y > 200 && y < 450;
    const isWater = y > 240 && y < 320 && x > 380 && x < 500;

    let blue = 0.09;
    let green = 0.14;
    let red = isLush ? 0.07 : 0.22;
    let nir = isWater ? 0.04 : isLush ? 0.62 : 0.28;
    let swir1 = isWater ? 0.02 : 0.18;

    const ndvi = Number(((nir - red) / (nir + red)).toFixed(2));
    const ndwi = Number(((green - nir) / (green + nir)).toFixed(2));

    let classification = 'Barren / Fallow Deccan Soil';
    if (isWater) classification = 'Open Surface Water (Impoundment)';
    else if (ndvi > 0.5) classification = 'Dense Healthy Crop Canopy';
    else if (ndvi > 0.3) classification = 'Moderate Seasonal Vegetation';

    setSelectedPixel({
      x,
      y,
      bandValues: { blue, green, red, nir, swir1 },
      ndvi,
      ndwi,
      classification
    });
  };

  const satelliteImageSrc = createSatelliteViewSvg({
    year: satelliteYear,
    type: satelliteMode
  });

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] bg-slate-900 text-slate-100 overflow-hidden">
      
      {/* Top Header & Resolution Workflow Banner */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <Satellite className="w-5 h-5 text-sky-400" />
              <span>Multi-Spectral Satellite Analysis Workstation</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-700">
              Sentinel-2 MSI &bull; 10m/30m
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Satellite Layer &bull; Demo Data &bull; 30 m spatial-resolution workflow for watershed outcome interpretation.
          </p>
        </div>

        {/* Date Selector: Baseline 2021 vs Outcome 2025 */}
        <div className="flex items-center space-x-3 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <Calendar className="w-4 h-4 text-sky-400" />
          <span className="text-xs text-slate-400 font-medium">Observation Epoch:</span>
          <div className="flex rounded bg-slate-800 p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => setSatelliteYear(2021)}
              className={`px-3 py-1 rounded font-semibold transition-colors ${
                satelliteYear === 2021 ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Baseline (2021)
            </button>
            <button
              onClick={() => setSatelliteYear(2025)}
              className={`px-3 py-1 rounded font-semibold transition-colors ${
                satelliteYear === 2025 ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Current (2025)
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 overflow-hidden">
        
        {/* Left Column: Spectral & Layer Controls Panel */}
        <div className="bg-slate-950 border-r border-slate-800 p-4 overflow-y-auto space-y-4 text-xs">
          
          {/* Spectral Product Selection */}
          <div>
            <h3 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-2 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Spectral Products & Indices</span>
            </h3>

            <div className="space-y-1.5">
              <button
                onClick={() => setSatelliteMode('true_color')}
                className={`w-full p-2.5 rounded text-left border flex items-center justify-between transition-colors ${
                  satelliteMode === 'true_color'
                    ? 'bg-sky-950/80 border-sky-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="font-semibold">True Color (RGB B4-B3-B2)</div>
                  <div className="text-[10px] text-slate-400">Natural surface reflectance</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              </button>

              <button
                onClick={() => setSatelliteMode('fcc')}
                className={`w-full p-2.5 rounded text-left border flex items-center justify-between transition-colors ${
                  satelliteMode === 'fcc'
                    ? 'bg-sky-950/80 border-sky-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="font-semibold text-rose-300">False Color Composite (NIR-R-G)</div>
                  <div className="text-[10px] text-slate-400">Vigorous crops shown in bright crimson</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              </button>

              <button
                onClick={() => setSatelliteMode('ndvi')}
                className={`w-full p-2.5 rounded text-left border flex items-center justify-between transition-colors ${
                  satelliteMode === 'ndvi'
                    ? 'bg-sky-950/80 border-sky-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="font-semibold text-emerald-300">Vegetation Index (NDVI)</div>
                  <div className="text-[10px] text-slate-400">Biomass health (NIR - Red) / (NIR + Red)</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </button>

              <button
                onClick={() => setSatelliteMode('ndwi')}
                className={`w-full p-2.5 rounded text-left border flex items-center justify-between transition-colors ${
                  satelliteMode === 'ndwi'
                    ? 'bg-sky-950/80 border-sky-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="font-semibold text-sky-300">Normalized Water Index (NDWI)</div>
                  <div className="text-[10px] text-slate-400">Surface water detection (G - NIR)/(G + NIR)</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              </button>
            </div>
          </div>

          {/* Opacity Slider */}
          <div className="p-3 bg-slate-900 rounded-md border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Raster Layer Opacity</span>
              <span className="font-mono text-sky-400 font-bold">{opacity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          {/* Thematic Legend Breakdown */}
          <div className="p-3 bg-slate-900 rounded-md border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
              Thematic Classification Legend
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-sm bg-emerald-600"></span>
                  <span>Agriculture / High Biomass</span>
                </span>
                <span className="text-slate-400">NDVI &gt; 0.50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-sm bg-lime-500"></span>
                  <span>Moderate Crop Canopy</span>
                </span>
                <span className="text-slate-400">0.25 - 0.50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-sm bg-sky-600"></span>
                  <span>Open Water Bodies</span>
                </span>
                <span className="text-slate-400">NDWI &gt; 0.15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-sm bg-amber-600"></span>
                  <span>Barren / Fallow Soil</span>
                </span>
                <span className="text-slate-400">&lt; 0.20</span>
              </div>
            </div>
          </div>

          {/* Jump to Before/After Swipe */}
          <button
            onClick={() => setActiveTab('change-analysis')}
            className="w-full py-2 px-3 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2"
          >
            <span>Open Side-by-Side Change Slider</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Center 2 Columns: Satellite Raster Interactive Canvas */}
        <div className="lg:col-span-2 relative bg-slate-950 flex flex-col items-center justify-center p-3 select-none overflow-hidden">
          
          <div 
            onClick={handleSimulateClick}
            className="relative w-full h-full max-h-[600px] aspect-[4/3] rounded-lg overflow-hidden border border-slate-800 shadow-2xl cursor-crosshair group"
            style={{ opacity: opacity / 100 }}
          >
            <img 
              src={satelliteImageSrc} 
              alt="Sentinel-2 Satellite Layer" 
              className="w-full h-full object-cover" 
            />

            {/* Clicked Pixel Crosshair Indicator */}
            <div 
              className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-150"
              style={{ left: `${(selectedPixel.x / 600) * 100}%`, top: `${(selectedPixel.y / 450) * 100}%` }}
            >
              <div className="w-full h-full border border-sky-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-sky-400 rounded-full border border-white"></div>
              </div>
            </div>

            {/* Click to inspect tooltip */}
            <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded text-[11px] text-slate-300 pointer-events-none flex items-center space-x-1.5">
              <Crosshair className="w-3.5 h-3.5 text-sky-400" />
              <span>Click anywhere on raster image to inspect spectral pixel profile</span>
            </div>
          </div>

          {/* Bottom HUD Bar */}
          <div className="w-full mt-2 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
            <span>Spatial Resolution: <strong>10 meters Ground Sample Distance (GSD)</strong></span>
            <span>Cloud Cover: <strong>0.0% (Ortho-rectified)</strong></span>
            <span>Sensor: <strong>Sentinel-2B MSI Multi-Spectral</strong></span>
          </div>
        </div>

        {/* Right 1 Column: Pixel Spectral Inspector & Zonal Analytics */}
        <div className="bg-slate-950 border-l border-slate-800 p-4 overflow-y-auto space-y-4 text-xs">
          
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
            <Crosshair className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-slate-200">Pixel Spectral Inspector</h3>
          </div>

          {/* Inspected Point Metadata */}
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Identified Land Feature</div>
              <div className="font-bold text-emerald-400 text-xs mt-0.5">{selectedPixel.classification}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <div className="bg-slate-850 p-2 rounded border border-slate-700/60">
                <div className="text-[10px] text-slate-400">Calculated NDVI</div>
                <div className="text-base font-bold text-emerald-400 font-mono">{selectedPixel.ndvi}</div>
                <div className="text-[9px] text-slate-500">Biomass Vigor</div>
              </div>

              <div className="bg-slate-850 p-2 rounded border border-slate-700/60">
                <div className="text-[10px] text-slate-400">Calculated NDWI</div>
                <div className="text-base font-bold text-sky-400 font-mono">{selectedPixel.ndwi}</div>
                <div className="text-[9px] text-slate-500">Water Index</div>
              </div>
            </div>
          </div>

          {/* Multi-spectral Band Reflectance Profile (B2, B3, B4, B8, B11) */}
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-slate-300">Surface Reflectance (TOA)</span>
              <span className="text-[10px] text-slate-500 font-mono">Bands 2-11</span>
            </div>

            <div className="space-y-1.5 pt-1 text-[11px]">
              <div>
                <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
                  <span>Band 2 (Blue 490nm)</span>
                  <span className="font-mono text-slate-200">{(selectedPixel.bandValues.blue * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${selectedPixel.bandValues.blue * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
                  <span>Band 3 (Green 560nm)</span>
                  <span className="font-mono text-slate-200">{(selectedPixel.bandValues.green * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${selectedPixel.bandValues.green * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
                  <span>Band 4 (Red 665nm)</span>
                  <span className="font-mono text-slate-200">{(selectedPixel.bandValues.red * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${selectedPixel.bandValues.red * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
                  <span>Band 8 (NIR 842nm)</span>
                  <span className="font-mono text-slate-200">{(selectedPixel.bandValues.nir * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedPixel.bandValues.nir * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
                  <span>Band 11 (SWIR 1610nm)</span>
                  <span className="font-mono text-slate-200">{(selectedPixel.bandValues.swir1 * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${selectedPixel.bandValues.swir1 * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Scientific Interpretation Note */}
          <div className="p-3 bg-sky-950/40 rounded-lg border border-sky-800/60 text-[11px] text-sky-200 space-y-1">
            <div className="font-bold flex items-center space-x-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>Hydrological Outcome Evidence</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Strong NIR reflectance peak indicates vigorous photosynthetic chlorophyll absorption. Ground-truth geotagged images corroborate that the check dam reservoir upstream provides steady soil moisture diffusion.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
