import { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Filter,
  Calendar,
  Building2,
  MapPin,
  TrendingUp,
  TrendingDown,
  Printer,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { mockJobData, MONTHS_AR, YEARS, ADMINISTRATION_TYPES } from '@/data/mockData';
import { cn } from '@/lib/utils';

const monthlyTrendData = [
  { month: 'جانفي', administrative: 45, publicEcon: 120, privateEcon: 25 },
  { month: 'فيفري', administrative: 48, publicEcon: 125, privateEcon: 28 },
  { month: 'مارس', administrative: 52, publicEcon: 130, privateEcon: 30 },
  { month: 'أفريل', administrative: 50, publicEcon: 128, privateEcon: 32 },
  { month: 'ماي', administrative: 55, publicEcon: 135, privateEcon: 35 },
  { month: 'جوان', administrative: 58, publicEcon: 140, privateEcon: 38 },
];

const sectorDistribution = [
  { name: 'الإدارة المحلية', value: 45, color: '#6366f1' },
  { name: 'الصحة', value: 120, color: '#10b981' },
  { name: 'التربية', value: 85, color: '#f59e0b' },
  { name: 'البلديات', value: 68, color: '#ec4899' },
  { name: 'الفلاحة', value: 35, color: '#8b5cf6' },
  { name: 'أخرى', value: 25, color: '#6b7280' },
];

const communeData = [
  { name: 'خنشلة', created: 250, filled: 208, vacant: 42 },
  { name: 'بابار', created: 45, filled: 38, vacant: 7 },
  { name: 'قايس', created: 38, filled: 32, vacant: 6 },
  { name: 'الشريعة', created: 35, filled: 30, vacant: 5 },
  { name: 'بوحمامة', created: 30, filled: 25, vacant: 5 },
  { name: 'المسيلة', created: 28, filled: 24, vacant: 4 },
  { name: 'يابوس', created: 25, filled: 21, vacant: 4 },
  { name: 'الشلال', created: 22, filled: 18, vacant: 4 },
];

const reportTypes = [
  { id: 'monthly', label: 'التقرير الشهري', icon: Calendar },
  { id: 'annual', label: 'التقرير السنوي', icon: BarChart3 },
  { id: 'by-sector', label: 'حسب القطاع', icon: Building2 },
  { id: 'by-type', label: 'حسب نوع الإدارة', icon: Filter },
  { id: 'by-commune', label: 'حسب البلدية', icon: MapPin },
];

export function ReportsSection() {
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('6');
  const [selectedType, setSelectedType] = useState('all');

  const totalCreated = mockJobData.reduce((sum, item) => sum + item.created, 0);
  const totalFilled = mockJobData.reduce((sum, item) => sum + item.filled, 0);
  const totalVacant = mockJobData.reduce((sum, item) => sum + item.vacant, 0);
  const fillRate = totalCreated > 0 ? Math.round((totalFilled / totalCreated) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">التقارير والإحصائيات</h2>
          <p className="text-slate-500 mt-1">عرض وتحليل بيانات المناصب المحدثة</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            طباعة
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            تصدير PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            مشاركة
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">عوامل التصفية:</span>
            </div>
            
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="السنة" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((year) => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الشهر" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS_AR.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>{month.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="نوع الإدارة" />
              </SelectTrigger>
              <SelectContent>
                {ADMINISTRATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="secondary" size="sm" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              تطبيق
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Type Tabs */}
      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
          {reportTypes.map((type) => (
            <TabsTrigger 
              key={type.id} 
              value={type.id}
              className="gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              <type.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{type.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Summary Cards - Common to all reports */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">إجمالي المناصب المحدثة</p>
                  <p className="text-2xl font-bold text-slate-800">{totalCreated}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">المناصب المشغولة</p>
                  <p className="text-2xl font-bold text-slate-800">{totalFilled}</p>
                </div>
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">المناصب الشاغرة</p>
                  <p className="text-2xl font-bold text-slate-800">{totalVacant}</p>
                </div>
                <div className="bg-amber-100 p-2 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">نسبة الإشغال</p>
                  <p className="text-2xl font-bold text-slate-800">{fillRate}%</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Report */}
        <TabsContent value="monthly" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-600" />
                التقرير الشهري - {MONTHS_AR.find(m => m.value === parseInt(selectedMonth))?.label} {selectedYear}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        textAlign: 'right'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="administrative" name="إداري" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="publicEcon" name="اقتصادي عمومي" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="privateEcon" name="اقتصادي خاص" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Annual Report */}
        <TabsContent value="annual" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                التقرير السنوي - {selectedYear}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        textAlign: 'right'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="administrative" name="إداري" stroke="#6366f1" strokeWidth={2} />
                    <Line type="monotone" dataKey="publicEcon" name="اقتصادي عمومي" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="privateEcon" name="اقتصادي خاص" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* By Sector Report */}
        <TabsContent value="by-sector" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  توزيع المناصب حسب القطاع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sectorDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تفاصيل القطاعات</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-right">القطاع</TableHead>
                      <TableHead className="text-right">المحدثة</TableHead>
                      <TableHead className="text-right">النسبة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sectorDistribution.map((sector) => (
                      <TableRow key={sector.name}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <span 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: sector.color }}
                          />
                          {sector.name}
                        </TableCell>
                        <TableCell>{sector.value}</TableCell>
                        <TableCell>
                          {Math.round((sector.value / sectorDistribution.reduce((a, b) => a + b.value, 0)) * 100)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* By Type Report */}
        <TabsContent value="by-type" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-emerald-600" />
                توزيع المناصب حسب نوع الإدارة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-indigo-50 border-indigo-200">
                  <CardContent className="p-6 text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-bold text-indigo-900 mb-2">إداري</h3>
                    <p className="text-3xl font-bold text-indigo-700">293</p>
                    <p className="text-sm text-indigo-600 mt-1">15 إدارة</p>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-6 text-center">
                    <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">اقتصادي عمومي</h3>
                    <p className="text-3xl font-bold text-emerald-700">778</p>
                    <p className="text-sm text-emerald-600 mt-1">5 إدارات</p>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-6 text-center">
                    <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-amber-900 mb-2">اقتصادي خاص</h3>
                    <p className="text-3xl font-bold text-amber-700">188</p>
                    <p className="text-sm text-amber-600 mt-1">4 إدارات</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* By Commune Report */}
        <TabsContent value="by-commune" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                توزيع المناصب حسب البلدية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={communeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        textAlign: 'right'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="created" name="محدثة" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="filled" name="مشغولة" fill="#10b981" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="vacant" name="شاغرة" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-right">البلدية</TableHead>
                    <TableHead className="text-right text-blue-600">المحدثة</TableHead>
                    <TableHead className="text-right text-emerald-600">المشغولة</TableHead>
                    <TableHead className="text-right text-amber-600">الشاغرة</TableHead>
                    <TableHead className="text-right">نسبة الإشغال</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {communeData.map((commune) => (
                    <TableRow key={commune.name}>
                      <TableCell className="font-medium">{commune.name}</TableCell>
                      <TableCell>{commune.created}</TableCell>
                      <TableCell>{commune.filled}</TableCell>
                      <TableCell>{commune.vacant}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            commune.filled / commune.created >= 0.8 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          )}
                        >
                          {Math.round((commune.filled / commune.created) * 100)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
