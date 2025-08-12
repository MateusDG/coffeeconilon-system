export const formatDate = (iso?: string | Date) => {
  if (!iso) return '';
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  return d.toLocaleDateString('pt-BR');
};

export const formatCurrency = (n?: number) => {
  if (n === undefined || n === null || isNaN(n)) return 'R$ 0,00';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const parseCurrency = (s: string): number => {
  const normalized = s.replace(/[^0-9,.-]/g, '').replace(',', '.');
  const num = Number(normalized);
  return isNaN(num) ? 0 : num;
};

export const formatNumber = (n?: number, decimals = 2) => {
  if (n === undefined || n === null || isNaN(n)) return '0';
  return n.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

export const FINANCIAL_CATEGORIES = [
  { value: 'sale', label: 'Venda' },
  { value: 'cost', label: 'Custo' },
  { value: 'service', label: 'Serviço' },
  { value: 'input', label: 'Insumo' },
  { value: 'labor', label: 'Mão de obra' },
  { value: 'tax', label: 'Imposto' },
];

export const STOCK_UNITS = [
  { value: 'kg', label: 'kg' },
  { value: 'sc', label: 'saca (60kg)' },
  { value: 't', label: 'tonelada' },
  { value: 'un', label: 'unidade' },
];

