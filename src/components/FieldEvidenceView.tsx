import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FIELD_IMAGES } from '../data/mockData';
import { FieldImage } from '../types';
import { 
  Camera, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  SplitSquareVertical, 
  Grid, 
  List, 
  Search, 
  ExternalLink, 
  Sliders, 
  Maximize2,
  Compass,
  ArrowRight,
  Info
} from 'lucide-react';
import { MapView } from './MapView';

export const FieldEvidenceView: React.FC = () => {
  const { 
    selectedFieldImage, 
    setSelectedFieldImage, 
    openFieldImageDetail, 
    isSplitScreen, 
    setIsSplitScreen, 
    setMapCenter, 
    setMapZoom, 
    layers, 
    setAllLayers,
    setActiveTab
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredImages = FIELD_IMAGES.filter((img) => {
    const matchesCategory = categoryFilter === 'All' || img.category === categoryFilter;
    const matchesSearch = 
      img.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      img.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (img.interventionId && img.interventionId.toLowerCase().includes(searchFilter.toLowerCase())) ||
      img.notes.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeImage = selectedFieldImage || FIELD_IMAGES[0];

  const handleSelectImage = (img: FieldImage) => {
    setSelectedFieldImage(img);
    setMapCenter([img.latitude, img.longitude]);
    setMapZoom(16);
    setIsSplitScreen(true);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] bg-slate-100 overflow-hidden">
      
      {/* Top Header & View Controls Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Camera className="w-5 h-5 text-pink-600" />
              <span>Geo-Coded Field Evidence Module</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-pink-100 text-pink-800 border border-pink-200">
              {FIELD_IMAGES.length} Photographs
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Ground-truth geotagged observations synchronized with satellite coordinates & watershed drainage network.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center space-x-2">
          {/* Split Screen Mode Toggle */}
          <button
            onClick={() => setIsSplitScreen(!isSplitScreen)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-all ${
              isSplitScreen 
                ? 'bg-pink-600 text-white border-pink-700 shadow-xs' 
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <SplitSquareVertical className="w-4 h-4" />
            <span>{isSplitScreen ? 'Exit Split Screen' : 'Split Screen Mode (Photo + Map)'}</span>
          </button>

          {/* Grid vs List toggle (when not in full split) */}
          {!isSplitScreen && (
            <div className="bg-slate-100 p-0.5 rounded border border-slate-200 flex items-center">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 overflow-x-auto py-0.5">
          <span className="text-slate-500 font-medium">Intervention Filter:</span>
          {['All', 'Check Dam', 'Farm Pond', 'Contour Bund', 'Percolation Tank', 'Gully Plug'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search photo ID, note or intervention..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded pl-7 pr-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
          <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400" />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {isSplitScreen ? (
        /* SPLIT SCREEN SYNCHRONIZATION WORKSTATION */
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          
          {/* LEFT: FIELD PHOTOGRAPH & METADATA */}
          <div className="flex flex-col bg-white border-r border-slate-200 overflow-y-auto">
            
            {/* Active Photograph Header */}
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm font-bold text-pink-400">{activeImage.id}</span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="font-semibold text-xs text-slate-200">{activeImage.title}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center space-x-2">
                  <span>Linked Intervention: <strong className="text-amber-400">{activeImage.interventionId}</strong></span>
                  <span>&bull;</span>
                  <span>{activeImage.watershedName}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-700">
                ✓ {activeImage.verificationStatus}
              </span>
            </div>

            {/* High-Resolution Field Photo Display */}
            <div className="p-4 bg-slate-950 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl border-2 border-slate-700 aspect-[4/3]">
                <img 
                  src={activeImage.image} 
                  alt={activeImage.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Detailed Metadata Panel (Under Photograph) */}
            <div className="p-4 space-y-3 bg-white flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Geotagging & Ground Survey Audit Metadata
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">GPS Latitude</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{activeImage.latitude.toFixed(6)}° N</div>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">GPS Longitude</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{activeImage.longitude.toFixed(6)}° E</div>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Capture Timestamp</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{activeImage.captureDate} ({activeImage.captureTime})</div>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Intervention ID</div>
                  <div className="font-bold text-amber-700 mt-0.5">{activeImage.interventionId || 'N/A'}</div>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Elevation / Altitude</div>
                  <div className="font-mono font-semibold text-slate-900 mt-0.5">{activeImage.altitudeMeters} m MSL</div>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Camera Azimuth</div>
                  <div className="font-mono font-semibold text-slate-900 mt-0.5">{activeImage.headingDegrees}° NE Bearing</div>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Nearest Water Body</div>
                  <div className="font-medium text-sky-800 mt-0.5 truncate">{activeImage.nearestWaterBody}</div>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Nearest Drainage</div>
                  <div className="font-medium text-sky-800 mt-0.5 truncate">{activeImage.nearestDrainageFeature}</div>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Soil Moisture State</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{activeImage.soilMoistureScore}</div>
                </div>
              </div>

              {/* Surveyor Notes Card */}
              <div className="p-3 bg-sky-50/60 rounded-md border border-sky-100 text-xs">
                <div className="font-bold text-sky-950 flex items-center justify-between">
                  <span>Ground Inspection Findings:</span>
                  <span className="text-[10px] font-mono text-slate-500">Surveyor: {activeImage.surveyor.name} ({activeImage.surveyor.designation})</span>
                </div>
                <p className="text-slate-700 mt-1 leading-relaxed">
                  {activeImage.notes}
                </p>
                <div className="mt-2 text-[10px] text-slate-500 flex items-center space-x-3 pt-2 border-t border-sky-200/60">
                  <span>Device: <strong>{activeImage.surveyor.deviceModel}</strong></span>
                  <span>Accuracy: <strong>±{activeImage.surveyor.gpsAccuracyMeters}m</strong></span>
                </div>
              </div>

              {/* Photo Selector Thumbnail Carousel */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-700 block mb-2">Switch Field Photo:</span>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {FIELD_IMAGES.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => handleSelectImage(img)}
                      className={`shrink-0 w-20 rounded border-2 overflow-hidden transition-all ${
                        activeImage.id === img.id ? 'border-pink-600 scale-105' : 'border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.thumbnail} alt={img.title} className="w-full h-12 object-cover" />
                      <div className="text-[9px] bg-slate-900 text-white font-mono text-center py-0.5">{img.id}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SYNCHRONIZED SATELLITE / GIS MAP */}
          <div className="relative flex flex-col bg-slate-200 h-full">
            <div className="p-2.5 bg-slate-900 text-white flex items-center justify-between text-xs font-medium z-10 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Synchronized Spatial Footprint (Coordinates: {activeImage.latitude.toFixed(5)}°, {activeImage.longitude.toFixed(5)}°)</span>
              </div>
              <button
                onClick={() => setAllLayers({ satelliteBase: true })}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded text-[11px] border border-slate-700"
              >
                Switch to Satellite Imagery
              </button>
            </div>
            
            <div className="flex-1 relative">
              <MapView />
            </div>
          </div>

        </div>
      ) : (
        /* GRID / LIST VIEW OF FIELD EVIDENCE */
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => handleSelectImage(img)}
                className="bg-white rounded-lg border border-slate-200 hover:border-pink-400 hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col group"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-white font-mono text-[10px] font-bold">
                    {img.id}
                  </div>
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
                    ✓ Verified
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-slate-950/80 text-slate-200 text-[10px] font-mono flex justify-between">
                    <span>{img.latitude.toFixed(4)}°N, {img.longitude.toFixed(4)}°E</span>
                    <span>{img.altitudeMeters}m</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-pink-600">
                      {img.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{img.captureDate}</span>
                      <span>&bull;</span>
                      <span className="text-amber-700 font-semibold">{img.interventionId}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {img.notes}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500">{img.watershedName}</span>
                    <span className="text-pink-600 font-semibold text-xs flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Inspect Map</span>
                      <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
