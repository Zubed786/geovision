import React from 'react';
import { useApp } from '../context/AppContext';
import { FIELD_IMAGES, INTERVENTIONS } from '../data/mockData';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Play, 
  X,
  Compass,
  Camera,
  Layers,
  Satellite,
  GitCompare,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface StepDetail {
  step: number;
  title: string;
  subheading: string;
  description: string;
  actionText: string;
  badge: string;
  execute: () => void;
}

export const JudgeDemoModal: React.FC = () => {
  const { 
    isJudgeDemoOpen, 
    setIsJudgeDemoOpen, 
    judgeStep, 
    setJudgeStep,
    setActiveTab,
    loadSampleWatershed,
    setAllLayers,
    openFieldImageDetail,
    openInterventionDetail,
    setIsSplitScreen,
    setSatelliteMode,
    setSatelliteYear
  } = useApp();

  if (!isJudgeDemoOpen) return null;

  const steps: StepDetail[] = [
    {
      step: 1,
      title: "Step 1: Open the Sample Watershed",
      subheading: "Initialize Watershed WS-07 (Vijayapura, Karnataka)",
      description: "Load the baseline study area: 4,820 Hectares in Doni River Sub-Basin with 18 soil-moisture interventions, 24 field observations, and micro-catchment boundary.",
      badge: "Study Area",
      actionText: "Load Watershed & Extent",
      execute: () => {
        loadSampleWatershed();
        setActiveTab('dashboard');
      }
    },
    {
      step: 2,
      title: "Step 2: Show GIS Map with Boundary & Field Markers",
      subheading: "Interactive GIS Cartographic View",
      description: "Display the vector watershed boundary polygon, 3rd-order drainage streams, water storage tanks, and geo-coded field photography markers.",
      badge: "GIS Mapping",
      actionText: "Open GIS Map Canvas",
      execute: () => {
        setActiveTab('map');
        setAllLayers({
          watershedBoundary: true,
          drainageNetwork: true,
          waterBodies: true,
          interventions: true,
          fieldImages: true,
          satelliteBase: false
        });
      }
    },
    {
      step: 3,
      title: "Step 3: Click a Geo-Coded Field Photograph",
      subheading: "Ground-Truth Geo-tagging Marker",
      description: "Select field observation FG-021 (Check Dam 014 Upstream Impoundment) captured with Bhuvan-GNSS receiver at 16.8392°N, 75.7154°E.",
      badge: "Field Geotagging",
      actionText: "Select Field Photo FG-021",
      execute: () => {
        setActiveTab('map');
        const img = FIELD_IMAGES.find(i => i.id === 'FG-021') || FIELD_IMAGES[0];
        openFieldImageDetail(img);
      }
    },
    {
      step: 4,
      title: "Step 4: Split-Screen Field Photo + Satellite Context",
      subheading: "Simultaneous Ground & Space Alignment",
      description: "Activate Split-Screen mode. Left: High-resolution field photo with camera viewfinder, EXIF, azimuth, and notes. Right: Synchronized satellite GIS context.",
      badge: "Spatial Alignment",
      actionText: "Activate Split-Screen Workstation",
      execute: () => {
        const img = FIELD_IMAGES.find(i => i.id === 'FG-021') || FIELD_IMAGES[0];
        openFieldImageDetail(img);
        setIsSplitScreen(true);
        setActiveTab('field-evidence');
      }
    },
    {
      step: 5,
      title: "Step 5: Enable Satellite + Watershed Layers",
      subheading: "Multi-Spectral Sentinel-2 Imagery",
      description: "Overlay 10m/30m ortho-rectified satellite raster tiles on top of the watershed drainage lines to verify landscape canopy health.",
      badge: "Remote Sensing",
      actionText: "Overlay Satellite Imagery",
      execute: () => {
        setActiveTab('satellite');
        setAllLayers({ satelliteBase: true });
        setSatelliteMode('true_color');
      }
    },
    {
      step: 6,
      title: "Step 6: Open Thematic Analysis",
      subheading: "LULC Land Classification & Spectral Indices",
      description: "Switch to False Color Composite (NIR-R-G) and Land Use/Land Cover shift. Observe bright crimson infrared reflectance for vigorous crops.",
      badge: "Thematic Mapping",
      actionText: "Inspect False Color Composite",
      execute: () => {
        setActiveTab('satellite');
        setSatelliteMode('fcc');
      }
    },
    {
      step: 7,
      title: "Step 7: Select Vegetation (NDVI) or Water (NDWI) Layer",
      subheading: "Biomass & Water Retention Quantification",
      description: "Calculate NDVI and NDWI indices. Click on the raster canvas to inspect the multi-spectral reflectance signature and calculated index scores.",
      badge: "Spectral Indices",
      actionText: "Analyze NDVI & Pixel Profile",
      execute: () => {
        setActiveTab('satellite');
        setSatelliteMode('ndvi');
      }
    },
    {
      step: 8,
      title: "Step 8: Open 'Before vs After' Change Analysis",
      subheading: "Temporal Baseline (2021) vs Outcome (2025)",
      description: "Access the synchronized change analysis workstation with dual-epoch comparisons across 4 years of soil-moisture treatment.",
      badge: "Temporal Analysis",
      actionText: "Open Before vs After Workspace",
      execute: () => {
        setActiveTab('change-analysis');
      }
    },
    {
      step: 9,
      title: "Step 9: Show Detected Changes & Swipe Slider",
      subheading: "Quantified Development Outcomes",
      description: "Interact with the swipe slider. Review the summary metrics: +12.4% Vegetation, +8.7% Water Surface, +14.8% Intervention Coverage with verified change polygons.",
      badge: "Change Detection",
      actionText: "Inspect Detected Changes Table",
      execute: () => {
        setActiveTab('change-analysis');
      }
    },
    {
      step: 10,
      title: "Step 10: Open an Intervention & Demonstrate Evidence",
      subheading: "Masonry Check Dam 014 Audit Dossier",
      description: "Inspect Check Dam INT-014: Pre-construction vs active photographs, upstream storage capacity (16,500 m³), and 38 beneficiary farming households.",
      badge: "Intervention Audit",
      actionText: "Inspect Check Dam INT-014",
      execute: () => {
        const inv = INTERVENTIONS.find(i => i.id === 'INT-014') || INTERVENTIONS[0];
        openInterventionDetail(inv);
        setActiveTab('interventions');
      }
    },
    {
      step: 11,
      title: "Step 11: Generate Watershed Assessment Report",
      subheading: "Official Comprehensive Assessment Document",
      description: "Generate the complete watershed development report with executive summary, GIS statistics, field evidence gallery, and printable/exportable GeoJSON & CSV formats.",
      badge: "Evidence Report",
      actionText: "Synthesize Assessment Report",
      execute: () => {
        setActiveTab('reports');
      }
    }
  ];

  const currentStep = steps[judgeStep - 1];

  const handleNext = () => {
    if (judgeStep < steps.length) {
      const nextStep = judgeStep + 1;
      setJudgeStep(nextStep);
      steps[nextStep - 1].execute();
    } else {
      setIsJudgeDemoOpen(false);
    }
  };

  const handlePrev = () => {
    if (judgeStep > 1) {
      const prevStep = judgeStep - 1;
      setJudgeStep(prevStep);
      steps[prevStep - 1].execute();
    }
  };

  const handleExecuteCurrent = () => {
    currentStep.execute();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm text-white">SIH 2026 Judge Evaluation Flow</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800">
                  Step {judgeStep} of 11
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                End-to-End Problem Statement 26015 Solution Demonstration
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsJudgeDemoOpen(false)}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-1 overflow-x-auto">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => {
                setJudgeStep(s.step);
                s.execute();
              }}
              title={s.title}
              className={`h-2 rounded-full transition-all flex-1 min-w-[24px] ${
                s.step === judgeStep
                  ? 'bg-sky-400 ring-2 ring-sky-300 ring-opacity-50'
                  : s.step < judgeStep
                  ? 'bg-emerald-500'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Modal Main Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
              {currentStep.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Workflow Stage {judgeStep}/11
            </span>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              {currentStep.title}
            </h4>
            <div className="text-sm font-semibold text-sky-400 mt-0.5">
              {currentStep.subheading}
            </div>
          </div>

          <div className="p-3.5 bg-slate-800/90 rounded-lg border border-slate-700/80 text-xs text-slate-300 leading-relaxed">
            {currentStep.description}
          </div>

          {/* Core Technical Chain Reminder */}
          <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
            <span className="text-emerald-400 font-bold">Scientific Chain:</span>
            <span className="truncate">Geo-code photo &rarr; GIS Alignment &rarr; Satellite Indices &rarr; Change &rarr; Report</span>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={judgeStep === 1}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-semibold border ${
              judgeStep === 1 
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600' 
                : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExecuteCurrent}
              className="px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{currentStep.actionText}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-1 px-4 py-1.5 rounded bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md"
            >
              <span>{judgeStep === 11 ? 'Finish Demo' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
