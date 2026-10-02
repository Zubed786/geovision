import { 
  WatershedMeta, 
  FieldImage, 
  Intervention, 
  WaterBody, 
  DrainageFeature, 
  ChangeRecord, 
  LULCClass 
} from '../types';
import { createFieldPhotoSvg, createSatelliteViewSvg } from './imageAssets';

export const SAMPLE_WATERSHED: WatershedMeta = {
  id: 'WS-07',
  name: 'Sample Watershed 07 (Doni Micro-Catchment)',
  code: '4D4A7-07-KAR',
  state: 'Karnataka',
  district: 'Vijayapura (Bijapur)',
  taluk: 'Vijayapura Rural',
  basin: 'Krishna River Basin',
  subBasin: 'Doni River Sub-Basin',
  areaHa: 4820,
  areaSqKm: 48.2,
  perimeterKm: 34.6,
  center: { lat: 16.8302, lng: 75.7104 },
  bounds: [
    [16.7850, 75.6600],
    [16.8750, 75.7600]
  ],
  baselineYear: 2021,
  currentYear: 2025,
  totalFieldImages: 24,
  verifiedImages: 22,
  totalInterventions: 18,
  completedInterventions: 17,
  waterBodiesCount: 8,
  vegetationCoverageBaseline: 28.4,
  vegetationCoverageCurrent: 40.8,
  waterSpreadBaseline: 184.5,
  waterSpreadCurrent: 286.2,
  averageAnnualRainfallMm: 590
};

// Realistic Watershed Boundary GeoJSON coordinates around 16.83, 75.71
export const WATERSHED_BOUNDARY_COORDS: [number, number][] = [
  [16.8700, 75.7050],
  [16.8680, 75.7280],
  [16.8580, 75.7480],
  [16.8420, 75.7590],
  [16.8200, 75.7580],
  [16.7980, 75.7420],
  [16.7860, 75.7250],
  [16.7880, 75.6950],
  [16.8020, 75.6700],
  [16.8220, 75.6620],
  [16.8450, 75.6680],
  [16.8620, 75.6850],
  [16.8700, 75.7050]
];

// Drainage Stream Network
export const DRAINAGE_FEATURES: DrainageFeature[] = [
  {
    id: 'DR-01',
    name: 'Doni North Main Stream (3rd Order)',
    order: 'Primary (3rd Order)',
    lengthKm: 8.4,
    flowDirection: 'North-East to South-West',
    coordinates: [
      [16.8620, 75.7380],
      [16.8510, 75.7240],
      [16.8390, 75.7150],
      [16.8302, 75.7104],
      [16.8180, 75.7010],
      [16.8040, 75.6880],
      [16.7920, 75.6780]
    ]
  },
  {
    id: 'DR-02',
    name: 'Sector B Tributary (2nd Order)',
    order: 'Secondary (2nd Order)',
    lengthKm: 4.2,
    flowDirection: 'East to West',
    coordinates: [
      [16.8480, 75.7520],
      [16.8420, 75.7360],
      [16.8390, 75.7150]
    ]
  },
  {
    id: 'DR-03',
    name: 'Sector C Gully Channel (1st Order)',
    order: 'Tertiary (1st Order)',
    lengthKm: 2.8,
    flowDirection: 'North to South',
    coordinates: [
      [16.8650, 75.7020],
      [16.8520, 75.7060],
      [16.8390, 75.7150]
    ]
  },
  {
    id: 'DR-04',
    name: 'South Ridge Runoff Nullah (2nd Order)',
    order: 'Secondary (2nd Order)',
    lengthKm: 3.6,
    flowDirection: 'South-East to North-West',
    coordinates: [
      [16.8050, 75.7350],
      [16.8120, 75.7180],
      [16.8180, 75.7010]
    ]
  }
];

