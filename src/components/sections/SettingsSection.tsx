import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Palette,
  Globe,
  Save,
  CheckCircle2,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SettingsSection() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">الإعدادات</h2>
        <p className="text-slate-500 mt-1">تخصيص إعدادات النظام والحساب</p>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <AlertDescription className="mr-2">
            تم حفظ الإعدادات بنجاح
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">الملف الشخصي</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">الإشعارات</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">الأمان</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">النظام</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-600" />
                المعلومات الشخصية
              </CardTitle>
              <CardDescription>تحديث معلومات حسابك الشخصية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-emerald-600" />
                  </div>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    تغيير
                  </Button>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">مدير النظام</h3>
                  <p className="text-slate-500">wilaya@khenchela.gov.dz</p>
                  <p className="text-sm text-slate-400">آخر تسجيل دخول: منذ 2 ساعة</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input id="fullName" defaultValue="مدير النظام" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="email" defaultValue="wilaya@khenchela.gov.dz" className="pr-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <div className="relative">
                    <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="phone" defaultValue="0550 123 456" className="pr-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">القسم</Label>
                  <Input id="department" defaultValue="المديرية العامة" disabled className="bg-slate-50" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-emerald-600" />
                إعدادات الإشعارات
              </CardTitle>
              <CardDescription>تحديد الإشعارات التي تريد تلقيها</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-800">إشعارات البريد الإلكتروني</h4>
                    <p className="text-sm text-slate-500">تلقي إشعارات عند تسجيل بيانات جديدة</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-800">تنبيهات المناصب الشاغرة</h4>
                    <p className="text-sm text-slate-500">إشعار عند وجود مناصب شاغرة تحتاج مراجعة</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-800">تقارير دورية</h4>
                    <p className="text-sm text-slate-500">إرسال تقارير شهرية عبر البريد الإلكتروني</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-800">إشعارات النظام</h4>
                    <p className="text-sm text-slate-500">تحديثات وصيانة النظام</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">تردد الإشعارات</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>تقرير الملخص</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                        <SelectItem value="monthly">شهري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                الأمان
              </CardTitle>
              <CardDescription>إدارة كلمة المرور وإعدادات الأمان</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">تغيير كلمة المرور</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        id="currentPassword" 
                        type={showPassword ? 'text' : 'password'}
                        className="pr-10"
                      />
                    </div>
                  </div>
                  <div />
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                    <div className="relative">
                      <Input 
                        id="newPassword" 
                        type={showPassword ? 'text' : 'password'}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">المصادقة الثنائية</h4>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-800">تفعيل المصادقة الثنائية</h4>
                    <p className="text-sm text-slate-500">تأمين إضافي لحسابك باستخدام رقم الهاتف</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-emerald-600" />
                إعدادات النظام
              </CardTitle>
              <CardDescription>تخصيص إعدادات النظام العامة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    اللغة
                  </Label>
                  <Select defaultValue="ar">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    المظهر
                  </Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">فاتح</SelectItem>
                      <SelectItem value="dark">داكن</SelectItem>
                      <SelectItem value="auto">تلقائي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    تنسيق التاريخ
                  </Label>
                  <Select defaultValue="hijri">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gregorian">ميلادي</SelectItem>
                      <SelectItem value="hijri">هجري</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">خيارات العرض</h4>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-800">الشريط الجانبي المدمج</h4>
                    <p className="text-sm text-slate-500">إبقاء الشريط الجانبي مدمجاً افتراضياً</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-800">تصدير تلقائي</h4>
                    <p className="text-sm text-slate-500">تصدير نسخة احتياطية تلقائياً شهرياً</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <Save className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
