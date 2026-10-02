# Watershed GeoVision
### Geospatial Visualization & Analysis for Watershed Development
**SIH 2026 Problem Statement 26015 Prototype**

> *"Application of Geospatial Techniques for visualization and analysis to interpret Geo-Coded Images to enhance watershed Development Outcomes."*

---

## 🌟 Overview

**Watershed GeoVision** demonstrates how **geo-coded field photographs** (captured via ground GNSS/Bhuvan field survey apps) and **Sentinel-2 multi-spectral satellite imagery** can be integrated with **GIS vector boundaries and drainage networks** to monitor, verify, and quantify watershed development outcomes.

The platform establishes an unbroken **Chain of Evidence**:

$$\text{Geo-coded Field Photo} \longrightarrow \text{Spatial Alignment} \longrightarrow \text{Watershed Context} \longrightarrow \text{Satellite Temporal Shift} \longrightarrow \text{Thematic Interpretation (NDVI/NDWI)} \longrightarrow \text{Intervention Outcome Verification} \longrightarrow \text{Official Assessment Report}$$

---

## 🏛️ Application Architecture & Pages

1. **Dashboard (`/`)**:
   - Executive GIS decision support view with the 7-step Scientific Workflow Pipeline.
   - 5 Key Performance Indicators: Watershed Area (4,820 Ha), Field Evidence (24 photos / 22 verified), Interventions (18 structures), Water Spread (+55.1%), and Biomass Gain (+12.4%).
   - Land Use / Land Cover (LULC) dynamic transition matrix.
   - Direct launchpad for the **11-Step Judge Evaluation Demo Flow**.

2. **Map Analysis (`/map`)**:
   - Full-screen interactive Leaflet GIS cartographic workstation.
   - Left sidebar with **Study Area** hierarchy (Karnataka &rarr; Vijayapura &rarr; Sample Watershed 07), **Data Layer Toggles** (Watershed boundary, Sub-catchments, Drainage network, Water bodies, Interventions, Field photos, Satellite base, LULC, NDVI), and **Base Map Switcher** (Street, Satellite, Terrain).
   - Real-time coordinate HUD, elevation display, and scale bar.
   - Rich interactive feature popups with deep links to split-screen and dossiers.

3. **Field Evidence (`/field-evidence`)**:
   - Dedicated geotagged photo repository with filter by structure type (Check Dams, Farm Ponds, Contour Bunds, Percolation Tanks, Gully Plugs).
   - **Split-Screen Mode**: Left side displays the high-resolution field camera photo with viewfinder HUD, GPS latitude/longitude, altitude, azimuth bearing, and surveyor notes; Right side displays the synchronized satellite/GIS map.

4. **Satellite Analysis (`/satellite`)**:
   - Multi-spectral remote sensing workstation (Sentinel-2 10m/30m resolution workflow).
   - Epoch toggle between **Baseline (2021)** and **Current (2025)**.
   - Spectral Product Modes:
     - **True Color (RGB B4-B3-B2)**
     - **False Color Composite (NIR-R-G)**: Highlights healthy biomass in crimson.
     - **Vegetation Index (NDVI)**: $(NIR - Red) / (NIR + Red)$
     - **Normalized Water Index (NDWI)**: $(Green - NIR) / (Green + NIR)$
   - **Interactive Pixel Spectral Inspector**: Click on any raster point to view multi-band surface reflectance profile (B2, B3, B4, B8, B11) and calculated indices.

5. **Change Analysis (`/change-analysis`)**:
   - Page Title: **Watershed Change Analysis**.
   - Side-by-side synchronized comparison and **Interactive Horizontal Swipe Slider** to reveal 2021 Baseline vs 2025 Outcome.
   - Summary Metrics:
     - **Vegetation Change**: $+12.4\%$
     - **Water Surface Change**: $+8.7\%$
     - **Built-up Change**: $+2.1\%$
     - **Intervention Coverage**: $+14.8\%$
   - **Detected Changes Table** detailing location, sector, change type, baseline, outcome, change $\%$, confidence score, and linked intervention.

6. **Intervention Monitoring (`/interventions`)**:
   - Inventory of 18 soil and water conservation structures across Watershed WS-07.
   - Filterable table with operational status, vegetation gain $\%$, water retention $\%$, and sediment trapped.
   - **Audit Dossier Modal**: Before vs After field photos, structural specifications, capital expenditure, and downstream beneficiary farmers.

7. **Reports (`/reports`)**:
   - Structured **Watershed Development Assessment Report** in official government format.
   - Sections: Study Area Profile, Data Sources, Field Evidence Summary, Thematic Shifts, Temporal Change Detection, and Hydrological Recommendations.
   - One-click export actions:
     - `[Regenerate Report]`
     - `[Export PDF / Print Friendly View]`
     - `[Export GeoJSON Dataset]`
     - `[Export CSV Summary]`

8. **Judge Demo Flow (`11 Steps`)**:
   - Guided interactive modal guiding SIH evaluators through the 11 key evaluation checkpoints in 2–3 minutes.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, enterprise government color palette (slate-900, navy, muted sky/teal accents, subtle emerald indicators)
- **GIS & Mapping**: Leaflet, OpenStreetMap, Esri World Imagery, GeoJSON
- **Icons**: Lucide React
- **Typography**: Inter & JetBrains Mono (Google Fonts)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build
```

Open [http://localhost:5173/](http://localhost:5173/) in your web browser.
