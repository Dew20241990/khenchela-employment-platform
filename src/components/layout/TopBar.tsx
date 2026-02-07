import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings,
  Menu,
  Calendar,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';

interface TopBarProps {
  onMenuClick: () => void;
  pageTitle: string;
}

export function TopBar({ onMenuClick, pageTitle }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications] = useState([
    { id: 1, title: 'تسجيل جديد', message: 'تم تسجيل بيانات جديدة من بلدية خنشلة', time: '5 دقائق', unread: true },
    { id: 2, title: 'تنبيه', message: 'هناك مناصب شاغرة تحتاج إلى مراجعة', time: '30 دقيقة', unread: true },
    { id: 3, title: 'تحديث', message: 'تم تحديث بيانات المجلس الولائي', time: '2 ساعة', unread: false },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('ar-DZ', options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
      {/* Left Side - Menu & Title */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 hover:bg-slate-100"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">{pageTitle}</h1>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(currentTime)}</span>
            <span className="text-slate-300">|</span>
            <Clock className="h-3 w-3" />
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="البحث في الإدارات، البلديات، القطاعات..."
            className="w-full pr-10 bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-600 hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>الإشعارات</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  {unreadCount} جديد
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  {notification.unread && (
                    <span className="h-2 w-2 bg-emerald-500 rounded-full flex-shrink-0" />
                  )}
                  <span className="font-semibold text-sm flex-1">{notification.title}</span>
                  <span className="text-xs text-slate-400">{notification.time}</span>
                </div>
                <p className="text-xs text-slate-500 mr-4">{notification.message}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-emerald-600 font-medium">
              عرض جميع الإشعارات
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-slate-100">
              <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-emerald-700" />
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-800">مدير النظام</p>
                <p className="text-xs text-slate-500">wilaya@khenchela.gov.dz</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>حسابي</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <User className="h-4 w-4" />
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Settings className="h-4 w-4" />
              الإعدادات
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-red-600">
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
