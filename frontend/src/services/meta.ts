import api from './api';

export interface MetaEnums {
  financial_categories: string[];
  stock_units: string[];
  movement_types: string[];
  financial_types: string[];
}

export const getEnums = async (): Promise<MetaEnums> => {
  const res = await api.get<MetaEnums>('/meta/enums');
  return res.data;
};

