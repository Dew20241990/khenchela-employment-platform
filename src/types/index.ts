// Types for Khenchela Job Positions Monitor

export type AdministrationType = 'إداري' | 'اقتصادي عمومي' | 'اقتصادي خاص';

export interface Administration {
  id: string;
  name: string;
  sector: string;
  commune: string;
  type: AdministrationType;
}

export interface RankBreakdown {
  rank: string;
  count: number;
}

export interface FilledPositions {
  total: number;
  byRank: RankBreakdown[];
  maleCount: number;
  femaleCount: number;
}

export interface VacantPositions {
  total: number;
  byRank: RankBreakdown[];
}

export interface JobPositionsData {
  createdPositions: number;
  filledPositions: FilledPositions;
  vacantPositions: VacantPositions;
}

export interface AdministrativeContext {
  wilaya: string;
  administrationId: string;
  sector: string;
  commune: string;
  year: number;
  month: number;
}

export interface FormData {
  context: AdministrativeContext;
  positions: JobPositionsData;
}

export interface KPIData {
  totalCreated: number;
  totalFilled: number;
  totalVacant: number;
  femalePercentage: number;
  malePercentage: number;
}

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

export const RANKS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
];