// Water Bodies
export const WATER_BODIES: WaterBody[] = [
  {
    id: 'WB-01',
    name: 'Doni Village Tank (Percolation Pond 01)',
    type: 'Reservoir / Tank',
    areaHa: 42.5,
    depthMeters: 3.8,
    seasonality: 'Permanent',
    capacityM3: 145000,
    baselineAreaHa: 26.2,
    currentAreaHa: 42.5,
    areaChangePct: 62.2,
    coordinates: [
      [16.8340, 75.7070],
      [16.8360, 75.7120],
      [16.8320, 75.7150],
      [16.8280, 75.7110],
      [16.8300, 75.7060],
      [16.8340, 75.7070]
    ]
  },
  {
    id: 'WB-02',
    name: 'Check Dam 014 Impounded Reservoir',
    type: 'Check Dam Reservoir',
    areaHa: 18.4,
    depthMeters: 2.9,
    seasonality: 'Permanent',
    capacityM3: 52000,
    baselineAreaHa: 8.1,
    currentAreaHa: 18.4,
    areaChangePct: 127.1,
    coordinates: [
      [16.8405, 75.7135],
      [16.8420, 75.7170],
      [16.8385, 75.7185],
      [16.8375, 75.7145],
      [16.8405, 75.7135]
    ]
  },
  {
    id: 'WB-03',
    name: 'Krishi Honda Farm Pond Cluster Alpha',
    type: 'Farm Pond',
    areaHa: 9.6,
    depthMeters: 3.2,
    seasonality: 'Permanent',
    capacityM3: 28000,
    baselineAreaHa: 2.4,
    currentAreaHa: 9.6,
    areaChangePct: 300.0,
    coordinates: [
      [16.8250, 75.7260],
      [16.8280, 75.7290],
      [16.8250, 75.7320],
      [16.8220, 75.7280],
      [16.8250, 75.7260]
    ]
  },
  {
    id: 'WB-04',
    name: 'North Micro-Catchment Storage Tank',
    type: 'Reservoir / Tank',
    areaHa: 24.2,
    depthMeters: 3.1,
    seasonality: 'Seasonal',
    capacityM3: 72000,
    baselineAreaHa: 16.5,
    currentAreaHa: 24.2,
    areaChangePct: 46.6,
    coordinates: [
      [16.8560, 75.7210],
      [16.8590, 75.7260],
      [16.8550, 75.7290],
      [16.8520, 75.7240],
      [16.8560, 75.7210]
    ]
  }
];

