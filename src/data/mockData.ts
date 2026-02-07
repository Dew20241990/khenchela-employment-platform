import type { Administration } from '@/types';

export const WILAYA_NAME = 'خنشلة';

export const MONTHS_AR = [
  { value: 1, label: 'جانفي' },
  { value: 2, label: 'فيفري' },
  { value: 3, label: 'مارس' },
  { value: 4, label: 'أفريل' },
  { value: 5, label: 'ماي' },
  { value: 6, label: 'جوان' },
  { value: 7, label: 'جويلية' },
  { value: 8, label: 'أوت' },
  { value: 9, label: 'سبتمبر' },
  { value: 10, label: 'أكتوبر' },
  { value: 11, label: 'نوفمبر' },
  { value: 12, label: 'ديسمبر' },
];

export const administrations: Administration[] = [
  // إداري
  { id: '1', name: 'المجلس الشعبي الولائي', sector: 'الإدارة المحلية', commune: 'خنشلة', type: 'إداري' },
  { id: '2', name: 'الديوان الولائي', sector: 'الإدارة المحلية', commune: 'خنشلة', type: 'إداري' },
  { id: '8', name: 'بلدية خنشلة', sector: 'البلديات', commune: 'خنشلة', type: 'إداري' },
  { id: '9', name: 'بلدية بابار', sector: 'البلديات', commune: 'بابار', type: 'إداري' },
  { id: '10', name: 'بلدية الشريعة', sector: 'البلديات', commune: 'الشريعة', type: 'إداري' },
  { id: '11', name: 'بلدية قايس', sector: 'البلديات', commune: 'قايس', type: 'إداري' },
  { id: '12', name: 'بلدية بوحمامة', sector: 'البلديات', commune: 'بوحمامة', type: 'إداري' },
  { id: '13', name: 'بلدية المسيلة', sector: 'البلديات', commune: 'المسيلة', type: 'إداري' },
  { id: '14', name: 'بلدية يابوس', sector: 'البلديات', commune: 'يابوس', type: 'إداري' },
  { id: '15', name: 'بلدية الشلال', sector: 'البلديات', commune: 'الشلال', type: 'إداري' },
  { id: '16', name: 'بلدية الطارف', sector: 'البلديات', commune: 'الطارف', type: 'إداري' },
  { id: '17', name: 'بلدية جران', sector: 'البلديات', commune: 'جران', type: 'إداري' },
  { id: '18', name: 'بلدية تامزة', sector: 'البلديات', commune: 'تامزة', type: 'إداري' },
  { id: '19', name: 'بلدية المزيرعة', sector: 'البلديات', commune: 'المزيرعة', type: 'إداري' },
  { id: '20', name: 'بلدية خيران', sector: 'البلديات', commune: 'خيران', type: 'إداري' },
  // اقتصادي عمومي
  { id: '3', name: 'مصلحة الصحة', sector: 'الصحة', commune: 'خنشلة', type: 'اقتصادي عمومي' },
  { id: '4', name: 'مصلحة التربية', sector: 'التربية', commune: 'خنشلة', type: 'اقتصادي عمومي' },
  { id: '5', name: 'مصلحة الشؤون الاجتماعية', sector: 'الشؤون الاجتماعية', commune: 'خنشلة', type: 'اقتصادي عمومي' },
  { id: '6', name: 'مصلحة الأشغال العمومية', sector: 'الأشغال العمومية', commune: 'خنشلة', type: 'اقتصادي عمومي' },
  { id: '7', name: 'مصلحة الفلاحة', sector: 'الفلاحة', commune: 'خنشلة', type: 'اقتصادي عمومي' },
  // اقتصادي خاص (مؤسسات اقتصادية خاصة)
  { id: '21', name: 'مؤسسة النقل الحضري', sector: 'النقل', commune: 'خنشلة', type: 'اقتصادي خاص' },
  { id: '22', name: 'مؤسسة المياه والطاقة', sector: 'الموارد المائية', commune: 'خنشلة', type: 'اقتصادي خاص' },
  { id: '23', name: 'مؤسسة التطهير', sector: 'البيئة', commune: 'خنشلة', type: 'اقتصادي خاص' },
  { id: '24', name: 'مؤسسة النظافة', sector: 'البيئة', commune: 'خنشلة', type: 'اقتصادي خاص' },
];

export const ADMINISTRATION_TYPES = [
  { value: 'all', label: 'الكل' },
  { value: 'إداري', label: 'إداري' },
  { value: 'اقتصادي عمومي', label: 'اقتصادي عمومي' },
  { value: 'اقتصادي خاص', label: 'اقتصادي خاص' },
];

export const YEARS = [2023, 2024, 2025, 2026];

export const SECTORS = [
  'الإدارة المحلية',
  'الصحة',
  'التربية',
  'الشؤون الاجتماعية',
  'الأشغال العمومية',
  'الفلاحة',
  'البلديات',
];

export const COMMUNES = [
  'خنشلة',
  'بابار',
  'الشريعة',
  'قايس',
  'بوحمامة',
  'المسيلة',
  'يابوس',
  'الشلال',
  'الطارف',
  'جران',
  'تامزة',
  'المزيرعة',
  'خيران',
];

// Mock data for visualization
export const mockJobData = [
  {
    id: '1',
    administration: 'المجلس الشعبي الولائي',
    adminType: 'إداري',
    sector: 'الإدارة المحلية',
    commune: 'خنشلة',
    year: 2024,
    month: 6,
    created: 45,
    filled: 38,
    vacant: 7,
    maleCount: 25,
    femaleCount: 13,
  },
  {
    id: '2',
    administration: 'مصلحة الصحة',
    adminType: 'اقتصادي عمومي',
    sector: 'الصحة',
    commune: 'خنشلة',
    year: 2024,
    month: 6,
    created: 120,
    filled: 98,
    vacant: 22,
    maleCount: 42,
    femaleCount: 56,
  },
  {
    id: '3',
    administration: 'مصلحة التربية',
    adminType: 'اقتصادي عمومي',
    sector: 'التربية',
    commune: 'خنشلة',
    year: 2024,
    month: 6,
    created: 85,
    filled: 72,
    vacant: 13,
    maleCount: 28,
    femaleCount: 44,
  },
  {
    id: '4',
    administration: 'بلدية بابار',
    adminType: 'إداري',
    sector: 'البلديات',
    commune: 'بابار',
    year: 2024,
    month: 6,
    created: 25,
    filled: 20,
    vacant: 5,
    maleCount: 15,
    femaleCount: 5,
  },
  {
    id: '5',
    administration: 'بلدية قايس',
    adminType: 'إداري',
    sector: 'البلديات',
    commune: 'قايس',
    year: 2024,
    month: 6,
    created: 18,
    filled: 15,
    vacant: 3,
    maleCount: 10,
    femaleCount: 5,
  },
];
