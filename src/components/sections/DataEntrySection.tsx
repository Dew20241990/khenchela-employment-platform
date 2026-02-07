import { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  UserCheck, 
  UserX, 
  Briefcase,
  Save,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { administrations, WILAYA_NAME, YEARS, MONTHS_AR, ADMINISTRATION_TYPES } from '@/data/mockData';
import type { AdministrativeContext, JobPositionsData, FilledPositions, AdministrationType } from '@/types';

const INITIAL_FILLED_POSITIONS: FilledPositions = {
  total: 0,
  byRank: [],
  maleCount: 0,
  femaleCount: 0,
};

const INITIAL_POSITIONS_DATA: JobPositionsData = {
  createdPositions: 0,
  filledPositions: { ...INITIAL_FILLED_POSITIONS },
  vacantPositions: { total: 0, byRank: [] },
};

export function DataEntrySection() {
  // Administrative Context State
  const [context, setContext] = useState<AdministrativeContext>({
    wilaya: WILAYA_NAME,
    administrationId: '',
    sector: '',
    commune: '',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  // Job Positions State
  const [positions, setPositions] = useState<JobPositionsData>(INITIAL_POSITIONS_DATA);
  
  // UI State
  const [errors, setErrors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [filledRankInputs, setFilledRankInputs] = useState<Record<string, string>>({});
  const [vacantRankInputs, setVacantRankInputs] = useState<Record<string, string>>({});
  const [adminTypeFilter, setAdminTypeFilter] = useState<AdministrationType | 'all'>('all');
  const [expandedSections, setExpandedSections] = useState<string[]>(['admin-info', 'positions-created', 'positions-filled']);

  // Get selected administration details
  const selectedAdmin = useMemo(() => {
    return administrations.find(a => a.id === context.administrationId);
  }, [context.administrationId]);

  // Filter administrations by type
  const filteredAdministrations = useMemo(() => {
    if (adminTypeFilter === 'all') return administrations;
    return administrations.filter(a => a.type === adminTypeFilter);
  }, [adminTypeFilter]);

  // Auto-fill sector and commune when administration changes
  useEffect(() => {
    if (selectedAdmin) {
      setContext(prev => ({
        ...prev,
        sector: selectedAdmin.sector,
        commune: selectedAdmin.commune,
      }));
    }
  }, [selectedAdmin]);

  // Calculate vacant positions
  useEffect(() => {
    const created = positions.createdPositions || 0;
    const filled = positions.filledPositions.total || 0;
    const vacant = Math.max(0, created - filled);
    
    setPositions(prev => ({
      ...prev,
      vacantPositions: {
        ...prev.vacantPositions,
        total: vacant,
      },
    }));
  }, [positions.createdPositions, positions.filledPositions.total]);

  // Validate form
  useEffect(() => {
    const newErrors: string[] = [];
    
    if (!context.administrationId) {
      newErrors.push('يرجى اختيار الإدارة');
    }
    
    if (positions.createdPositions < 0) {
      newErrors.push('عدد المناصب المحدثة يجب أن يكون غير سالب');
    }
    
    if (positions.filledPositions.total < 0) {
      newErrors.push('عدد المناصب المشغولة يجب أن يكون غير سالب');
    }
    
    if (positions.filledPositions.total > positions.createdPositions) {
      newErrors.push('عدد المناصب المشغولة لا يمكن أن يتجاوز عدد المناصب المحدثة');
    }
    
    const totalByRank = Object.values(filledRankInputs).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    if (totalByRank > 0 && totalByRank !== positions.filledPositions.total) {
      newErrors.push('مجموع المناصب حسب الرتبة لا يتطابق مع إجمالي المناصب المشغولة');
    }
    
    const genderTotal = positions.filledPositions.maleCount + positions.filledPositions.femaleCount;
    if (genderTotal > 0 && genderTotal !== positions.filledPositions.total) {
      newErrors.push('مجموع الذكور والإناث لا يتطابق مع إجمالي المناصب المشغولة');
    }
    
    setErrors(newErrors);
  }, [context, positions, filledRankInputs]);

  // Handlers
  const handleAdminChange = (value: string) => {
    setContext(prev => ({ ...prev, administrationId: value }));
  };

  const handleYearChange = (value: string) => {
    setContext(prev => ({ ...prev, year: parseInt(value) }));
  };

  const handleMonthChange = (value: string) => {
    setContext(prev => ({ ...prev, month: parseInt(value) }));
  };

  const handleCreatedPositionsChange = (value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setPositions(prev => ({
      ...prev,
      createdPositions: numValue,
    }));
  };

  const handleFilledTotalChange = (value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setPositions(prev => ({
      ...prev,
      filledPositions: {
        ...prev.filledPositions,
        total: numValue,
      },
    }));
  };

  const handleMaleCountChange = (value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setPositions(prev => ({
      ...prev,
      filledPositions: {
        ...prev.filledPositions,
        maleCount: numValue,
      },
    }));
  };

  const handleFemaleCountChange = (value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setPositions(prev => ({
      ...prev,
      filledPositions: {
        ...prev.filledPositions,
        femaleCount: numValue,
      },
    }));
  };

  const handleFilledRankChange = (rank: string, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setFilledRankInputs(prev => ({ ...prev, [rank]: value }));
    
    setPositions(prev => {
      const existingRanks = prev.filledPositions.byRank.filter(r => r.rank !== rank);
      const newByRank = numValue > 0 
        ? [...existingRanks, { rank, count: numValue }]
        : existingRanks;
      
      return {
        ...prev,
        filledPositions: {
          ...prev.filledPositions,
          byRank: newByRank,
        },
      };
    });
  };

  const handleVacantRankChange = (rank: string, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setVacantRankInputs(prev => ({ ...prev, [rank]: value }));
    
    setPositions(prev => {
      const existingRanks = prev.vacantPositions.byRank.filter(r => r.rank !== rank);
      const newByRank = numValue > 0 
        ? [...existingRanks, { rank, count: numValue }]
        : existingRanks;
      
      return {
        ...prev,
        vacantPositions: {
          ...prev.vacantPositions,
          byRank: newByRank,
        },
      };
    });
  };

  const handleSubmit = () => {
    if (errors.length === 0 && context.administrationId) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleReset = () => {
    setContext({
      wilaya: WILAYA_NAME,
      administrationId: '',
      sector: '',
      commune: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });
    setPositions(INITIAL_POSITIONS_DATA);
    setFilledRankInputs({});
    setVacantRankInputs({});
    setErrors([]);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">إدخال بيانات المناصب</h2>
          <p className="text-slate-500 mt-1">تسجيل بيانات المناصب المحدثة للإدارات</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            السنة: {context.year}
          </Badge>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            {MONTHS_AR.find((m: { value: number; label: string }) => m.value === context.month)?.label}
          </Badge>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <AlertDescription className="mr-2">
            تم حفظ البيانات بنجاح
          </AlertDescription>
        </Alert>
      )}

      {/* Error Alerts */}
      {errors.length > 0 && (
        <Alert className="bg-red-50 border-red-200 text-red-800">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="mr-2">
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="single">تسجيل فردي</TabsTrigger>
          <TabsTrigger value="bulk">تسجيل جماعي</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-6">
          {/* Administrative Info Section */}
          <Card className="shadow-sm border-t-4 border-t-emerald-600">
            <CardHeader 
              className="bg-slate-50/50 cursor-pointer"
              onClick={() => toggleSection('admin-info')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Building2 className="h-5 w-5 text-emerald-700" />
                  </div>
                  <CardTitle className="text-lg text-slate-800">المعلومات الإدارية</CardTitle>
                </div>
                {expandedSections.includes('admin-info') ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.includes('admin-info') && (
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Wilaya - Locked */}
                  <div className="space-y-2">
                    <Label htmlFor="wilaya" className="text-slate-700 font-semibold">
                      الولاية <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="wilaya"
                        value={WILAYA_NAME}
                        disabled
                        className="pr-10 bg-slate-100 text-slate-600 border-slate-300 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-slate-400">غير قابل للتعديل</p>
                  </div>

                  {/* Administration Type Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="adminType" className="text-slate-700 font-semibold">
                      نوع الإدارة
                    </Label>
                    <Select value={adminTypeFilter} onValueChange={(value) => {
                      setAdminTypeFilter(value as AdministrationType | 'all');
                      setContext(prev => ({ ...prev, administrationId: '' }));
                    }}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="اختر نوع الإدارة" />
                      </SelectTrigger>
                      <SelectContent>
                        {ADMINISTRATION_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Administration Select */}
                  <div className="space-y-2">
                    <Label htmlFor="administration" className="text-slate-700 font-semibold">
                      الإدارة <span className="text-red-500">*</span>
                    </Label>
                    <Select value={context.administrationId} onValueChange={handleAdminChange}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="اختر الإدارة" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredAdministrations.map((admin) => (
                          <SelectItem key={admin.id} value={admin.id}>
                            {admin.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Administration Type - Auto-filled */}
                  <div className="space-y-2">
                    <Label htmlFor="adminType" className="text-slate-700 font-semibold">
                      تصنيف الإدارة
                    </Label>
                    <Input
                      id="adminType"
                      value={selectedAdmin?.type || ''}
                      disabled
                      placeholder="يتم التعبئة تلقائياً"
                      className="bg-slate-50 text-slate-600 border-slate-300"
                    />
                  </div>

                  {/* Sector - Auto-filled */}
                  <div className="space-y-2">
                    <Label htmlFor="sector" className="text-slate-700 font-semibold">
                      القطاع
                    </Label>
                    <Input
                      id="sector"
                      value={context.sector}
                      disabled
                      placeholder="يتم التعبئة تلقائياً"
                      className="bg-slate-50 text-slate-600 border-slate-300"
                    />
                  </div>

                  {/* Commune - Auto-filled */}
                  <div className="space-y-2">
                    <Label htmlFor="commune" className="text-slate-700 font-semibold">
                      البلدية
                    </Label>
                    <Input
                      id="commune"
                      value={context.commune}
                      disabled
                      placeholder="يتم التعبئة تلقائياً"
                      className="bg-slate-50 text-slate-600 border-slate-300"
                    />
                  </div>

                  {/* Year Select */}
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-slate-700 font-semibold">
                      السنة <span className="text-red-500">*</span>
                    </Label>
                    <Select value={context.year.toString()} onValueChange={handleYearChange}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="اختر السنة" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Month Select */}
                  <div className="space-y-2">
                    <Label htmlFor="month" className="text-slate-700 font-semibold">
                      الشهر <span className="text-red-500">*</span>
                    </Label>
                    <Select value={context.month.toString()} onValueChange={handleMonthChange}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="اختر الشهر" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTHS_AR.map((month: { value: number; label: string }) => (
                          <SelectItem key={month.value} value={month.value.toString()}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Created Positions Section */}
          <Card className="shadow-sm border-t-4 border-t-blue-600">
            <CardHeader 
              className="bg-slate-50/50 cursor-pointer"
              onClick={() => toggleSection('positions-created')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-700" />
                  </div>
                  <CardTitle className="text-lg text-slate-800">المناصب المحدثة</CardTitle>
                </div>
                {expandedSections.includes('positions-created') ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.includes('positions-created') && (
              <CardContent className="p-6">
                <div className="max-w-md">
                  <Label htmlFor="createdPositions" className="text-slate-700 text-lg mb-3 block">
                    إجمالي عدد المناصب المحدثة <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="createdPositions"
                      type="number"
                      min="0"
                      value={positions.createdPositions || ''}
                      onChange={(e) => handleCreatedPositionsChange(e.target.value)}
                      placeholder="أدخل العدد الإجمالي"
                      className="pr-12 text-2xl font-bold text-center py-6 bg-white"
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    هذا هو العدد الإجمالي للمناصب التي تم إحداثها في هذه الإدارة
                  </p>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Filled Positions Section */}
          <Card className="shadow-sm border-t-4 border-t-emerald-600">
            <CardHeader 
              className="bg-slate-50/50 cursor-pointer"
              onClick={() => toggleSection('positions-filled')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <UserCheck className="h-5 w-5 text-emerald-700" />
                  </div>
                  <CardTitle className="text-lg text-slate-800">المناصب المشغولة</CardTitle>
                </div>
                {expandedSections.includes('positions-filled') ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.includes('positions-filled') && (
              <CardContent className="p-6 space-y-6">
                {/* Total and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="filledTotal" className="text-slate-700 font-semibold">
                      إجمالي المناصب المشغولة <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="filledTotal"
                      type="number"
                      min="0"
                      value={positions.filledPositions.total || ''}
                      onChange={(e) => handleFilledTotalChange(e.target.value)}
                      placeholder="0"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maleCount" className="text-slate-700 font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      عدد الذكور
                    </Label>
                    <Input
                      id="maleCount"
                      type="number"
                      min="0"
                      value={positions.filledPositions.maleCount || ''}
                      onChange={(e) => handleMaleCountChange(e.target.value)}
                      placeholder="0"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="femaleCount" className="text-slate-700 font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 text-pink-500" />
                      عدد الإناث
                    </Label>
                    <Input
                      id="femaleCount"
                      type="number"
                      min="0"
                      value={positions.filledPositions.femaleCount || ''}
                      onChange={(e) => handleFemaleCountChange(e.target.value)}
                      placeholder="0"
                      className="bg-white"
                    />
                  </div>
                </div>

                <Separator />

                {/* Filled Positions by Rank */}
                <div>
                  <Label className="text-slate-700 mb-4 block font-semibold">
                    التفصيل حسب الرتبة (اختياري)
                  </Label>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15 gap-3">
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'].map((rank) => (
                      <div key={rank} className="space-y-1">
                        <Label htmlFor={`filled-rank-${rank}`} className="text-xs text-slate-500 text-center block">
                          رتبة {rank}
                        </Label>
                        <Input
                          id={`filled-rank-${rank}`}
                          type="number"
                          min="0"
                          value={filledRankInputs[rank] || ''}
                          onChange={(e) => handleFilledRankChange(rank, e.target.value)}
                          placeholder="0"
                          className="bg-white text-center text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Vacant Positions Section */}
          <Card className="shadow-sm border-t-4 border-t-amber-500">
            <CardHeader 
              className="bg-slate-50/50 cursor-pointer"
              onClick={() => toggleSection('positions-vacant')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <UserX className="h-5 w-5 text-amber-700" />
                  </div>
                  <CardTitle className="text-lg text-slate-800">المناصب الشاغرة</CardTitle>
                </div>
                {expandedSections.includes('positions-vacant') ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.includes('positions-vacant') && (
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="vacantTotal" className="text-slate-700 font-semibold">
                      إجمالي المناصب الشاغرة
                    </Label>
                    <Input
                      id="vacantTotal"
                      type="number"
                      value={positions.vacantPositions.total}
                      disabled
                      className="bg-amber-50 text-amber-700 font-bold text-xl border-amber-200"
                    />
                    <p className="text-sm text-slate-500">
                      يتم الحساب تلقائياً: المناصب المحدثة ({positions.createdPositions}) - المناصب المشغولة ({positions.filledPositions.total})
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Vacant Positions by Rank */}
                <div>
                  <Label className="text-slate-700 mb-4 block font-semibold">
                    التفصيل حسب الرتبة (اختياري)
                  </Label>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15 gap-3">
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'].map((rank) => (
                      <div key={rank} className="space-y-1">
                        <Label htmlFor={`vacant-rank-${rank}`} className="text-xs text-slate-500 text-center block">
                          رتبة {rank}
                        </Label>
                        <Input
                          id={`vacant-rank-${rank}`}
                          type="number"
                          min="0"
                          value={vacantRankInputs[rank] || ''}
                          onChange={(e) => handleVacantRankChange(rank, e.target.value)}
                          placeholder="0"
                          className="bg-white text-center text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center sticky bottom-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200">
            <Button
              onClick={handleSubmit}
              disabled={errors.length > 0 || !context.administrationId}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg font-semibold"
            >
              <Save className="h-5 w-5 ml-2" />
              حفظ البيانات
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg font-semibold"
            >
              <RotateCcw className="h-5 w-5 ml-2" />
              إعادة تعيين
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                استيراد بيانات جماعية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  اسحب الملف هنا أو انقر للاختيار
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  يدعم ملفات Excel (.xlsx, .xls) و CSV
                </p>
                <Button variant="outline" className="border-emerald-500 text-emerald-700">
                  اختيار ملف
                </Button>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-700 mb-2">تعليمات الاستيراد:</h4>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                  <li>يجب أن يحتوي الملف على الأعمدة التالية: الإدارة، السنة، الشهر، المناصب المحدثة، المناصب المشغولة</li>
                  <li>التنسيق المدعوم: Excel (.xlsx, .xls) أو CSV</li>
                  <li>الحد الأقصى للملف: 5 ميجابايت</li>
                  <li>يمكنك <a href="#" className="text-emerald-600 underline">تحميل نموذج</a> للاطلاع على التنسيق الصحيح</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