// 18 Soil & Moisture Interventions
export const INTERVENTIONS: Intervention[] = [
  {
    id: 'INT-014',
    name: 'Masonry Check Dam 014',
    type: 'Check Dam',
    sector: 'Watershed Sector A (Main Stem)',
    latitude: 16.8392,
    longitude: 75.7154,
    installationDate: '2022-04-14',
    costInr: 485000,
    executingAgency: 'Watershed Development Department (WDD), Govt of Karnataka',
    nearbyWaterFeature: 'Doni North Main Stream (DR-01)',
    vegetationChangePct: 18.6,
    waterChangePct: 24.8,
    sedimentTrappedTons: 420,
    storageCapacityM3: 16500,
    beneficiaryFarmers: 38,
    status: 'Highly Effective',
    verificationStatus: 'Verified',
    beforeImage: createFieldPhotoSvg({
      title: 'Site Baseline (Pre-construction)',
      type: 'check_dam',
      id: 'FG-014-PRE',
      lat: 16.8392,
      lng: 75.7154,
      date: '2021-02-12',
      intervention: 'INT-014',
      isAfter: false
    }),
    afterImage: createFieldPhotoSvg({
      title: 'Active Check Dam Storage & Silt Trap',
      type: 'check_dam',
      id: 'FG-014',
      lat: 16.8392,
      lng: 75.7154,
      date: '2025-01-18',
      intervention: 'INT-014',
      isAfter: true
    }),
    fieldImageId: 'FG-021',
    description: 'Stone masonry weir with concrete spillway and downstream boulder apron across 3rd-order stream bed.',
    hydrologicalImpact: 'Elevated water table in surrounding borewells by 2.8m; enabled two crop cycles (rabi pulses & millet).'
  },
  {
    id: 'INT-022',
    name: 'Community Farm Pond (Krishi Honda 022)',
    type: 'Farm Pond',
    sector: 'Watershed Sector B',
    latitude: 16.8265,
    longitude: 75.7285,
    installationDate: '2022-11-20',
    costInr: 145000,
    executingAgency: 'PMKSY - Watershed Component',
    nearbyWaterFeature: 'Sector B Tributary (DR-02)',
    vegetationChangePct: 22.4,
    waterChangePct: 35.1,
    sedimentTrappedTons: 110,
    storageCapacityM3: 3200,
    beneficiaryFarmers: 12,
    status: 'Highly Effective',
    verificationStatus: 'Verified',
    beforeImage: createFieldPhotoSvg({
      title: 'Dry Agricultural Plot',
      type: 'farm_pond',
      id: 'FG-022-PRE',
      lat: 16.8265,
      lng: 75.7285,
      date: '2021-03-05',
      intervention: 'INT-022',
      isAfter: false
    }),
    afterImage: createFieldPhotoSvg({
      title: 'Lined Farm Pond with Solar Pump',
      type: 'farm_pond',
      id: 'FG-022',
      lat: 16.8265,
      lng: 75.7285,
      date: '2025-01-20',
      intervention: 'INT-022',
      isAfter: true
    }),
    fieldImageId: 'FG-004',
    description: 'Trapezoidal excavated farm pond with HDPE geomembrane lining and earthen safety bund.',
    hydrologicalImpact: 'Provides critical life-saving supplemental irrigation to 16 hectares of horticulture crops during dry spells.'
  },
  {
    id: 'INT-008',
    name: 'Continuous Contour Bunds 008',
    type: 'Contour Bund',
    sector: 'Watershed Sector C (Ridge Area)',
    latitude: 16.8520,
    longitude: 75.7060,
    installationDate: '2021-09-15',
    costInr: 280000,
    executingAgency: 'MGNREGA / State Watershed Cell',
    nearbyWaterFeature: 'Sector C Gully Channel (DR-03)',
    vegetationChangePct: 14.2,
    waterChangePct: 12.0,
    sedimentTrappedTons: 680,
    storageCapacityM3: 8400,
    beneficiaryFarmers: 45,
    status: 'Operational',
    verificationStatus: 'Verified',
    beforeImage: createFieldPhotoSvg({
      title: 'Hillside Slope with Severe Erosion',
      type: 'contour_bund',
      id: 'FG-008-PRE',
      lat: 16.8520,
      lng: 75.7060,
      date: '2021-01-28',
      intervention: 'INT-008',
      isAfter: false
    }),
    afterImage: createFieldPhotoSvg({
      title: 'Stabilized Contours with Vetiver Grass',
      type: 'contour_bund',
      id: 'FG-008',
      lat: 16.8520,
      lng: 75.7060,
      date: '2025-01-22',
      intervention: 'INT-008',
      isAfter: true
    }),
    fieldImageId: 'FG-008',
    description: 'Earthen contour bunds along natural contour lines with vetiver vegetative vegetative hedgerow barriers.',
    hydrologicalImpact: 'Reduced surface runoff velocity by 65%; promoted localized in-situ soil moisture retention.'
  },
  {
    id: 'INT-031',
    name: 'Percolation Tank 031',
    type: 'Percolation Tank',
    sector: 'Watershed Sector A (Valley Floor)',
    latitude: 16.8335,
    longitude: 75.7088,
    installationDate: '2022-06-30',
    costInr: 720000,
    executingAgency: 'NABARD RIDF Scheme',
    nearbyWaterFeature: 'Doni Village Tank (WB-01)',
    vegetationChangePct: 19.5,
    waterChangePct: 28.2,
    sedimentTrappedTons: 850,
    storageCapacityM3: 45000,
    beneficiaryFarmers: 64,
    status: 'Highly Effective',
    verificationStatus: 'Verified',
    beforeImage: createFieldPhotoSvg({
      title: 'Dry Valley Bed with Sparse Grass',
      type: 'percolation_tank',
      id: 'FG-031-PRE',
      lat: 16.8335,
      lng: 75.7088,
      date: '2021-04-10',
      intervention: 'INT-031',
      isAfter: false
    }),
    afterImage: createFieldPhotoSvg({
      title: 'Deep Earthen Tank with Impounded Water',
      type: 'percolation_tank',
      id: 'FG-031',
      lat: 16.8335,
      lng: 75.7088,
      date: '2025-01-25',
      intervention: 'INT-031',
      isAfter: true
    }),
    fieldImageId: 'FG-011',
    description: 'Earthen embankment with cut-off trench (COT) and masonry surplus weir in semi-permeable Deccan basalt formation.',
    hydrologicalImpact: 'Recharged 22 downstream open wells and 14 community borewells across Doni village cluster.'
  },
  {
    id: 'INT-045',
    name: 'Loose Boulder Gully Plug 045',
    type: 'Gully Plug',
    sector: 'Watershed Sector C',
    latitude: 16.8580,
    longitude: 75.6980,
    installationDate: '2023-01-10',
    costInr: 95000,
    executingAgency: 'District Watershed Cell',
    nearbyWaterFeature: 'Gully Channel DR-03',
    vegetationChangePct: 9.8,
    waterChangePct: 6.4,
    sedimentTrappedTons: 290,
    storageCapacityM3: 1200,
    beneficiaryFarmers: 18,
    status: 'Operational',
    verificationStatus: 'Verified',
    beforeImage: createFieldPhotoSvg({
      title: 'Active Gully Headcut with Soil Loss',
      type: 'gully_plug',
      id: 'FG-045-PRE',
      lat: 16.8580,
      lng: 75.6980,
      date: '2021-05-18',
      intervention: 'INT-045',
      isAfter: false
    }),
    afterImage: createFieldPhotoSvg({
      title: 'Dry Stone Boulder Structure with Trapped Soil',
      type: 'gully_plug',
      id: 'FG-045',
      lat: 16.8580,
      lng: 75.6980,
      date: '2025-02-02',
      intervention: 'INT-045',
      isAfter: true
    }),
    fieldImageId: 'FG-015',
    description: 'Dry stone masonry check dam trapping uphill eroded topsoil in steep slope drainage ravine.',
    hydrologicalImpact: 'Arrested gully head advancement and created fertile silt terrace for fodder grass planting.'
  },
  {
    id: 'INT-052',
    name: 'Wire-Caged Gabion Check Structure 052',
    type: 'Gabion Structure',
    sector: 'Watershed Sector D (South Stream)',
    latitude: 16.8140,
    longitude: 75.7120,
    installationDate: '2023-03-22',
    costInr: 210000,
    executingAgency: 'WDD Karnataka',
    nearbyWaterFeature: 'South Ridge Runoff Nullah (DR-04)',
    vegetationChangePct: 15.1,
    waterChangePct: 18.0,
    sedimentTrappedTons: 380,
    storageCapacityM3: 4200,
    beneficiaryFarmers: 26,
    status: 'Operational',
    verificationStatus: 'Verified',
    beforeImage: createFieldPhotoSvg({
      title: 'Eroded Stream Banks and Loose Stones',
      type: 'gabion',
      id: 'FG-052-PRE',
      lat: 16.8140,
      lng: 75.7120,
      date: '2021-06-01',
      intervention: 'INT-052',
      isAfter: false
    }),
    afterImage: createFieldPhotoSvg({
      title: 'Galvanized Gabion Boxes with Silt Accumulation',
      type: 'gabion',
      id: 'FG-052',
      lat: 16.8140,
      lng: 75.7120,
      date: '2025-02-05',
      intervention: 'INT-052',
      isAfter: true
    }),
    fieldImageId: 'FG-019',
    description: 'Heavy zinc-coated wire mesh boxes packed with locally quarried basalt stones across high-velocity torrent stream.',
    hydrologicalImpact: 'Dissipated flash flood peak velocity and facilitated steady moisture seepage into flanking fields.'
  }
];

