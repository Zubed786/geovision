import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MapView } from './components/MapView';
import { DashboardView } from './components/DashboardView';
import { FieldEvidenceView } from './components/FieldEvidenceView';
import { SatelliteAnalysisView } from './components/SatelliteAnalysisView';
import { ChangeAnalysisView } from './components/ChangeAnalysisView';
import { InterventionMonitoringView } from './components/InterventionMonitoringView';
import { ReportGenerationView } from './components/ReportGenerationView';
import { JudgeDemoModal } from './components/JudgeDemoModal';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 select-none">
      {/* Top Enterprise GIS Navbar */}
      <Navbar />

      {/* Dynamic View Router */}
      <div className="flex-1 flex overflow-hidden relative">
        {activeTab === 'dashboard' && <DashboardView />}

        {activeTab === 'map' && (
          <div className="flex-1 flex overflow-hidden w-full h-full">
            <Sidebar />
            <main className="flex-1 relative h-full w-full overflow-hidden">
              <MapView />
            </main>
          </div>
        )}

        {activeTab === 'field-evidence' && <FieldEvidenceView />}

        {activeTab === 'satellite' && <SatelliteAnalysisView />}

        {activeTab === 'change-analysis' && <ChangeAnalysisView />}

        {activeTab === 'interventions' && <InterventionMonitoringView />}

        {activeTab === 'reports' && <ReportGenerationView />}
      </div>

      {/* SIH Judge Demo Evaluation Modal */}
      <JudgeDemoModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
