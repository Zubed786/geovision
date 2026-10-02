export type PageTab = 
  | 'dashboard'
  | 'map'
  | 'field-evidence'
  | 'satellite'
  | 'change-analysis'
  | 'interventions'
  | 'reports';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface WatershedMeta {
  id: string;
  name: string;
  code: string;
  state: string;
  district: string;
  taluk: string;
  basin: string;
  subBasin: string;
  areaHa: number;
  areaSqKm: number;
  perimeterKm: number;
  center: LatLng;
  bounds: [[number, number], [number, number]];
  baselineYear: number;
  currentYear: number;
  totalFieldImages: number;
  verifiedImages: number;
  totalInterventions: number;
  completedInterventions: number;
  waterBodiesCount: number;
  vegetationCoverageBaseline: number; // percentage
  vegetationCoverageCurrent: number; // percentage
  waterSpreadBaseline: number; // hectares
  waterSpreadCurrent: number; // hectares
  averageAnnualRainfallMm: number;
}

export interface FieldImage {
  id: string; // e.g. "FG-021"
  title: string;
  latitude: number;
  longitude: number;
  altitudeMeters: number;
  headingDegrees: number; // Camera azimuth
  captureDate: string; // "2025-01-18"
  captureTime: string; // "10:42 AM"
  image: string; // SVG or data URL
  thumbnail: string;
  interventionId?: string;
  watershedId: string;
  watershedName: string;
  category: 'Check Dam' | 'Farm Pond' | 'Contour Bund' | 'Percolation Tank' | 'Gully Plug' | 'Afforestation' | 'Stream Bank';
  surveyor: {
    name: string;
    designation: string;
    deviceModel: string;
    gpsAccuracyMeters: number;
  };
  verificationStatus: 'Verified on Ground' | 'Pending Audit' | 'Geospatial Aligned';
  notes: string;
  nearestWaterBody: string;
  nearestDrainageFeature: string;
  soilMoistureScore: 'Dry' | 'Moderate' | 'High Moist';
  elevation: number;
}

export interface Intervention {
  id: string; // e.g. "INT-014"
  name: string;
  type: 'Check Dam' | 'Farm Pond' | 'Contour Bund' | 'Percolation Tank' | 'Gully Plug' | 'Gabion Structure';
  sector: string;
  latitude: number;
  longitude: number;
  installationDate: string;
  costInr: number;
  executingAgency: string;
  nearbyWaterFeature: string;
  vegetationChangePct: number; // e.g. +8.2
  waterChangePct: number; // e.g. +11.4
  sedimentTrappedTons: number;
  storageCapacityM3: number;
  beneficiaryFarmers: number;
  status: 'Highly Effective' | 'Operational' | 'Maintenance Required';
  verificationStatus: 'Verified' | 'Audited';
  beforeImage: string;
  afterImage: string;
  fieldImageId: string;
  description: string;
  hydrologicalImpact: string;
}

export interface WaterBody {
  id: string;
  name: string;
  type: 'Reservoir / Tank' | 'Farm Pond' | 'Percolation Pond' | 'Check Dam Reservoir';
  areaHa: number;
  depthMeters: number;
  seasonality: 'Permanent' | 'Seasonal';
  capacityM3: number;
  baselineAreaHa: number;
  currentAreaHa: number;
  areaChangePct: number;
  coordinates: [number, number][]; // Polygon coordinates [lat, lng]
}

export interface DrainageFeature {
  id: string;
  name: string;
  order: 'Primary (3rd Order)' | 'Secondary (2nd Order)' | 'Tertiary (1st Order)';
  lengthKm: number;
  flowDirection: string;
  coordinates: [number, number][]; // Polyline coordinates [lat, lng]
}

export interface ChangeRecord {
  id: string;
  locationName: string;
  sector: string;
  latitude: number;
  longitude: number;
  changeType: 'Increased Water Retention' | 'Biomass Regeneration' | 'Gully Stabilization' | 'Cultivated Area Expansion' | 'Runoff Mitigation';
  beforeValue: string;
  afterValue: string;
  changePct: number;
  confidencePct: number;
  linkedInterventionId: string;
  linkedInterventionName: string;
  spectralIndicator: 'NDVI' | 'NDWI' | 'SAVI' | 'MNDWI';
  polygon: [number, number][];
}

export interface LULCClass {
  name: string;
  color: string;
  areaHa2021: number;
  areaHa2025: number;
  changeHa: number;
  changePct: number;
}
