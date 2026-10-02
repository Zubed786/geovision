import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INTERVENTIONS, SAMPLE_WATERSHED } from '../data/mockData';
import { Intervention } from '../types';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Droplets, 
  TreeDeciduous, 
  Layers, 
  ExternalLink, 
  Search, 
  Filter, 
  CheckCircle2, 
  X,
  Compass,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

export const InterventionMonitoringView: React.FC = () => {
  const { 
    selectedIntervention, 
    setSelectedIntervention, 
    setMapCenter, 
    setMapZoom, 
    setActiveTab, 
    openFieldImageDetail 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeIntervention, setActiveIntervention] = useState<Intervention>(
    selectedIntervention || INTERVENTIONS[0]
  );

  const filteredInterventions = INTERVENTIONS.filter((inv) => {
    const matchesType = selectedType === 'All' || inv.type === selectedType;
    const matchesSearch = 
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.nearbyWaterFeature.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleOpenDetail = (inv: Intervention) => {
    setActiveIntervention(inv);
    setSelectedIntervention(inv);
    setDetailModalOpen(true);
  };

  const handleInspectOnMap = (inv: Intervention) => {
    setSelectedIntervention(inv);
    setMapCenter([inv.latitude, inv.longitude]);
    setMapZoom(16);
    setActiveTab('map');
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] bg-slate-100 overflow-y-auto">
      
      {/* Top Header Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Intervention Monitoring & Outcome Audit</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              18 Soil & Water Structures
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Field-verified soil and moisture conservation (SMC) structures with upstream water ponding and vegetative rejuvenation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">
            Total Capital Outlay: <strong>₹1.93 Crore</strong> (NABARD / PMKSY / MGNREGA)
          </span>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 overflow-x-auto py-0.5">
          <span className="text-slate-500 font-medium">Structure Type:</span>
          {['All', 'Check Dam', 'Farm Pond', 'Contour Bund', 'Percolation Tank', 'Gully Plug', 'Gabion Structure'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                selectedType === type
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search structure ID, name, sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded pl-7 pr-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
          <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400" />
        </div>
      </div>

      {/* MAIN CONTENT: TABLE & CARDS */}
      <div className="p-4 flex-1 space-y-4">
        
        {/* INTERVENTIONS INVENTORY TABLE */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px]">
                  <th className="py-2.5 px-3 font-semibold">Intervention ID</th>
                  <th className="py-2.5 px-3 font-semibold">Type</th>
                  <th className="py-2.5 px-3 font-semibold">Location / Sector</th>
                  <th className="py-2.5 px-3 font-semibold">Installation</th>
                  <th className="py-2.5 px-3 font-semibold">Nearby Water Feature</th>
                  <th className="py-2.5 px-3 font-semibold">Vegetation Gain</th>
                  <th className="py-2.5 px-3 font-semibold">Water Storage</th>
                  <th className="py-2.5 px-3 font-semibold">Operational Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredInterventions.map((inv) => (
                  <tr 
                    key={inv.id}
                    className="hover:bg-amber-50/50 cursor-pointer transition-colors"
                    onClick={() => handleOpenDetail(inv)}
                  >
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                        {inv.id}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-900">{inv.type}</span>
                      <div className="text-[10px] text-slate-400">{inv.name}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-700">{inv.sector}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {inv.latitude.toFixed(4)}°N, {inv.longitude.toFixed(4)}°E
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                      {inv.installationDate}
                    </td>
                    <td className="py-3 px-3 text-sky-800 font-medium text-[11px]">
                      {inv.nearbyWaterFeature}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-emerald-700 flex items-center space-x-0.5">
                        <TreeDeciduous className="w-3 h-3" />
                        <span>+{inv.vegetationChangePct}%</span>
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-sky-700 flex items-center space-x-0.5">
                        <Droplets className="w-3 h-3" />
                        <span>+{inv.waterChangePct}%</span>
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ✓ {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspectOnMap(inv);
                        }}
                        className="px-2 py-1 bg-slate-100 hover:bg-sky-600 hover:text-white rounded text-slate-700 font-medium text-[11px] transition-colors"
                      >
                        Map View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(inv);
                        }}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium text-[11px] transition-colors"
                      >
                        Audit Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SUMMARY CARDS OF SAMPLE INTERVENTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INTERVENTIONS.slice(0, 3).map((inv) => (
            <div 
              key={inv.id}
              onClick={() => handleOpenDetail(inv)}
              className="bg-white rounded-lg border border-slate-200 hover:border-amber-400 p-4 shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-mono font-bold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {inv.id}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {inv.status}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mt-2">{inv.name}</h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {inv.description}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 rounded border border-slate-100">
                    <div className="text-[10px] text-slate-400">Vegetation Growth</div>
                    <div className="text-sm font-bold text-emerald-700">+{inv.vegetationChangePct}%</div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100">
                    <div className="text-[10px] text-slate-400">Water Retention</div>
                    <div className="text-sm font-bold text-sky-700">+{inv.waterChangePct}%</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Capacity: {inv.storageCapacityM3.toLocaleString()} m³</span>
                <span className="text-amber-700 font-semibold flex items-center space-x-1">
                  <span>View Evidence</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DETAIL AUDIT MODAL (Opens when clicking an intervention) */}
      {detailModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  INT
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-white">{activeIntervention.name}</h3>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-600">
                      {activeIntervention.id}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {activeIntervention.sector} &bull; Coordinates: {activeIntervention.latitude.toFixed(5)}°N, {activeIntervention.longitude.toFixed(5)}°E
                  </div>
                </div>
              </div>

              <button
                onClick={() => setDetailModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 text-xs text-slate-800">
              
              {/* Before vs After Photographs */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  Ground Photo Evidence: Baseline vs Post-Intervention
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-900">
                    <div className="bg-slate-950 px-3 py-1.5 text-[11px] font-mono font-bold text-amber-400 flex justify-between">
                      <span>BEFORE INTERVENTION (2021)</span>
                      <span>PRE-CONSTRUCTION</span>
                    </div>
                    <img src={activeIntervention.beforeImage} alt="Before intervention" className="w-full h-48 object-cover" />
                  </div>

                  <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-900">
                    <div className="bg-slate-950 px-3 py-1.5 text-[11px] font-mono font-bold text-emerald-400 flex justify-between">
                      <span>ACTIVE POST-INTERVENTION (2025)</span>
                      <span>FIELD VERIFIED</span>
                    </div>
                    <img src={activeIntervention.afterImage} alt="After intervention" className="w-full h-48 object-cover" />
                  </div>
                </div>
              </div>

              {/* Quantitative Outcome Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-[10px] text-emerald-800 uppercase font-semibold">Vegetation Gain</div>
                  <div className="text-xl font-bold text-emerald-900 mt-1">+{activeIntervention.vegetationChangePct}%</div>
                  <div className="text-[10px] text-emerald-700">Mean NDVI jump in 250m buffer</div>
                </div>

                <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
                  <div className="text-[10px] text-sky-800 uppercase font-semibold">Water Impoundment</div>
                  <div className="text-xl font-bold text-sky-900 mt-1">+{activeIntervention.waterChangePct}%</div>
                  <div className="text-[10px] text-sky-700">Surface spread retention</div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-[10px] text-amber-800 uppercase font-semibold">Sediment Trapped</div>
                  <div className="text-xl font-bold text-amber-900 mt-1">{activeIntervention.sedimentTrappedTons} Tons</div>
                  <div className="text-[10px] text-amber-700">Silt deposition arrested</div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-[10px] text-purple-800 uppercase font-semibold">Beneficiary Farmers</div>
                  <div className="text-xl font-bold text-purple-900 mt-1">{activeIntervention.beneficiaryFarmers} Households</div>
                  <div className="text-[10px] text-purple-700">Downstream borewell command</div>
                </div>
              </div>

              {/* Technical Description & Hydrological Impact */}
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5">Structural Specifications:</div>
                  <p className="text-slate-700 leading-relaxed">{activeIntervention.description}</p>
                </div>

                <div className="p-3 bg-sky-50/70 rounded-lg border border-sky-200">
                  <div className="font-bold text-sky-950 mb-0.5">Hydrological Outcome on Watershed WS-07:</div>
                  <p className="text-slate-800 leading-relaxed">{activeIntervention.hydrologicalImpact}</p>
                </div>
              </div>

              {/* Administrative Details */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Sanctioned Cost:</span>
                  <span className="font-semibold text-slate-800 font-mono">₹{activeIntervention.costInr.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Installation Date:</span>
                  <span className="font-semibold text-slate-800 font-mono">{activeIntervention.installationDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Executing Agency:</span>
                  <span className="font-semibold text-slate-800 truncate block">{activeIntervention.executingAgency}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Verification Audit:</span>
                  <span className="font-semibold text-emerald-700">✓ Ground & Sat Verified</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Sample Watershed 07 &bull; Doni Basin (Karnataka)
              </span>

              <div className="flex space-x-2">
                <button
                  onClick={() => setDetailModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-white hover:bg-slate-200 text-slate-700 font-medium text-xs border border-slate-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setDetailModalOpen(false);
                    handleInspectOnMap(activeIntervention);
                  }}
                  className="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
                >
                  <span>Locate on Interactive Map</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