// 24 Geo-coded Field Photographs (Sample dataset with realistic EXIF and metadata)
export const FIELD_IMAGES: FieldImage[] = [
  {
    id: 'FG-021',
    title: 'Check Dam 014 Upstream Impoundment',
    latitude: 16.8392,
    longitude: 75.7154,
    altitudeMeters: 584.2,
    headingDegrees: 42,
    captureDate: '2025-01-18',
    captureTime: '10:42 AM',
    image: createFieldPhotoSvg({
      title: 'Check Dam 014 Upstream Impoundment',
      type: 'check_dam',
      id: 'FG-021',
      lat: 16.8392,
      lng: 75.7154,
      date: '2025-01-18',
      intervention: 'Check Dam INT-014'
    }),
    thumbnail: createFieldPhotoSvg({
      title: 'Check Dam 014',
      type: 'check_dam',
      id: 'FG-021',
      lat: 16.8392,
      lng: 75.7154,
      date: '2025-01-18',
      intervention: 'INT-014'
    }),
    interventionId: 'INT-014',
    watershedId: 'WS-07',
    watershedName: 'Sample Watershed 07',
    category: 'Check Dam',
    surveyor: {
      name: 'R. K. Patil',
      designation: 'Assistant Technical Officer (GIS)',
      deviceModel: 'Trimble TDC600 Handheld GNSS',
      gpsAccuracyMeters: 1.2
    },
    verificationStatus: 'Verified on Ground',
    notes: 'Structure verified in intact condition. Clear water column retained up to crest level. No structural seepage observed in masonry abutments.',
    nearestWaterBody: 'Check Dam 014 Impounded Reservoir (WB-02)',
    nearestDrainageFeature: 'Doni North Main Stream (DR-01)',
    soilMoistureScore: 'High Moist',
    elevation: 584.2
  },
  {
    id: 'FG-004',
    title: 'Farm Pond 022 Water Storage Verification',
    latitude: 16.8265,
    longitude: 75.7285,
    altitudeMeters: 592.8,
    headingDegrees: 185,
    captureDate: '2025-01-20',
    captureTime: '11:15 AM',
    image: createFieldPhotoSvg({
      title: 'Farm Pond 022 Water Storage',
      type: 'farm_pond',
      id: 'FG-004',
      lat: 16.8265,
      lng: 75.7285,
      date: '2025-01-20',
      intervention: 'Farm Pond INT-022'
    }),
    thumbnail: createFieldPhotoSvg({
      title: 'Farm Pond 022',
      type: 'farm_pond',
      id: 'FG-004',
      lat: 16.8265,
      lng: 75.7285,
      date: '2025-01-20',
      intervention: 'INT-022'
    }),
    interventionId: 'INT-022',
    watershedId: 'WS-07',
    watershedName: 'Sample Watershed 07',
    category: 'Farm Pond',
    surveyor: {
      name: 'Sunita Biradar',
      designation: 'Watershed Development Field Officer',
      deviceModel: 'Samsung Galaxy Tab Active4 Pro',
      gpsAccuracyMeters: 2.1
    },
    verificationStatus: 'Verified on Ground',
    notes: 'Pond holding 85% volumetric capacity. Farmer utilizing water through drip line for pomegranate orchard.',
    nearestWaterBody: 'Krishi Honda Cluster Alpha (WB-03)',
    nearestDrainageFeature: 'Sector B Tributary (DR-02)',
    soilMoistureScore: 'High Moist',
    elevation: 592.8
  },
  {
    id: 'FG-008',
    title: 'Contour Bund 008 Slope Terracing',
    latitude: 16.8520,
    longitude: 75.7060,
    altitudeMeters: 618.4,
    headingDegrees: 270,
    captureDate: '2025-01-22',
    captureTime: '09:30 AM',
    image: createFieldPhotoSvg({
      title: 'Contour Bund 008 Slope Terracing',
      type: 'contour_bund',
      id: 'FG-008',
      lat: 16.8520,
      lng: 75.7060,
      date: '2025-01-22',
      intervention: 'Contour Bund INT-008'
    }),
    thumbnail: createFieldPhotoSvg({
      title: 'Contour Bund 008',
      type: 'contour_bund',
      id: 'FG-008',
      lat: 16.8520,
      lng: 75.7060,
      date: '2025-01-22',
      intervention: 'INT-008'
    }),
    interventionId: 'INT-008',
    watershedId: 'WS-07',
    watershedName: 'Sample Watershed 07',
    category: 'Contour Bund',
    surveyor: {
      name: 'R. K. Patil',
      designation: 'Assistant Technical Officer (GIS)',
      deviceModel: 'Trimble TDC600 Handheld GNSS',
      gpsAccuracyMeters: 1.5
    },
    verificationStatus: 'Verified on Ground',
    notes: 'Vegetative barrier established along bund perimeter. Zero sheet erosion gullies observed on downhill slope.',
    nearestWaterBody: 'North Micro-Catchment Storage Tank (WB-04)',
    nearestDrainageFeature: 'Sector C Gully Channel (DR-03)',
    soilMoistureScore: 'Moderate',
    elevation: 618.4
  },
  {
    id: 'FG-011',
    title: 'Percolation Tank 031 Groundwater Sump',
    latitude: 16.8335,
    longitude: 75.7088,
    altitudeMeters: 578.1,
    headingDegrees: 110,
    captureDate: '2025-01-25',
    captureTime: '02:40 PM',
    image: createFieldPhotoSvg({
      title: 'Percolation Tank 031 Sump',
      type: 'percolation_tank',
      id: 'FG-011',
      lat: 16.8335,
      lng: 75.7088,
      date: '2025-01-25',
      intervention: 'Percolation Tank INT-031'
    }),
    thumbnail: createFieldPhotoSvg({
      title: 'Percolation Tank 031',
      type: 'percolation_tank',
      id: 'FG-011',
      lat: 16.8335,
      lng: 75.7088,
      date: '2025-01-25',
      intervention: 'INT-031'
    }),
    interventionId: 'INT-031',
    watershedId: 'WS-07',
    watershedName: 'Sample Watershed 07',
    category: 'Percolation Tank',
    surveyor: {
      name: 'Sunita Biradar',
      designation: 'Watershed Development Field Officer',
      deviceModel: 'Samsung Galaxy Tab Active4 Pro',
      gpsAccuracyMeters: 1.8
    },
    verificationStatus: 'Verified on Ground',
    notes: 'Standing water spread covering ~38 hectares. Surrounding aquifer recharge logs confirm 3.2m water level jump.',
    nearestWaterBody: 'Doni Village Tank (WB-01)',
    nearestDrainageFeature: 'Doni North Main Stream (DR-01)',
    soilMoistureScore: 'High Moist',
    elevation: 578.1
  },
  {
    id: 'FG-015',
    title: 'Gully Plug 045 Silt Retention Check',
    latitude: 16.8580,
    longitude: 75.6980,
    altitudeMeters: 624.5,
    headingDegrees: 315,
    captureDate: '2025-02-02',
    captureTime: '11:00 AM',
    image: createFieldPhotoSvg({
      title: 'Gully Plug 045 Silt Retention',
      type: 'gully_plug',
      id: 'FG-015',
      lat: 16.8580,
      lng: 75.6980,
      date: '2025-02-02',
      intervention: 'Gully Plug INT-045'
    }),
    thumbnail: createFieldPhotoSvg({
      title: 'Gully Plug 045',
      type: 'gully_plug',
      id: 'FG-015',
      lat: 16.8580,
      lng: 75.6980,
      date: '2025-02-02',
      intervention: 'INT-045'
    }),
    interventionId: 'INT-045',
    watershedId: 'WS-07',
    watershedName: 'Sample Watershed 07',
    category: 'Gully Plug',
    surveyor: {
      name: 'R. K. Patil',
      designation: 'Assistant Technical Officer (GIS)',
      deviceModel: 'Trimble TDC600 Handheld GNSS',
      gpsAccuracyMeters: 1.4
    },
    verificationStatus: 'Verified on Ground',
    notes: 'Retained ~290 tons of fertile silt. Upstream bed slope stabilized at 1:4 grade.',
    nearestWaterBody: 'North Micro-Catchment Storage Tank (WB-04)',
    nearestDrainageFeature: 'Sector C Gully Channel (DR-03)',
    soilMoistureScore: 'Moderate',
    elevation: 624.5
  },
  {
    id: 'FG-019',
    title: 'Gabion Structure 052 Torrent Control',
    latitude: 16.8140,
    longitude: 75.7120,
    altitudeMeters: 588.0,
    headingDegrees: 60,
    captureDate: '2025-02-05',
    captureTime: '03:15 PM',
    image: createFieldPhotoSvg({
      title: 'Gabion Structure 052 Torrent Control',
      type: 'gabion',
      id: 'FG-019',
      lat: 16.8140,
      lng: 75.7120,
      date: '2025-02-05',
      intervention: 'Gabion INT-052'
    }),
    thumbnail: createFieldPhotoSvg({
      title: 'Gabion Structure 052',
      type: 'gabion',
      id: 'FG-019',
      lat: 16.8140,
      lng: 75.7120,
      date: '2025-02-05',
      intervention: 'INT-052'
    }),
    interventionId: 'INT-052',
    watershedId: 'WS-07',
    watershedName: 'Sample Watershed 07',
    category: 'Check Dam',
    surveyor: {
      name: 'Sunita Biradar',
      designation: 'Watershed Development Field Officer',
      deviceModel: 'Samsung Galaxy Tab Active4 Pro',
      gpsAccuracyMeters: 1.9
    },
    verificationStatus: 'Verified on Ground',
    notes: 'Wire cages sound, no corrosion observed. Stream bank erosion arrested on right bank.',
    nearestWaterBody: 'Doni Village Tank (WB-01)',
    nearestDrainageFeature: 'South Ridge Runoff Nullah (DR-04)',
    soilMoistureScore: 'High Moist',
    elevation: 588.0
  }
];

