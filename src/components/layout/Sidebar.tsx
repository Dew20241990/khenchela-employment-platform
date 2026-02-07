import { useState } from 'react';
import { 
  LayoutDashboard, 
  FilePlus, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Building2,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type SectionType = 'dashboard' | 'data-entry' | 'reports' | 'administrations' | 'settings';

interface SidebarProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: SectionType;
  label: string;
  icon: React.ElementType;
  badge?: number;
  subItems?: { id: string; label: string }[];
}

const navItems: NavItem[] = [
  { 
    id: 'dashboard', 
    label: 'لوحة التحكم', 
    icon: LayoutDashboard 
  },
  { 
    id: 'data-entry', 
    label: 'إدخال البيانات', 
    icon: FilePlus,
    subItems: [
      { id: 'new-entry', label: 'تسجيل جديد' },
      { id: 'bulk-entry', label: 'تسجيل جماعي' },
      { id: 'import', label: 'استيراد من Excel' },
    ]
  },
  { 
    id: 'reports', 
    label: 'التقارير والإحصائيات', 
    icon: BarChart3,
    subItems: [
      { id: 'monthly-report', label: 'التقرير الشهري' },
      { id: 'annual-report', label: 'التقرير السنوي' },
      { id: 'by-sector', label: 'حسب القطاع' },
      { id: 'by-type', label: 'حسب نوع الإدارة' },
    ]
  },
  { 
    id: 'administrations', 
    label: 'الإدارات', 
    icon: Building2,
    badge: 24,
    subItems: [
      { id: 'admin-list', label: 'قائمة الإدارات' },
      { id: 'admin-types', label: 'أنواع الإدارات' },
      { id: 'sectors', label: 'القطاعات' },
    ]
  },
  { 
    id: 'settings', 
    label: 'الإعدادات', 
    icon: Settings 
  },
];

export function Sidebar({ 
  activeSection, 
  onSectionChange, 
  isCollapsed, 
  onToggleCollapse 
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['data-entry']);

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <aside 
      className={cn(
        "fixed right-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50 shadow-xl",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">خنشلة</h2>
              <p className="text-xs text-slate-400">نظام متابعة المناصب</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="bg-emerald-500 p-2 rounded-lg mx-auto">
            <MapPin className="h-5 w-5 text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={cn(
            "text-slate-400 hover:text-white hover:bg-slate-800",
            isCollapsed && "hidden"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-5rem)]">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const isExpanded = expandedItems.includes(item.id);
          const Icon = item.icon;

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  onSectionChange(item.id);
                  if (item.subItems) {
                    toggleExpand(item.id);
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-white")} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-right font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="bg-slate-700 text-slate-200 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.subItems && (
                      <ChevronLeft 
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isExpanded && "rotate-[-90deg]"
                        )} 
                      />
                    )}
                  </>
                )}
              </button>

              {/* Sub Items */}
              {!isCollapsed && item.subItems && isExpanded && (
                <div className="mr-8 mt-1 space-y-1 border-r-2 border-slate-700 pr-3">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      className="w-full text-right px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Button (when collapsed) */}
      {isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="absolute left-2 top-24 text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
    </aside>
  );
}
