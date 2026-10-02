import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { 
  WATERSHED_BOUNDARY_COORDS, 
  DRAINAGE_FEATURES, 
  WATER_BODIES, 
  INTERVENTIONS, 
  FIELD_IMAGES, 
  CHANGE_RECORDS,
  SAMPLE_WATERSHED 
} from '../data/mockData';
import { FieldImage, Intervention } from '../types';
import { 
  Maximize2, 
  Minimize2, 
  Layers as LayersIcon, 
  Compass, 
  MapPin, 
  Info,
  ExternalLink,
  Camera,
  ShieldCheck
} from 'lucide-react';

export const MapView: React.FC = () => {
  const { 
    layers, 
    mapBase, 
    setMapBase,
    mapCenter, 
    mapZoom, 
    selectedFieldImage, 
    selectedIntervention,
    openFieldImageDetail,
    openInterventionDetail,
    setActiveTab
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<{ [key: string]: L.LayerGroup | L.Layer }>({});

  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLegend, setShowLegend] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: mapCenter,
        zoom: mapZoom,
        zoomControl: false,
        attributionControl: false,
      });

      // Add Zoom Control to bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Attribution
      L.control.attribution({ position: 'bottomleft', prefix: false })
        .addAttribution('&copy; <a href="https://openstreetmap.org" class="text-sky-600">OSM</a> | Watershed GeoVision (Demo)')
        .addTo(map);

      // Mouse coordinate tracker
      map.on('mousemove', (e) => {
        setMouseCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map instance alive across rerenders, or clean up on unmount
    };
  }, []);

  // Update Center and Zoom when context changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(mapCenter, mapZoom, { animate: true });
    }
  }, [mapCenter, mapZoom]);

  // Update Base Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layer
    if (layersGroupRef.current.baseTile) {
      map.removeLayer(layersGroupRef.current.baseTile);
    }

    let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let maxZoom = 19;

    const useSatellite = layers.satelliteBase || mapBase === 'satellite';

    if (useSatellite) {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      maxZoom = 18;
    } else if (mapBase === 'terrain') {
      tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      maxZoom = 17;
    }

    const tileLayer = L.tileLayer(tileUrl, { maxZoom });
    tileLayer.addTo(map);
    layersGroupRef.current.baseTile = tileLayer;
  }, [mapBase, layers.satelliteBase]);

  // Render Geospatial Vector Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // 1. Watershed Boundary
    if (layersGroupRef.current.watershedBoundary) {
      map.removeLayer(layersGroupRef.current.watershedBoundary);
    }
    if (layers.watershedBoundary) {
      const boundaryPolygon = L.polygon(WATERSHED_BOUNDARY_COORDS, {
        color: '#f59e0b',
        weight: 3,
        opacity: 0.9,
        dashArray: '8, 6',
        fillColor: '#fef3c7',
        fillOpacity: 0.12,
      }).addTo(map);

      boundaryPolygon.bindTooltip(
        `<div class="font-bold text-xs text-amber-900">${SAMPLE_WATERSHED.name}</div>
         <div class="text-[10px] text-amber-700">Area: ${SAMPLE_WATERSHED.areaHa} Ha (${SAMPLE_WATERSHED.areaSqKm} km²)</div>`,
        { permanent: false, sticky: true }
      );
      layersGroupRef.current.watershedBoundary = boundaryPolygon;
    }

    // 2. Drainage Network
    if (layersGroupRef.current.drainage) {
      map.removeLayer(layersGroupRef.current.drainage);
    }
    if (layers.drainageNetwork) {
      const drainageGroup = L.layerGroup();
      DRAINAGE_FEATURES.forEach((stream) => {
        const isPrimary = stream.order.includes('Primary');
        const isSecondary = stream.order.includes('Secondary');
        const color = isPrimary ? '#0284c7' : isSecondary ? '#0ea5e9' : '#38bdf8';
        const weight = isPrimary ? 4.5 : isSecondary ? 3 : 2;

        const line = L.polyline(stream.coordinates, {
          color,
          weight,
          opacity: 0.85,
        });

        line.bindPopup(`
          <div class="p-2.5 text-xs text-slate-800">
            <div class="font-bold text-sky-800 flex items-center space-x-1">
              <span>🌊</span>
              <span>${stream.name}</span>
            </div>
            <div class="mt-1 text-slate-600">Order: <span class="font-semibold">${stream.order}</span></div>
            <div class="text-slate-600">Length: <span class="font-semibold">${stream.lengthKm} km</span></div>
            <div class="text-slate-600">Flow: <span class="font-semibold">${stream.flowDirection}</span></div>
          </div>
        `);
        drainageGroup.addLayer(line);
      });
      drainageGroup.addTo(map);
      layersGroupRef.current.drainage = drainageGroup;
    }

    // 3. Water Bodies
    if (layersGroupRef.current.waterBodies) {
      map.removeLayer(layersGroupRef.current.waterBodies);
    }
    if (layers.waterBodies) {
      const waterGroup = L.layerGroup();
      WATER_BODIES.forEach((wb) => {
        const poly = L.polygon(wb.coordinates, {
          color: '#0369a1',
          weight: 2,
          fillColor: '#0284c7',
          fillOpacity: 0.65,
        });

        poly.bindPopup(`
          <div class="p-2.5 text-xs text-slate-800 min-w-[200px]">
            <div class="font-bold text-sky-800">${wb.name}</div>
            <div class="text-[11px] text-slate-500 font-mono">ID: ${wb.id} • ${wb.type}</div>
            <div class="mt-2 space-y-1 bg-sky-50 p-2 rounded border border-sky-100">
              <div class="flex justify-between"><span>Current Water Area:</span><span class="font-bold text-sky-900">${wb.currentAreaHa} Ha</span></div>
              <div class="flex justify-between"><span>Baseline (2021):</span><span>${wb.baselineAreaHa} Ha</span></div>
              <div class="flex justify-between text-emerald-700 font-bold"><span>Spread Change:</span><span>+${wb.areaChangePct}%</span></div>
              <div class="flex justify-between"><span>Seasonality:</span><span class="font-medium">${wb.seasonality}</span></div>
            </div>
          </div>
        `);
        waterGroup.addLayer(poly);
      });
      waterGroup.addTo(map);
      layersGroupRef.current.waterBodies = waterGroup;
    }

    // 4. Change Zones
    if (layersGroupRef.current.changeZones) {
      map.removeLayer(layersGroupRef.current.changeZones);
    }
    if (layers.changeZones) {
      const changeGroup = L.layerGroup();
      CHANGE_RECORDS.forEach((rec) => {
        const poly = L.polygon(rec.polygon, {
          color: '#10b981',
          weight: 2,
          fillColor: '#10b981',
          fillOpacity: 0.25,
          dashArray: '4, 4',
        });

        poly.bindPopup(`
          <div class="p-2.5 text-xs text-slate-800 min-w-[220px]">
            <div class="flex items-center space-x-1.5 text-emerald-800 font-bold">
              <span>✨</span>
              <span>${rec.changeType}</span>
            </div>
            <div class="text-[11px] text-slate-600 mt-0.5">${rec.locationName}</div>
            <div class="mt-2 p-2 bg-emerald-50 rounded border border-emerald-200 text-[11px] space-y-1">
              <div><span class="text-slate-500">Baseline (2021):</span> <span class="font-medium">${rec.beforeValue}</span></div>
              <div><span class="text-slate-500">Outcome (2025):</span> <span class="font-bold text-emerald-800">${rec.afterValue}</span></div>
              <div class="flex justify-between pt-1 border-t border-emerald-200">
                <span class="font-bold text-emerald-700">Improvement: +${rec.changePct}%</span>
                <span class="text-slate-500 font-mono">Conf: ${rec.confidencePct}%</span>
              </div>
            </div>
            <div class="mt-2 text-[10px] text-slate-500">Linked to: <strong class="text-slate-700">${rec.linkedInterventionName}</strong></div>
          </div>
        `);
        changeGroup.addLayer(poly);
      });
      changeGroup.addTo(map);
      layersGroupRef.current.changeZones = changeGroup;
    }

    // 5. Interventions
    if (layersGroupRef.current.interventions) {
      map.removeLayer(layersGroupRef.current.interventions);
    }
    if (layers.interventions) {
      const invGroup = L.layerGroup();
      INTERVENTIONS.forEach((inv) => {
        const isSelected = selectedIntervention?.id === inv.id;
        
        // Custom SVG Marker Icon
        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
            <div class="w-8 h-8 rounded-full shadow-md flex items-center justify-center ${
              isSelected 
                ? 'bg-amber-500 ring-4 ring-amber-300 ring-opacity-70 animate-pulse' 
                : 'bg-amber-600 hover:bg-amber-500'
            } text-white border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div class="absolute -bottom-1 w-2 h-2 bg-amber-700 transform rotate-45"></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-inv-marker',
          iconSize: [32, 36],
          iconAnchor: [16, 36],
          popupAnchor: [0, -36],
        });

        const marker = L.marker([inv.latitude, inv.longitude], { icon: customIcon });

        marker.on('click', () => {
          openInterventionDetail(inv);
        });

        marker.bindPopup(`
          <div class="p-3 text-xs text-slate-800 min-w-[240px]">
            <div class="flex items-center justify-between pb-1.5 border-b border-slate-200">
              <div class="font-bold text-slate-900">${inv.name}</div>
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                ${inv.id}
              </span>
            </div>
            <div class="mt-2 text-[11px] text-slate-600 space-y-1">
              <div>Type: <strong class="text-slate-800">${inv.type}</strong></div>
              <div>Sector: <strong class="text-slate-800">${inv.sector}</strong></div>
              <div>Status: <span class="text-emerald-700 font-bold">✓ ${inv.status}</span></div>
            </div>
            <div class="mt-2 p-2 bg-slate-50 rounded border border-slate-200 text-[11px] space-y-1">
              <div class="flex justify-between"><span>Vegetation Gain:</span><span class="font-bold text-emerald-700">+${inv.vegetationChangePct}%</span></div>
              <div class="flex justify-between"><span>Water Retention:</span><span class="font-bold text-sky-700">+${inv.waterChangePct}%</span></div>
              <div class="flex justify-between"><span>Sediment Trapped:</span><span class="font-medium text-slate-700">${inv.sedimentTrappedTons} Tons</span></div>
            </div>
            <button id="view-inv-${inv.id}" class="mt-2.5 w-full py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded text-xs transition-colors flex items-center justify-center space-x-1.5">
              <span>View Full Intervention Details</span>
              <span>&rarr;</span>
            </button>
          </div>
        `);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`view-inv-${inv.id}`);
          if (btn) {
            btn.onclick = () => {
              openInterventionDetail(inv);
              setActiveTab('interventions');
            };
          }
        });

        invGroup.addLayer(marker);
      });
      invGroup.addTo(map);
      layersGroupRef.current.interventions = invGroup;
    }

    // 6. Field Images
    if (layersGroupRef.current.fieldImages) {
      map.removeLayer(layersGroupRef.current.fieldImages);
    }
    if (layers.fieldImages) {
      const fieldGroup = L.layerGroup();
      FIELD_IMAGES.forEach((img) => {
        const isSelected = selectedFieldImage?.id === img.id;

        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-125">
            <div class="w-7 h-7 rounded-full shadow-md flex items-center justify-center ${
              isSelected 
                ? 'bg-pink-600 ring-4 ring-pink-300 ring-opacity-80 animate-bounce' 
                : 'bg-rose-600 hover:bg-rose-500'
            } text-white border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
            </div>
            <div class="absolute -bottom-1 w-1.5 h-1.5 bg-rose-800 transform rotate-45"></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-photo-marker',
          iconSize: [28, 32],
          iconAnchor: [14, 32],
          popupAnchor: [0, -32],
        });

        const marker = L.marker([img.latitude, img.longitude], { icon: customIcon });

        marker.on('click', () => {
          openFieldImageDetail(img);
        });

        marker.bindPopup(`
          <div class="p-2.5 text-xs text-slate-800 w-64">
            <div class="w-full h-28 rounded overflow-hidden bg-slate-900 border border-slate-200 mb-2">
              <img src="${img.thumbnail}" alt="${img.title}" class="w-full h-full object-cover" />
            </div>
            <div class="flex items-center justify-between pb-1">
              <span class="font-bold text-slate-900 text-xs">${img.id} • ${img.title}</span>
            </div>
            <div class="text-[11px] text-slate-600 font-mono">
              LAT: ${img.latitude.toFixed(5)}° | LON: ${img.longitude.toFixed(5)}°
            </div>
            <div class="mt-1 text-[11px] text-slate-600">
              Captured: <strong class="text-slate-800">${img.captureDate}</strong> (${img.captureTime})
            </div>
            <div class="text-[11px] text-slate-600">
              Linked: <span class="font-medium text-amber-700">${img.interventionId || 'None'}</span>
            </div>
            <div class="mt-1.5 flex items-center justify-between text-[10px]">
              <span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                ✓ ${img.verificationStatus}
              </span>
              <span class="text-slate-400 font-mono">Alt: ${img.altitudeMeters}m</span>
            </div>
            <button id="open-split-${img.id}" class="mt-2.5 w-full py-1.5 px-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded text-xs transition-colors flex items-center justify-center space-x-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="18" rx="2" ry="2"/>
                <line x1="12" y1="3" x2="12" y2="21"/>
              </svg>
              <span>Open in Split-Screen Mode</span>
            </button>
          </div>
        `);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`open-split-${img.id}`);
          if (btn) {
            btn.onclick = () => {
              openFieldImageDetail(img);
              setActiveTab('field-evidence');
            };
          }
        });

        fieldGroup.addLayer(marker);
      });
      fieldGroup.addTo(map);
      layersGroupRef.current.fieldImages = fieldGroup;
    }

  }, [layers, selectedIntervention, selectedFieldImage]);

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([SAMPLE_WATERSHED.center.lat, SAMPLE_WATERSHED.center.lng], 13, { animate: true });
    }
  };

  const toggleFullscreen = () => {
    if (!mapContainerRef.current) return;
    if (!document.fullscreenElement) {
      mapContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden bg-slate-100 flex flex-col">
      {/* Map Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Left: GIS HUD Bar */}
      <div className="absolute top-3 left-3 z-[400] flex items-center space-x-2">
        <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 px-3 py-1.5 rounded-md shadow-md text-xs text-slate-200 flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-semibold text-white">Karnataka &bull; Vijayapura</span>
          <span className="text-slate-500">|</span>
          <span className="font-mono text-sky-400 font-semibold">{SAMPLE_WATERSHED.code}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Area: 4,820 Ha</span>
        </div>

        {/* Reset View Button */}
        <button
          onClick={handleResetView}
          title="Reset map extent to watershed boundary"
          className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 p-1.5 rounded-md border border-slate-700 shadow-md text-xs font-medium flex items-center space-x-1"
        >
          <Compass className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">Extent</span>
        </button>
      </div>

      {/* Top Right: Cartographic & Layer Controls */}
      <div className="absolute top-3 right-3 z-[400] flex items-center space-x-2">
        {/* Base Map Switcher Pill */}
        <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 p-0.5 rounded-md shadow-md flex items-center text-xs">
          <button
            onClick={() => setMapBase('street')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              mapBase === 'street' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Street
          </button>
          <button
            onClick={() => setMapBase('satellite')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              mapBase === 'satellite' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapBase('terrain')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              mapBase === 'terrain' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Terrain
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 p-1.5 rounded-md border border-slate-700 shadow-md transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Right: Interactive Legend Card */}
      {showLegend && (
        <div className="absolute bottom-6 right-3 z-[400] bg-slate-900/95 backdrop-blur-sm border border-slate-700/80 rounded-lg p-3 shadow-xl text-xs text-slate-200 w-56">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-700 font-bold text-white text-[11px]">
            <span className="flex items-center space-x-1.5">
              <LayersIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>Map Legend & Symbology</span>
            </span>
            <button onClick={() => setShowLegend(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div className="mt-2 space-y-1.5 text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-sm border-2 border-amber-400 bg-amber-400/20"></span>
              <span>Watershed Boundary</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-1 bg-sky-500 rounded"></span>
              <span>Drainage Stream (Orders 1-3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-sm bg-sky-600 border border-sky-400"></span>
              <span>Water Body / Storage Tank</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-600 border border-white flex items-center justify-center">
                <span className="text-[7px] text-white">★</span>
              </div>
              <span>Interventions (Check Dams)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-white flex items-center justify-center">
                <span className="text-[7px] text-white">📷</span>
              </div>
              <span>Geo-Coded Field Photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-sm bg-emerald-500/30 border border-emerald-500"></span>
              <span>Detected Biomass Change Zone</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Center: Coordinates & HUD Info */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-[400] bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 px-3 py-1 rounded-full shadow-md text-[11px] text-slate-300 font-mono flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <MapPin className="w-3 h-3 text-sky-400" />
          <span>
            {mouseCoords ? `${mouseCoords.lat.toFixed(5)}° N, ${mouseCoords.lng.toFixed(5)}° E` : '16.83020° N, 75.71040° E'}
          </span>
        </div>
        <span className="text-slate-600">|</span>
        <span>EPSG:4326 (WGS84)</span>
        <span className="text-slate-600">|</span>
        <span className="text-emerald-400 font-semibold">Elev: ~584 m</span>
      </div>
    </div>
  );
};