// Detected Positive Change Records (Before vs After)
export const CHANGE_RECORDS: ChangeRecord[] = [
  {
    id: 'CHG-001',
    locationName: 'Check Dam 014 Upstream Riparian Corridor',
    sector: 'Sector A',
    latitude: 16.8392,
    longitude: 75.7154,
    changeType: 'Increased Water Retention',
    beforeValue: '8.1 Ha (Seasonal Silt Bed)',
    afterValue: '18.4 Ha (Permanent Surface Water)',
    changePct: 127.1,
    confidencePct: 96.4,
    linkedInterventionId: 'INT-014',
    linkedInterventionName: 'Check Dam 014',
    spectralIndicator: 'NDWI',
    polygon: [
      [16.8405, 75.7135],
      [16.8420, 75.7170],
      [16.8385, 75.7185],
      [16.8375, 75.7145]
    ]
  },
  {
    id: 'CHG-002',
    locationName: 'Sector B Horticulture Command Zone',
    sector: 'Sector B',
    latitude: 16.8265,
    longitude: 75.7285,
    changeType: 'Cultivated Area Expansion',
    beforeValue: '28.4% (Single Monsoon Crop)',
    afterValue: '48.6% (Double Cropping + Orchard)',
    changePct: 71.1,
    confidencePct: 94.2,
    linkedInterventionId: 'INT-022',
    linkedInterventionName: 'Community Farm Pond 022',
    spectralIndicator: 'NDVI',
    polygon: [
      [16.8290, 75.7250],
      [16.8310, 75.7330],
      [16.8230, 75.7340],
      [16.8220, 75.7260]
    ]
  },
  {
    id: 'CHG-003',
    locationName: 'Sector C Ridge Slope Terracing Area',
    sector: 'Sector C',
    latitude: 16.8520,
    longitude: 75.7060,
    changeType: 'Biomass Regeneration',
    beforeValue: '0.18 Mean NDVI (Degraded Scrub)',
    afterValue: '0.46 Mean NDVI (Grass + Tree Canopy)',
    changePct: 155.5,
    confidencePct: 92.8,
    linkedInterventionId: 'INT-008',
    linkedInterventionName: 'Continuous Contour Bunds 008',
    spectralIndicator: 'NDVI',
    polygon: [
      [16.8550, 75.7020],
      [16.8570, 75.7100],
      [16.8490, 75.7110],
      [16.8480, 75.7030]
    ]
  },
  {
    id: 'CHG-004',
    locationName: 'North Gully Stabilization Reach',
    sector: 'Sector C',
    latitude: 16.8580,
    longitude: 75.6980,
    changeType: 'Gully Stabilization',
    beforeValue: 'Severe Active Erosion Cut (12m width)',
    afterValue: 'Stabilized Silt Terraces with Shrub Cover',
    changePct: 84.0,
    confidencePct: 91.5,
    linkedInterventionId: 'INT-045',
    linkedInterventionName: 'Loose Boulder Gully Plug 045',
    spectralIndicator: 'SAVI',
    polygon: [
      [16.8610, 75.6950],
      [16.8620, 75.7010],
      [16.8550, 75.7010],
      [16.8540, 75.6950]
    ]
  }
];

// Land Use / Land Cover (LULC) Classification Data
export const LULC_CLASSES: LULCClass[] = [
  { name: 'Agriculture (Double Cropped)', color: '#16a34a', areaHa2021: 1120, areaHa2025: 1840, changeHa: 720, changePct: 64.3 },
  { name: 'Agriculture (Single Cropped)', color: '#84cc16', areaHa2021: 1860, areaHa2025: 1350, changeHa: -510, changePct: -27.4 },
  { name: 'Scrubland / Plantation', color: '#059669', areaHa2021: 420, areaHa2025: 780, changeHa: 360, changePct: 85.7 },
  { name: 'Water Bodies & Reservoirs', color: '#0284c7', areaHa2021: 184.5, areaHa2025: 286.2, changeHa: 101.7, changePct: 55.1 },
  { name: 'Barren / Fallow Land', color: '#d97706', areaHa2021: 985.5, areaHa2025: 293.8, changeHa: -691.7, changePct: -70.2 },
  { name: 'Settlement / Built-up', color: '#dc2626', areaHa2021: 250, areaHa2025: 270, changeHa: 20, changePct: 8.0 }
];
