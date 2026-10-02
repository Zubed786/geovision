import React, { useState } from 'react';
import { 
  SAMPLE_WATERSHED, 
  FIELD_IMAGES, 
  INTERVENTIONS, 
  CHANGE_RECORDS, 
  LULC_CLASSES,
  WATERSHED_BOUNDARY_COORDS,
  DRAINAGE_FEATURES,
  WATER_BODIES
} from '../data/mockData';
import { 
  FileText, 
  Download, 
  Printer, 
  FileJson, 
  FileSpreadsheet, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  TreeDeciduous, 
  Droplets,
  ExternalLink
} from 'lucide-react';

export const ReportGenerationView: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);
  const [reportDate] = useState('October 2026');
  const [reportReference] = useState('WDD-KA-2026-WS07-EVAL');

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 800);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportGeoJSON = () => {
    const geojsonData = {
      type: "FeatureCollection",
      properties: {
        watershedId: SAMPLE_WATERSHED.id,
        watershedName: SAMPLE_WATERSHED.name,
        state: SAMPLE_WATERSHED.state,
        district: SAMPLE_WATERSHED.district,
        areaHa: SAMPLE_WATERSHED.areaHa,
        evaluationYear: 2025
      },
      features: [
        {
          type: "Feature",
          properties: { name: "Watershed Boundary", type: "boundary" },
          geometry: {
            type: "Polygon",
            coordinates: [WATERSHED_BOUNDARY_COORDS.map(([lat, lng]) => [lng, lat])]
          }
        },
        ...INTERVENTIONS.map((inv) => ({
          type: "Feature",
          properties: {
            id: inv.id,
            name: inv.name,
            type: inv.type,
            vegetationChangePct: inv.vegetationChangePct,
            waterChangePct: inv.waterChangePct,
            status: inv.status
          },
          geometry: {
            type: "Point",
            coordinates: [inv.longitude, inv.latitude]
          }
        })),
        ...FIELD_IMAGES.map((img) => ({
          type: "Feature",
          properties: {
            id: img.id,
            title: img.title,
            captureDate: img.captureDate,
            verificationStatus: img.verificationStatus,
            interventionId: img.interventionId
          },
          geometry: {
            type: "Point",
            coordinates: [img.longitude, img.latitude]
          }
        }))
      ]
    };

    const blob = new Blob([JSON.stringify(geojsonData, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Watershed_GeoVision_${SAMPLE_WATERSHED.id}_Dataset.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    let csv = "Intervention ID,Type,Sector,Latitude,Longitude,Installation Date,Vegetation Change (%),Water Change (%),Sediment Trapped (Tons),Beneficiary Farmers,Status\n";
    INTERVENTIONS.forEach((inv) => {
      csv += `"${inv.id}","${inv.type}","${inv.sector}",${inv.latitude},${inv.longitude},"${inv.installationDate}",${inv.vegetationChangePct},${inv.waterChangePct},${inv.sedimentTrappedTons},${inv.beneficiaryFarmers},"${inv.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Watershed_${SAMPLE_WATERSHED.id}_Interventions_Outcome.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] bg-slate-100 overflow-y-auto">
      
      {/* Top Header & Export Action Bar (Hidden during print) */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs print:hidden sticky top-0 z-30">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <FileText className="w-5 h-5 text-sky-600" />
              <span>Watershed Development Assessment Report Generator</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
              Official Evaluation Format
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Synthesized geospatial report combining field geotagged evidence, remote sensing indicators, and outcome metrics.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isGenerating ? 'Synthesizing...' : 'Regenerate Report'}</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span>Export PDF / Print</span>
          </button>

          <button
            onClick={handleExportGeoJSON}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs transition-colors shadow-xs"
          >
            <FileJson className="w-3.5 h-3.5 text-amber-600" />
            <span>Export GeoJSON</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs transition-colors shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW CONTAINER */}
      <div className="p-4 sm:p-8 flex justify-center">
        <article className="max-w-4xl w-full bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-10 space-y-8 text-slate-800 print:shadow-none print:border-none print:p-0">
          
          {/* Official Document Letterhead */}
          <div className="border-b-2 border-slate-900 pb-5">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 font-mono">
                  GOVERNMENT OF KARNATAKA &bull; WATERSHED DEVELOPMENT DEPARTMENT
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 mt-1 uppercase">
                  Watershed Development Outcome Assessment Report
                </h1>
                <div className="text-xs text-sky-800 font-semibold mt-0.5">
                  Evaluation of Soil & Water Conservation Interventions via Geospatial & Geo-coded Image Techniques
                </div>
              </div>

              {/* Emblem / Badge */}
              <div className="text-right text-xs font-mono text-slate-500">
                <div className="font-bold text-slate-900">{reportReference}</div>
                <div>Date: {reportDate}</div>
                <div className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded">
                  DEMO DATASET EVALUATION
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 1: STUDY AREA */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-4 border-sky-600 pl-2">
              1. Study Area Profile
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">State / District</span>
                <span className="font-semibold text-slate-900">{SAMPLE_WATERSHED.state}, {SAMPLE_WATERSHED.district}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Watershed Name & Code</span>
                <span className="font-semibold text-slate-900">{SAMPLE_WATERSHED.name} ({SAMPLE_WATERSHED.code})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Catchment Area</span>
                <span className="font-bold text-sky-900">{SAMPLE_WATERSHED.areaHa.toLocaleString()} Ha ({SAMPLE_WATERSHED.areaSqKm} km²)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Basin / Sub-Basin</span>
                <span className="font-semibold text-slate-900">{SAMPLE_WATERSHED.basin} ({SAMPLE_WATERSHED.subBasin})</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sample Watershed 07 comprises semi-arid Deccan Trap basaltic plateau terrain characterized by recurrent seasonal drought, high surface runoff, and topsoil gully erosion. Soil and moisture conservation interventions were implemented across micro-catchments A, B, C, and D to enhance groundwater recharge and biomass productivity.
            </p>
          </section>

          {/* SECTION 2: DATA USED */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-4 border-sky-600 pl-2">
              2. Data Sources & Spatial Methodology
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded">
                <thead className="bg-slate-50 text-slate-600 text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Data Layer</th>
                    <th className="py-2 px-3">Platform / Sensor</th>
                    <th className="py-2 px-3">Spatial / Temporal Scale</th>
                    <th className="py-2 px-3">Verification Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Geo-coded Field Photographs</td>
                    <td className="py-2 px-3">Bhuvan-GNSS Handheld Receiver</td>
                    <td className="py-2 px-3 font-mono">±1.2m Accuracy &bull; 24 Observations</td>
                    <td className="py-2 px-3 text-emerald-700 font-semibold">Field Surveyor Signature</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Multi-Spectral Satellite Imagery</td>
                    <td className="py-2 px-3">Sentinel-2B MSI (ESA)</td>
                    <td className="py-2 px-3 font-mono">10m / 30m GSD &bull; 2021 vs 2025</td>
                    <td className="py-2 px-3 text-emerald-700 font-semibold">Ortho-rectified BOA</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Watershed GIS Boundaries</td>
                    <td className="py-2 px-3">Survey of India Topo / PostGIS</td>
                    <td className="py-2 px-3 font-mono">1:25,000 Scale Vector</td>
                    <td className="py-2 px-3 text-emerald-700 font-semibold">Ridge-to-Valley Boundary</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 3: FIELD EVIDENCE SUMMARY */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-4 border-sky-600 pl-2">
              3. Field Evidence Geotagging Summary
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Total Field Photos</div>
                <div className="text-xl font-bold text-slate-900">{FIELD_IMAGES.length} Images</div>
                <div className="text-[10px] text-emerald-700 font-semibold">22 Verified on Ground</div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Check Dam Points</div>
                <div className="text-xl font-bold text-slate-900">6 Locations</div>
                <div className="text-[10px] text-sky-700">100% Structural Integrity</div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Farm Pond Coordinates</div>
                <div className="text-xl font-bold text-slate-900">8 Locations</div>
                <div className="text-[10px] text-sky-700">Avg 85% water volume</div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Contour & Gully Points</div>
                <div className="text-xl font-bold text-slate-900">10 Locations</div>
                <div className="text-[10px] text-emerald-700">Erosion stabilized</div>
              </div>
            </div>
          </section>

          {/* SECTION 4: SATELLITE & THEMATIC MAP OUTCOMES */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-4 border-sky-600 pl-2">
              4. Satellite Remote Sensing & Thematic Shift
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded">
                <thead className="bg-slate-50 text-slate-600 text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Land Cover Classification</th>
                    <th className="py-2 px-3">Baseline 2021 (Ha)</th>
                    <th className="py-2 px-3">Outcome 2025 (Ha)</th>
                    <th className="py-2 px-3">Net Area Shift</th>
                    <th className="py-2 px-3">Outcome Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {LULC_CLASSES.map((c) => (
                    <tr key={c.name}>
                      <td className="py-2 px-3 font-semibold text-slate-900">{c.name}</td>
                      <td className="py-2 px-3">{c.areaHa2021}</td>
                      <td className="py-2 px-3 font-bold text-slate-950">{c.areaHa2025}</td>
                      <td className={`py-2 px-3 font-semibold ${c.changeHa >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {c.changeHa >= 0 ? `+${c.changeHa}` : c.changeHa} Ha ({c.changePct >= 0 ? `+${c.changePct}` : c.changePct}%)
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          c.changeHa >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {c.changeHa >= 0 ? 'Expansion / Rejuvenation' : 'Fallow Land Reduction'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 5: CHANGE DETECTION & INTERVENTION AUDIT */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-4 border-sky-600 pl-2">
              5. Temporal Change Detection & Intervention Impact
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-sky-50/70 p-3.5 rounded-lg border border-sky-200">
              <div>
                <span className="text-slate-500 block text-[10px]">Vegetation Growth</span>
                <span className="text-xl font-bold text-emerald-800">+12.4%</span>
                <span className="text-[10px] text-slate-500 block">+598 Ha Crop Biomass</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Water Spread Spread</span>
                <span className="text-xl font-bold text-sky-800">+8.7%</span>
                <span className="text-[10px] text-slate-500 block">+101.7 Ha Water Impounded</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Built-up Change</span>
                <span className="text-xl font-bold text-slate-800">+2.1%</span>
                <span className="text-[10px] text-slate-500 block">Farmsteads / Storage</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Intervention Coverage</span>
                <span className="text-xl font-bold text-amber-800">+14.8%</span>
                <span className="text-[10px] text-slate-500 block">18 Structures Operational</span>
              </div>
            </div>
          </section>

          {/* SECTION 6: EVIDENCE GALLERY SAMPLES */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-4 border-sky-600 pl-2">
              6. Geo-Coded Field Evidence Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FIELD_IMAGES.slice(0, 3).map((img) => (
                <div key={img.id} className="rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                  <div className="aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img src={img.thumbnail} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2.5 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">{img.id}</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">✓ Verified</span>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate">{img.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {img.latitude.toFixed(4)}°N, {img.longitude.toFixed(4)}°E
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7: CONCLUSION & RECOMMENDATIONS */}
          <section className="space-y-3 pt-2 border-t border-slate-200 text-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-4 border-sky-600 pl-2">
              7. Key Observations & Recommendations
            </h2>
            <div className="space-y-2 text-slate-700 leading-relaxed">
              <p>
                <strong>1. Hydrological Efficacy:</strong> The construction of Check Dam 014 (INT-014) along the 3rd-order stream and Percolation Tank 031 has effectively impounded 68,500 m³ of monsoon runoff, arresting sediment loss by an estimated 1,270 tons.
              </p>
              <p>
                <strong>2. Cropping Pattern Transformation:</strong> Cultivated agricultural land under double-cropping expanded from 1,120 Ha to 1,840 Ha (+64.3%), while barren fallow land decreased by 70.2%, confirming high return on public investment.
              </p>
              <p>
                <strong>3. Ground-Truth Geospatial Traceability:</strong> Every rupee of watershed investment is linked directly to a verifiable geo-coded photograph with GNSS metadata, azimuth bearing, and corresponding Sentinel-2 multi-spectral NDVI gain.
              </p>
            </div>

            {/* Official Signoff Box */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-xs text-slate-600">
              <div>
                <div className="font-mono text-slate-400 mb-6">[DIGITALLY SIGNED]</div>
                <div className="font-bold text-slate-900">Dr. M. S. Rao</div>
                <div className="text-[11px]">Technical Director (WDD)</div>
              </div>
              <div>
                <div className="font-mono text-slate-400 mb-6">[VERIFIED ON GROUND]</div>
                <div className="font-bold text-slate-900">R. K. Patil</div>
                <div className="text-[11px]">Assistant Technical Officer (GIS)</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="font-mono text-slate-400 mb-6">[SYSTEM AUDITED]</div>
                <div className="font-bold text-slate-900">Watershed GeoVision</div>
                <div className="text-[11px]">SIH 2026 Evaluation Suite</div>
              </div>
            </div>
          </section>

        </article>
      </div>

    </div>
  );
};
