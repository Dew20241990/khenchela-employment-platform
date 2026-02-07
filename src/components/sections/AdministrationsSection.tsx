import { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Search,
  Filter,
  Users,
  Briefcase,
  Phone,
  Mail,
  Edit,
  Trash2,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { administrations, COMMUNES, ADMINISTRATION_TYPES } from '@/data/mockData';
import type { AdministrationType } from '@/types';
import { cn } from '@/lib/utils';

const mockAdminDetails = [
  { id: '1', employees: 45, positions: 45, phone: '032.12.34.56', email: 'apw@khenchela.gov.dz' },
  { id: '2', employees: 38, positions: 40, phone: '032.23.45.67', email: 'diwan@khenchela.gov.dz' },
  { id: '3', employees: 120, positions: 120, phone: '032.34.56.78', email: 'sante@khenchela.gov.dz' },
  { id: '4', employees: 85, positions: 85, phone: '032.45.67.89', email: 'education@khenchela.gov.dz' },
  { id: '8', employees: 25, positions: 25, phone: '032.56.78.90', email: 'mairie.khenchela@khenchela.gov.dz' },
  { id: '9', employees: 18, positions: 20, phone: '032.67.89.01', email: 'mairie.babar@khenchela.gov.dz' },
];

export function AdministrationsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AdministrationType | 'all'>('all');
  const [selectedCommune, setSelectedCommune] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filteredAdministrations = useMemo(() => {
    return administrations.filter(admin => {
      const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          admin.sector.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || admin.type === selectedType;
      const matchesCommune = selectedCommune === 'all' || admin.commune === selectedCommune;
      return matchesSearch && matchesType && matchesCommune;
    });
  }, [searchQuery, selectedType, selectedCommune]);

  const statsByType = useMemo(() => {
    const stats = {
      'إداري': { count: 0, positions: 0 },
      'اقتصادي عمومي': { count: 0, positions: 0 },
      'اقتصادي خاص': { count: 0, positions: 0 },
    };
    administrations.forEach(admin => {
      if (stats[admin.type]) {
        stats[admin.type].count++;
        const details = mockAdminDetails.find(d => d.id === admin.id);
        stats[admin.type].positions += details?.positions || 0;
      }
    });
    return stats;
  }, []);

  const getAdminDetails = (adminId: string) => {
    return mockAdminDetails.find(d => d.id === adminId) || { employees: 0, positions: 0, phone: '-', email: '-' };
  };

  const getTypeColor = (type: AdministrationType) => {
    switch (type) {
      case 'إداري': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'اقتصادي عمومي': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'اقتصادي خاص': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">قائمة الإدارات</h2>
          <p className="text-slate-500 mt-1">إدارة وعرض الإدارات المسجلة في النظام</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
          <Plus className="h-4 w-4" />
          إضافة إدارة جديدة
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-indigo-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600 mb-1">الإدارات الإدارية</p>
                <p className="text-2xl font-bold text-indigo-900">{statsByType['إداري'].count}</p>
                <p className="text-xs text-indigo-500 mt-1">
                  {statsByType['إداري'].positions} منصب
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Building2 className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 mb-1">الإدارات الاقتصادية العمومية</p>
                <p className="text-2xl font-bold text-emerald-900">{statsByType['اقتصادي عمومي'].count}</p>
                <p className="text-xs text-emerald-500 mt-1">
                  {statsByType['اقتصادي عمومي'].positions} منصب
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Building2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600 mb-1">الإدارات الاقتصادية الخاصة</p>
                <p className="text-2xl font-bold text-amber-900">{statsByType['اقتصادي خاص'].count}</p>
                <p className="text-xs text-amber-500 mt-1">
                  {statsByType['اقتصادي خاص'].positions} منصب
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <Building2 className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="البحث في الإدارات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            <Select value={selectedType} onValueChange={(v) => setSelectedType(v as AdministrationType | 'all')}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 ml-2" />
                <SelectValue placeholder="نوع الإدارة" />
              </SelectTrigger>
              <SelectContent>
                {ADMINISTRATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCommune} onValueChange={setSelectedCommune}>
              <SelectTrigger className="w-40">
                <MapPin className="h-4 w-4 ml-2" />
                <SelectValue placeholder="البلدية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع البلديات</SelectItem>
                {COMMUNES.map((commune) => (
                  <SelectItem key={commune} value={commune}>{commune}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-emerald-600' : ''}
              >
                قائمة
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-emerald-600' : ''}
              >
                شبكة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-500">
          تم العثور على <span className="font-bold text-slate-800">{filteredAdministrations.length}</span> إدارة
        </p>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-right font-bold">الإدارة</TableHead>
                    <TableHead className="text-right font-bold">النوع</TableHead>
                    <TableHead className="text-right font-bold">القطاع</TableHead>
                    <TableHead className="text-right font-bold">البلدية</TableHead>
                    <TableHead className="text-right font-bold">الموظفين</TableHead>
                    <TableHead className="text-right font-bold">المناصب</TableHead>
                    <TableHead className="text-right font-bold">الاتصال</TableHead>
                    <TableHead className="text-right font-bold">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdministrations.map((admin) => {
                    const details = getAdminDetails(admin.id);
                    return (
                      <TableRow key={admin.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="bg-slate-100 p-2 rounded-lg">
                              <Building2 className="h-4 w-4 text-slate-600" />
                            </div>
                            {admin.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(getTypeColor(admin.type))}>
                            {admin.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{admin.sector}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            {admin.commune}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-slate-400" />
                            {details.employees}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 text-slate-400" />
                            {details.positions}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-slate-400" />
                              {details.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-slate-400" />
                              {details.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2">
                                <Edit className="h-4 w-4" />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-red-600">
                                <Trash2 className="h-4 w-4" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAdministrations.map((admin) => {
            const details = getAdminDetails(admin.id);
            return (
              <Card key={admin.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-slate-100 p-3 rounded-xl">
                      <Building2 className="h-6 w-6 text-slate-600" />
                    </div>
                    <Badge variant="outline" className={cn(getTypeColor(admin.type))}>
                      {admin.type}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 mb-2">{admin.name}</h3>
                  
                  <div className="space-y-2 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {admin.commune}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {admin.sector}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-center">
                      <p className="text-xs text-slate-400">الموظفين</p>
                      <p className="font-bold text-slate-800">{details.employees}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-400">المناصب</p>
                      <p className="font-bold text-slate-800">{details.positions}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
