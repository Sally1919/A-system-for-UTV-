import React, { useState } from 'react';
import { Layout } from './components/Layout.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { ContentManager } from './pages/ContentManager.tsx';
import { ScheduleManager } from './pages/ScheduleManager.tsx';
import { AnalyticsHub, StaffRevenue, NewsTech } from './pages/Modules.tsx';
import { DigitalPlatforms, TrainingPortal } from './pages/Extras.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'content':
        return <ContentManager />;
      case 'schedule':
        return <ScheduleManager />;
      case 'analytics':
        return <AnalyticsHub />;
      case 'staff':
      case 'revenue':
        return <StaffRevenue />; // Combined for demonstration
      case 'news':
      case 'technical':
        return <NewsTech />; // Combined for demonstration
      case 'digital':
        return <DigitalPlatforms />;
      case 'training':
        return <TrainingPortal />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-500 flex-col">
            <div className="w-16 h-16 border-4 border-slate-700 border-t-orange-500 rounded-full animate-spin mb-4"></div>
            <p>Module under development...</p>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;