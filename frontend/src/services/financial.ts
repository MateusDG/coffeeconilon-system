import api from './api';

export type FinancialType = 'IN' | 'OUT';
export type FinancialCategory = 'sale' | 'cost' | 'service' | 'input' | 'labor' | 'tax';

export interface FinancialRecord {
  id: number;
  type: FinancialType;
  category: FinancialCategory;
  description?: string | null;
  value: number;
  date: string; // DD/MM/YYYY
  crop_id?: number | null;
  lot_id?: number | null;
}

export interface FinancialCreateDTO {
  type: FinancialType;
  category: FinancialCategory;
  description?: string | null;
  value: number;
  date: string; // DD/MM/YYYY
  crop_id?: number | null;
  lot_id?: number | null;
}

export interface FinancialUpdateDTO {
  type?: FinancialType;
  category?: FinancialCategory;
  description?: string | null;
  value?: number;
  date?: string; // DD/MM/YYYY
  crop_id?: number | null;
  lot_id?: number | null;
}

export const FinancialService = {
  async list(params?: Record<string, any>): Promise<FinancialRecord[]> {
    const res = await api.get<FinancialRecord[]>('/financial', { params });
    return res.data;
  },
  async create(payload: FinancialCreateDTO): Promise<FinancialRecord> {
    const res = await api.post<FinancialRecord>('/financial', payload);
    return res.data;
  },
  async update(id: number, payload: FinancialUpdateDTO): Promise<FinancialRecord> {
    const res = await api.put<FinancialRecord>(`/financial/${id}`, payload);
    return res.data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/financial/${id}`);
  },
};
