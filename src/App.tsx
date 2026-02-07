import { useState } from 'react';
import { Sidebar, type SectionType } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardSection } from '@/components/sections/DashboardSection';
import { DataEntrySection } from '@/components/sections/DataEntrySection';
import { ReportsSection } from '@/components/sections/ReportsSection';
import { AdministrationsSection } from '@/components/sections/AdministrationsSection';
import { SettingsSection } from '@/components/sections/SettingsSection';
import { cn } from '@/lib/utils';
import './App.css';

const sectionTitles: Record<SectionType, string> = {
  'dashboard': 'لوحة التحكم',
  'data-entry': 'إدخال البيانات',
  'reports': 'التقارير والإحصائيات',
  'administrations': 'الإدارات',
  'settings': 'الإعدادات',
};

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'data-entry':
        return <DataEntrySection />;
      case 'reports':
        return <ReportsSection />;
      case 'administrations':
        return <AdministrationsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className={cn(
        "hidden lg:block transition-all duration-300",
        isSidebarCollapsed ? "w-20" : "w-72"
      )}>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed right-0 top-0 h-full z-50 lg:hidden transition-transform duration-300",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            setIsMobileMenuOpen(false);
          }}
          isCollapsed={false}
          onToggleCollapse={() => {}}
        />
      </div>

      {/* Main Content */}
      <main className={cn(
        "min-h-screen transition-all duration-300",
        "lg:mr-72",
        isSidebarCollapsed && "lg:mr-20"
      )}>
        {/* Top Bar */}
        <TopBar 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          pageTitle={sectionTitles[activeSection]}
        />

        {/* Page Content */}
        <div className="p-6">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;
