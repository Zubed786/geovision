import React, { createContext, useContext, useState } from 'react';
import { PageTab, FieldImage, Intervention, WatershedMeta } from '../types';
import { SAMPLE_WATERSHED, FIELD_IMAGES, INTERVENTIONS } from '../data/mockData';

export interface LayerVisibility {
  watershedBoundary: boolean;
  drainageNetwork: boolean;
  waterBodies: boolean;
  interventions: boolean;
  fieldImages: boolean;
  satelliteBase: boolean;
  lulcLayer: boolean;
  ndviHeatmap: boolean;
  changeZones: boolean;
}

interface AppContextType {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  watershed: WatershedMeta;
  loadSampleWatershed: () => void;
  selectedFieldImage: FieldImage | null;
  setSelectedFieldImage: (img: FieldImage | null) => void;
  selectedIntervention: Intervention | null;
  setSelectedIntervention: (inv: Intervention | null) => void;
  layers: LayerVisibility;
  toggleLayer: (layerName: keyof LayerVisibility) => void;
  setAllLayers: (layers: Partial<LayerVisibility>) => void;
  mapBase: 'satellite' | 'street' | 'terrain';
  setMapBase: (base: 'satellite' | 'street' | 'terrain') => void;
  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
  mapZoom: number;
  setMapZoom: (zoom: number) => void;
  isJudgeDemoOpen: boolean;
  setIsJudgeDemoOpen: (open: boolean) => void;
  judgeStep: number;
  setJudgeStep: (step: number) => void;
  isSplitScreen: boolean;
  setIsSplitScreen: (split: boolean) => void;
  satelliteYear: 2021 | 2025;
  setSatelliteYear: (year: 2021 | 2025) => void;
  satelliteMode: 'true_color' | 'fcc' | 'ndvi' | 'ndwi';
  setSatelliteMode: (mode: 'true_color' | 'fcc' | 'ndvi' | 'ndwi') => void;
  openFieldImageDetail: (img: FieldImage) => void;
  openInterventionDetail: (inv: Intervention) => void;
}

const defaultLayers: LayerVisibility = {
  watershedBoundary: true,
  drainageNetwork: true,
  waterBodies: true,
  interventions: true,
  fieldImages: true,
  satelliteBase: false,
  lulcLayer: false,
  ndviHeatmap: false,
  changeZones: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<PageTab>('dashboard');
  const [watershed] = useState<WatershedMeta>(SAMPLE_WATERSHED);
  const [selectedFieldImage, setSelectedFieldImage] = useState<FieldImage | null>(FIELD_IMAGES[0]);
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(INTERVENTIONS[0]);
  const [layers, setLayers] = useState<LayerVisibility>(defaultLayers);
  const [mapBase, setMapBase] = useState<'satellite' | 'street' | 'terrain'>('street');
  const [mapCenter, setMapCenter] = useState<[number, number]>([SAMPLE_WATERSHED.center.lat, SAMPLE_WATERSHED.center.lng]);
  const [mapZoom, setMapZoom] = useState<number>(13);
  const [isJudgeDemoOpen, setIsJudgeDemoOpen] = useState<boolean>(false);
  const [judgeStep, setJudgeStep] = useState<number>(1);
  const [isSplitScreen, setIsSplitScreen] = useState<boolean>(false);
  const [satelliteYear, setSatelliteYear] = useState<2021 | 2025>(2025);
  const [satelliteMode, setSatelliteMode] = useState<'true_color' | 'fcc' | 'ndvi' | 'ndwi'>('true_color');

  const toggleLayer = (layerName: keyof LayerVisibility) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const setAllLayers = (newLayers: Partial<LayerVisibility>) => {
    setLayers(prev => ({ ...prev, ...newLayers }));
  };

  const loadSampleWatershed = () => {
    setMapCenter([SAMPLE_WATERSHED.center.lat, SAMPLE_WATERSHED.center.lng]);
    setMapZoom(13);
    setLayers({
      watershedBoundary: true,
      drainageNetwork: true,
      waterBodies: true,
      interventions: true,
      fieldImages: true,
      satelliteBase: false,
      lulcLayer: false,
      ndviHeatmap: false,
      changeZones: true
    });
    setSelectedFieldImage(FIELD_IMAGES[0]);
    setSelectedIntervention(INTERVENTIONS[0]);
  };

  const openFieldImageDetail = (img: FieldImage) => {
    setSelectedFieldImage(img);
    setMapCenter([img.latitude, img.longitude]);
    setMapZoom(15);
    setIsSplitScreen(true);
  };

  const openInterventionDetail = (inv: Intervention) => {
    setSelectedIntervention(inv);
    setMapCenter([inv.latitude, inv.longitude]);
    setMapZoom(15);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        watershed,
        loadSampleWatershed,
        selectedFieldImage,
        setSelectedFieldImage,
        selectedIntervention,
        setSelectedIntervention,
        layers,
        toggleLayer,
        setAllLayers,
        mapBase,
        setMapBase,
        mapCenter,
        setMapCenter,
        mapZoom,
        setMapZoom,
        isJudgeDemoOpen,
        setIsJudgeDemoOpen,
        judgeStep,
        setJudgeStep,
        isSplitScreen,
        setIsSplitScreen,
        satelliteYear,
        setSatelliteYear,
        satelliteMode,
        setSatelliteMode,
        openFieldImageDetail,
        openInterventionDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
