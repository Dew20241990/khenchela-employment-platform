import { 
  Briefcase, 
  UserCheck, 
  UserX, 
  Users,
  TrendingUp,
  TrendingDown,
  Building2,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
  Legend
} from 'recharts';
import { mockJobData, MONTHS_AR } from '@/data/mockData';

const monthlyData = [
  { month: 'جانفي', created: 120, filled: 98, vacant: 22 },
  { month: 'فيفري', created: 135, filled: 110, vacant: 25 },
  { month: 'مارس', created: 145, filled: 125, vacant: 20 },
  { month: 'أفريل', created: 130, filled: 115, vacant: 15 },
  { month: 'ماي', created: 155, filled: 130, vacant: 25 },
  { month: 'جوان', created: 140, filled: 120, vacant: 20 },
];

const typeDistribution = [
  { name: 'إداري', value: 15, color: '#6366f1' },
  { name: 'اقتصادي عمومي', value: 5, color: '#10b981' },
  { name: 'اقتصادي خاص', value: 4, color: '#f59e0b' },
];

const genderDistribution = [
  { name: 'ذكور', value: 65, color: '#3b82f6' },
  { name: 'إناث', value: 35, color: '#ec4899' },
];

export function DashboardSection() {
  const totalCreated = mockJobData.reduce((sum, item) => sum + item.created, 0);
  const totalFilled = mockJobData.reduce((sum, item) => sum + item.filled, 0);
  const totalVacant = mockJobData.reduce((sum, item) => sum + item.vacant, 0);
  const totalFemale = mockJobData.reduce((sum, item) => sum + item.femaleCount, 0);
  const totalMale = mockJobData.reduce((sum, item) => sum + item.maleCount, 0);

  const fillRate = totalCreated > 0 ? Math.round((totalFilled / totalCreated) * 100) : 0;
  const femaleRate = totalFilled > 0 ? Math.round((totalFemale / totalFilled) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">مرحباً بك في نظام متابعة المناصب</h2>
            <p className="text-emerald-100">ولاية خنشلة - المديرية العامة للوظيفة العمومية</p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-center">
              <p className="text-3xl font-bold">24</p>
              <p className="text-sm text-emerald-100">إدارة مسجلة</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm text-emerald-100">قطاعات</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold">13</p>
              <p className="text-sm text-emerald-100">بلدية</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">إجمالي المناصب المحدثة</p>
                <p className="text-3xl font-bold text-slate-800">{totalCreated}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs text-emerald-600">+12% هذا الشهر</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">المناصب المشغولة</p>
                <p className="text-3xl font-bold text-slate-800">{totalFilled}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-slate-500">نسبة الإشغال: {fillRate}%</span>
                </div>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">المناصب الشاغرة</p>
                <p className="text-3xl font-bold text-slate-800">{totalVacant}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-amber-500" />
                  <span className="text-xs text-amber-600">-5% هذا الشهر</span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <UserX className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">نسبة الإناث</p>
                <p className="text-3xl font-bold text-slate-800">{femaleRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-slate-500">{totalFemale} إناث | {totalMale} ذكور</span>
                </div>
              </div>
              <div className="bg-pink-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <Card className="shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                التطور الشهري للمناصب
              </CardTitle>
              <Badge variant="outline">2024</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
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
                  <Bar dataKey="created" name="محدثة" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="filled" name="مشغولة" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="vacant" name="شاغرة" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-indigo-600" />
                توزيع الإدارات حسب النوع
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-pink-600" />
                توزيع حسب الجنس
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {genderDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity Table */}
      <Card className="shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-slate-600" />
              آخر التسجيلات
            </CardTitle>
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
              عرض الكل
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="text-right font-bold">الإدارة</TableHead>
                  <TableHead className="text-right font-bold">النوع</TableHead>
                  <TableHead className="text-right font-bold">القطاع</TableHead>
                  <TableHead className="text-right font-bold">البلدية</TableHead>
                  <TableHead className="text-right font-bold">الشهر</TableHead>
                  <TableHead className="text-right font-bold text-blue-600">المحدثة</TableHead>
                  <TableHead className="text-right font-bold text-emerald-600">المشغولة</TableHead>
                  <TableHead className="text-right font-bold text-amber-600">الشاغرة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockJobData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{row.administration}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${row.adminType === 'إداري' ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : ''}
                          ${row.adminType === 'اقتصادي عمومي' ? 'border-emerald-500 text-emerald-700 bg-emerald-50' : ''}
                          ${row.adminType === 'اقتصادي خاص' ? 'border-amber-500 text-amber-700 bg-amber-50' : ''}
                        `}
                      >
                        {row.adminType}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.sector}</TableCell>
                    <TableCell>{row.commune}</TableCell>
                    <TableCell>{MONTHS_AR.find((m: { value: number; label: string }) => m.value === row.month)?.label}</TableCell>
                    <TableCell className="font-semibold text-blue-600">{row.created}</TableCell>
                    <TableCell className="font-semibold text-emerald-600">{row.filled}</TableCell>
                    <TableCell className="font-semibold text-amber-600">{row.vacant}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
