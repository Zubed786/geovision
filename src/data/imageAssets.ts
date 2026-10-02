// Realistic SVG generator for field photographs and satellite imagery mockups
// Styled like authentic geo-tagged field camera photos (Bhuvan / GIS surveyor app)

export function createFieldPhotoSvg(params: {
  title: string;
  type: 'check_dam' | 'farm_pond' | 'contour_bund' | 'percolation_tank' | 'gully_plug' | 'gabion';
  id: string;
  lat: number;
  lng: number;
  date: string;
  intervention: string;
  isAfter?: boolean;
}): string {
  const { title, type, id, lat, lng, date, intervention, isAfter = true } = params;

  let sceneGraphics = '';

  if (type === 'check_dam') {
    sceneGraphics = `
      <!-- Sky & distant Deccan plateau hills -->
      <rect x="0" y="0" width="800" height="300" fill="url(#skyGrad)"/>
      <path d="M0 240 Q150 180 320 220 T650 190 L800 230 L800 300 L0 300 Z" fill="#b08968" opacity="0.7"/>
      <path d="M50 250 Q280 200 480 235 T800 215 L800 320 L0 320 Z" fill="#9c6644" opacity="0.6"/>

      <!-- Terraced farm fields & vegetation -->
      <path d="M0 300 L800 280 L800 600 L0 600 Z" fill="${isAfter ? '#588157' : '#bc6c25'}"/>
      ${isAfter ? `
        <!-- Lush crop rows -->
        <path d="M0 320 L350 310 L300 450 L0 440 Z" fill="#3a5a40" opacity="0.8"/>
        <path d="M500 300 L800 290 L800 440 L450 450 Z" fill="#344e41" opacity="0.7"/>
        <!-- Trees along banks -->
        <circle cx="120" cy="300" r="28" fill="#2d6a4f"/>
        <circle cx="150" cy="290" r="32" fill="#40916c"/>
        <circle cx="180" cy="305" r="25" fill="#2d6a4f"/>
        <circle cx="680" cy="285" r="30" fill="#2d6a4f"/>
        <circle cx="720" cy="275" r="35" fill="#40916c"/>
        <circle cx="650" cy="295" r="24" fill="#1b4332"/>
      ` : `
        <!-- Sparse shrubs in baseline -->
        <circle cx="140" cy="310" r="16" fill="#6b705c"/>
        <circle cx="670" cy="295" r="18" fill="#6b705c"/>
      `}

      <!-- Check Dam Reservoir (Upstream ponding) -->
      <path d="M140 370 Q400 350 660 370 L720 480 Q400 500 80 480 Z" fill="${isAfter ? '#1d3557' : '#7f5539'}"/>
      ${isAfter ? `
        <path d="M170 380 Q400 365 630 380 L680 470 Q400 490 120 470 Z" fill="#457b9d" opacity="0.85"/>
        <!-- Water ripple highlights -->
        <path d="M220 410 Q320 405 420 410" stroke="#a8dadc" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
        <path d="M360 435 Q460 430 560 435" stroke="#a8dadc" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
        <path d="M280 455 Q380 450 480 455" stroke="#a8dadc" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
      ` : `
        <!-- Silted dry bed in before state -->
        <path d="M170 380 Q400 365 630 380 L680 470 Q400 490 120 470 Z" fill="#9c6644" opacity="0.8"/>
      `}

      <!-- Masonry Check Dam Wall (Concrete/Stone Masonry Structure) -->
      <path d="M100 460 L700 460 L710 515 L90 515 Z" fill="#475569"/>
      <path d="M100 460 L700 460 L695 475 L105 475 Z" fill="#64748b"/>
      <!-- Stone block textures -->
      <line x1="180" y1="460" x2="180" y2="515" stroke="#334155" stroke-width="2"/>
      <line x1="260" y1="460" x2="260" y2="515" stroke="#334155" stroke-width="2"/>
      <line x1="340" y1="460" x2="340" y2="515" stroke="#334155" stroke-width="2"/>
      <line x1="420" y1="460" x2="420" y2="515" stroke="#334155" stroke-width="2"/>
      <line x1="500" y1="460" x2="500" y2="515" stroke="#334155" stroke-width="2"/>
      <line x1="580" y1="460" x2="580" y2="515" stroke="#334155" stroke-width="2"/>
      <line x1="640" y1="460" x2="640" y2="515" stroke="#334155" stroke-width="2"/>
      <line x1="100" y1="488" x2="700" y2="488" stroke="#334155" stroke-width="2"/>

      <!-- Spillway crest in the middle -->
      <rect x="360" y="460" width="80" height="25" fill="#334155"/>
      ${isAfter ? `
        <!-- Water cascading over spillway -->
        <path d="M365 475 L435 475 L445 540 L355 540 Z" fill="#f1faee" opacity="0.8"/>
        <!-- Downstream aprons & splash -->
        <ellipse cx="400" cy="545" rx="55" ry="12" fill="#a8dadc" opacity="0.9"/>
      ` : ''}

      <!-- Downstream rocky nullah channel bed -->
      <path d="M90 515 L710 515 L780 600 L20 600 Z" fill="#334155"/>
      <ellipse cx="250" cy="560" rx="30" ry="15" fill="#64748b"/>
      <ellipse cx="550" cy="570" rx="40" ry="20" fill="#64748b"/>
      <ellipse cx="380" cy="580" rx="50" ry="15" fill="#475569"/>
    `;
  } else if (type === 'farm_pond') {
    sceneGraphics = `
      <rect x="0" y="0" width="800" height="280" fill="url(#skyGrad)"/>
      <!-- Distant agricultural fields -->
      <path d="M0 240 L800 220 L800 320 L0 340 Z" fill="${isAfter ? '#588157' : '#bc6c25'}"/>
      <!-- Farm Pond (Krishi Honda) Trapezoidal Excavation -->
      <!-- Outer earthen embankment / bund -->
      <polygon points="60,300 740,280 770,570 30,590" fill="#78350f"/>
      <polygon points="90,320 710,300 735,550 65,565" fill="#92400e"/>
      <!-- Pond inner pit with water -->
      <polygon points="140,350 660,335 680,520 120,535" fill="${isAfter ? '#0369a1' : '#b45309'}"/>
      ${isAfter ? `
        <polygon points="155,365 645,350 665,510 135,525" fill="#0284c7" opacity="0.9"/>
        <!-- Clean water reflections -->
        <ellipse cx="400" cy="430" rx="180" ry="50" fill="#38bdf8" opacity="0.4"/>
        <line x1="250" y1="410" x2="380" y2="410" stroke="#e0f2fe" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
        <line x1="420" y1="440" x2="560" y2="440" stroke="#e0f2fe" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
        <!-- Drip irrigation pipe / pump set inlet -->
        <rect x="180" y="340" width="50" height="30" fill="#1e293b"/>
        <path d="M205 370 L205 450" stroke="#000" stroke-width="6"/>
        <!-- Lush horticultural banana & papaya plants nearby -->
        <circle cx="70" cy="380" r="35" fill="#2d6a4f"/>
        <circle cx="50" cy="440" r="40" fill="#40916c"/>
        <circle cx="740" cy="360" r="35" fill="#2d6a4f"/>
        <circle cx="760" cy="420" r="40" fill="#40916c"/>
      ` : `
        <!-- Dry excavated bed -->
        <polygon points="155,365 645,350 665,510 135,525" fill="#78350f" opacity="0.9"/>
      `}
    `;
  } else if (type === 'contour_bund') {
    sceneGraphics = `
      <rect x="0" y="0" width="800" height="260" fill="url(#skyGrad)"/>
      <path d="M0 220 Q400 170 800 200 L800 600 L0 600 Z" fill="${isAfter ? '#588157' : '#9a3412'}"/>
      <!-- Successive contour bund lines across hillside slope -->
      <path d="M0 280 Q400 240 800 260" stroke="#78350f" stroke-width="16" fill="none"/>
      <path d="M0 360 Q400 310 800 340" stroke="#78350f" stroke-width="22" fill="none"/>
      <path d="M0 450 Q400 390 800 430" stroke="#78350f" stroke-width="28" fill="none"/>
      <path d="M0 550 Q400 480 800 520" stroke="#78350f" stroke-width="34" fill="none"/>

      <!-- Vegetative barrier grass / vetiver planting along bunds -->
      ${isAfter ? `
        <path d="M10 270 Q400 230 790 250" stroke="#16a34a" stroke-width="8" stroke-dasharray="10,8" fill="none"/>
        <path d="M10 350 Q400 300 790 330" stroke="#16a34a" stroke-width="12" stroke-dasharray="14,10" fill="none"/>
        <path d="M10 440 Q400 380 790 420" stroke="#15803d" stroke-width="16" stroke-dasharray="18,12" fill="none"/>
        <!-- Moisture retainers -->
        <ellipse cx="200" cy="380" rx="30" ry="8" fill="#0284c7" opacity="0.6"/>
        <ellipse cx="500" cy="360" rx="40" ry="10" fill="#0284c7" opacity="0.6"/>
        <ellipse cx="350" cy="465" rx="55" ry="12" fill="#0284c7" opacity="0.6"/>
      ` : ''}
    `;
  } else {
    // Percolation tank / Gully plug / Gabion
    sceneGraphics = `
      <rect x="0" y="0" width="800" height="280" fill="url(#skyGrad)"/>
      <path d="M0 240 Q300 200 800 220 L800 600 L0 600 Z" fill="${isAfter ? '#3f6212' : '#854d0e'}"/>
      <!-- Gully / Ravine erosion bed -->
      <path d="M250 240 L550 240 L650 600 L150 600 Z" fill="#713f12"/>
      <!-- Gabion wire mesh with packed boulders -->
      <polygon points="200,420 600,420 620,510 180,510" fill="#475569"/>
      <polygon points="200,420 600,420 590,440 210,440" fill="#64748b"/>
      <!-- Wire mesh grid lines -->
      <line x1="200" y1="450" x2="600" y2="450" stroke="#94a3b8" stroke-width="2"/>
      <line x1="190" y1="480" x2="610" y2="480" stroke="#94a3b8" stroke-width="2"/>
      <line x1="260" y1="420" x2="250" y2="510" stroke="#94a3b8" stroke-width="2"/>
      <line x1="330" y1="420" x2="330" y2="510" stroke="#94a3b8" stroke-width="2"/>
      <line x1="400" y1="420" x2="400" y2="510" stroke="#94a3b8" stroke-width="2"/>
      <line x1="470" y1="420" x2="470" y2="510" stroke="#94a3b8" stroke-width="2"/>
      <line x1="540" y1="420" x2="550" y2="510" stroke="#94a3b8" stroke-width="2"/>
      ${isAfter ? `
        <!-- Accumulated silt and trapped moisture upstream -->
        <polygon points="230,360 570,360 600,420 200,420" fill="#0284c7" opacity="0.8"/>
        <ellipse cx="400" cy="390" rx="120" ry="20" fill="#38bdf8" opacity="0.7"/>
      ` : ''}
    `;
  }

  // Combine with authentic Government Field Camera Watermark & HUD
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="60%" stop-color="#bae6fd"/>
          <stop offset="100%" stop-color="#f0f9ff"/>
        </linearGradient>
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.5"/>
        </filter>
      </defs>

      <!-- Scenery -->
      ${sceneGraphics}

      <!-- Center Crosshair Target (Surveyor viewfinder) -->
      <circle cx="400" cy="300" r="28" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,4" fill="none" opacity="0.6"/>
      <line x1="360" y1="300" x2="440" y2="300" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
      <line x1="400" y1="260" x2="400" y2="340" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>

      <!-- Government Department Geo-tag HUD Header -->
      <rect x="16" y="16" width="340" height="42" rx="4" fill="#0f172a" fill-opacity="0.85" filter="url(#shadow)"/>
      <circle cx="36" cy="37" r="10" fill="#0284c7"/>
      <path d="M33 37L35 39L39 34" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <text x="56" y="32" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">WATERSHED GEOVISION • BHUVAN AUDIT</text>
      <text x="56" y="47" fill="#f8fafc" font-family="sans-serif" font-size="12" font-weight="600">${id} • ${title}</text>

      <!-- Geotag Banner HUD Footer (Accredited Field Surveyor App format) -->
      <rect x="0" y="520" width="800" height="80" fill="#0f172a" fill-opacity="0.9"/>
      <rect x="0" y="518" width="800" height="2" fill="#0284c7"/>

      <!-- Left: Coordinates & Elevation -->
      <text x="24" y="544" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">GPS COORDINATES</text>
      <text x="24" y="562" fill="#ffffff" font-family="monospace" font-size="14" font-weight="700">LAT: ${lat.toFixed(5)}° N  |  LON: ${lng.toFixed(5)}° E</text>
      <text x="24" y="582" fill="#94a3b8" font-family="monospace" font-size="11">ALT: 584.2 m | ACCURACY: ±1.8m | BEARING: 42° NE</text>

      <!-- Middle: Linked Intervention -->
      <text x="380" y="544" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">LINKED INTERVENTION</text>
      <text x="380" y="562" fill="#facc15" font-family="sans-serif" font-size="14" font-weight="700">${intervention}</text>
      <text x="380" y="582" fill="#94a3b8" font-family="sans-serif" font-size="11">Sample Watershed 07 • Sector A</text>

      <!-- Right: Timestamp & Status -->
      <text x="640" y="544" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">CAPTURE TIMESTAMP</text>
      <text x="640" y="562" fill="#ffffff" font-family="monospace" font-size="13" font-weight="600">${date} 10:42 IST</text>
      <rect x="640" y="570" width="135" height="20" rx="3" fill="#15803d"/>
      <text x="648" y="584" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="700">✓ VERIFIED ON GROUND</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Satellite False Color Composite (FCC) & True Color mockup generator
export function createSatelliteViewSvg(params: {
  year: number;
  type: 'true_color' | 'fcc' | 'ndvi' | 'ndwi';
  highlightLat?: number;
  highlightLng?: number;
}): string {
  const { year, type } = params;
  const is2025 = year >= 2025;

  let bgFill = '';
  let vegetationFill = '';
  let waterFill = '';
  let secondaryStreamStroke = '';

  if (type === 'true_color') {
    bgFill = is2025 ? '#a3937b' : '#c2b299'; // Deccan black/clay dry soil
    vegetationFill = is2025 ? '#386641' : '#6b705c'; // green crop cover
    waterFill = '#1d3557';
    secondaryStreamStroke = '#457b9d';
  } else if (type === 'fcc') {
    // Standard NIR False Color: Vegetation is Bright Red / Magenta, Water is Deep Navy / Black, Bare soil is Cyan/Grey
    bgFill = '#8ecae6';
    vegetationFill = is2025 ? '#d90429' : '#e07a5f';
    waterFill = '#03045e';
    secondaryStreamStroke = '#0077b6';
  } else if (type === 'ndvi') {
    // NDVI Colormap: Brown/Yellow (0-0.2) to Bright Green (0.6-0.8)
    bgFill = '#e9edc9';
    vegetationFill = is2025 ? '#1b4332' : '#74c69d';
    waterFill = '#023e8a';
    secondaryStreamStroke = '#2a9d8f';
  } else {
    // NDWI Water index
    bgFill = '#f1f5f9';
    vegetationFill = '#cbd5e1';
    waterFill = '#0284c7';
    secondaryStreamStroke = '#38bdf8';
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="${bgFill}"/>

      <!-- Watershed Boundary Ridge Lines -->
      <path d="M100 80 Q250 40 450 60 T720 120 Q760 300 700 480 T400 560 Q200 540 100 420 Z" 
            fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="8,4" opacity="0.8"/>

      <!-- Natural drainage stream tributaries -->
      <path d="M680 140 Q550 220 440 280 T300 420 Q200 480 120 500" 
            fill="none" stroke="${secondaryStreamStroke}" stroke-width="${is2025 ? '7' : '3'}" opacity="0.9"/>
      <path d="M480 80 Q460 180 440 280" 
            fill="none" stroke="${secondaryStreamStroke}" stroke-width="${is2025 ? '5' : '2'}" opacity="0.8"/>
      <path d="M600 380 Q450 350 300 420" 
            fill="none" stroke="${secondaryStreamStroke}" stroke-width="${is2025 ? '4' : '2'}" opacity="0.8"/>

      <!-- Water Bodies (Tanks, check dam impoundments, farm ponds) -->
      <!-- Main Doni Check Dam Reservoir -->
      <ellipse cx="440" cy="280" rx="${is2025 ? '52' : '22'}" ry="${is2025 ? '32' : '14'}" fill="${waterFill}"/>
      <!-- Village Tank (Percolation Pond) -->
      <ellipse cx="300" cy="420" rx="${is2025 ? '65' : '35'}" ry="${is2025 ? '40' : '20'}" fill="${waterFill}"/>
      <!-- Farm Ponds clustered in agricultural zones -->
      <rect x="490" y="210" width="${is2025 ? '18' : '10'}" height="${is2025 ? '14' : '8'}" rx="2" fill="${waterFill}"/>
      <rect x="530" y="240" width="${is2025 ? '20' : '12'}" height="${is2025 ? '16' : '9'}" rx="2" fill="${waterFill}"/>
      <rect x="250" y="360" width="${is2025 ? '16' : '8'}" height="${is2025 ? '12' : '6'}" rx="2" fill="${waterFill}"/>

      <!-- Vegetated agricultural belts along stream corridors -->
      <path d="M380 230 Q440 200 520 230 T600 290 Q540 340 440 320 T360 270 Z" 
            fill="${vegetationFill}" opacity="${is2025 ? '0.85' : '0.4'}"/>
      <path d="M220 370 Q300 340 370 370 T400 460 Q320 480 240 450 Z" 
            fill="${vegetationFill}" opacity="${is2025 ? '0.85' : '0.45'}"/>
      ${is2025 ? `
        <!-- Expanded green crop canopy in 2025 -->
        <path d="M500 130 Q650 120 680 220 T560 360 Q480 280 470 190 Z" fill="${vegetationFill}" opacity="0.8"/>
        <path d="M140 430 Q220 410 260 480 T150 530 Z" fill="${vegetationFill}" opacity="0.75"/>
      ` : ''}

      <!-- Grid Overlay (UTM coordinate ticks) -->
      <line x1="200" y1="0" x2="200" y2="600" stroke="#000" stroke-width="0.5" stroke-dasharray="2,6" opacity="0.3"/>
      <line x1="400" y1="0" x2="400" y2="600" stroke="#000" stroke-width="0.5" stroke-dasharray="2,6" opacity="0.3"/>
      <line x1="600" y1="0" x2="600" y2="600" stroke="#000" stroke-width="0.5" stroke-dasharray="2,6" opacity="0.3"/>
      <line x1="0" y1="150" x2="800" y2="150" stroke="#000" stroke-width="0.5" stroke-dasharray="2,6" opacity="0.3"/>
      <line x1="0" y1="300" x2="800" y2="300" stroke="#000" stroke-width="0.5" stroke-dasharray="2,6" opacity="0.3"/>
      <line x1="0" y1="450" x2="800" y2="450" stroke="#000" stroke-width="0.5" stroke-dasharray="2,6" opacity="0.3"/>

      <!-- Satellite Sensor HUD Stamp -->
      <rect x="20" y="20" width="310" height="52" rx="4" fill="#0f172a" fill-opacity="0.85"/>
      <text x="32" y="38" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">SENTINEL-2 MSI • 10M SPATIAL RESOLUTION</text>
      <text x="32" y="58" fill="#ffffff" font-family="monospace" font-size="14" font-weight="700">${year} OBSERVATION • ${type.toUpperCase()}</text>

      <rect x="590" y="20" width="190" height="52" rx="4" fill="#0f172a" fill-opacity="0.85"/>
      <text x="602" y="38" fill="#94a3b8" font-family="monospace" font-size="10">DEMO SATELLITE DATASET</text>
      <text x="602" y="58" fill="#facc15" font-family="sans-serif" font-size="12" font-weight="700">WATERSHED WS-07</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
