<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
>>>>>>> 4914531166dc64f262a3e7a175a794f80a9547a7
>>>>>>> f7c069de203884441268ff5818b449f8c362840e
export const formatDate = (input?: string | Date) => {
  if (!input) return '';
  if (input instanceof Date) return input.toLocaleDateString('pt-BR');
  if (typeof input === 'string' && input.includes('/')) return input; // already DD/MM/YYYY
  const d = new Date(input);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR');
};

export const toApiDate = (iso: string): string => {
  if (!iso) return '';
  // Expecting YYYY-MM-DD from <input type="date">
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
};

export const fromApiDateToIso = (pt: string): string => {
  if (!pt) return '';
  // Expecting DD/MM/YYYY from API
  const [d, m, y] = pt.split('/');
  if (!d || !m || !y) return pt;
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
};

export const parseApiDate = (s: string): Date => {
  if (!s) return new Date('');
  if (s.includes('/')) {
    const [d, m, y] = s.split('/');
    return new Date(Number(y), Number(m) - 1, Number(d));
  }
  return new Date(s);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
export const formatDate = (iso?: string | Date) => {
  if (!iso) return '';
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  return d.toLocaleDateString('pt-BR');
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
>>>>>>> 4914531166dc64f262a3e7a175a794f80a9547a7
>>>>>>> f7c069de203884441268ff5818b449f8c362840e
};

export const formatCurrency = (n?: number) => {
  if (n === undefined || n === null || isNaN(n)) return 'R$ 0,00';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const parseCurrency = (s: string): number => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
>>>>>>> 4914531166dc64f262a3e7a175a794f80a9547a7
>>>>>>> f7c069de203884441268ff5818b449f8c362840e
  if (!s) return NaN;
  const raw = s.replace(/\s/g, '').replace(/[^0-9.,-]/g, '');
  const lastComma = raw.lastIndexOf(',');
  const lastDot = raw.lastIndexOf('.');
  // Determine decimal separator (pt-BR uses comma)
  let decimalSep: ',' | '.' | null = null;
  if (lastComma !== -1 && lastDot !== -1) {
    decimalSep = lastComma > lastDot ? ',' : '.';
  } else if (lastComma !== -1) {
    decimalSep = ',';
  } else if (lastDot !== -1) {
    decimalSep = '.';
  }

  let normalized = raw;
  if (decimalSep === ',') {
    // remove thousand dots, convert comma to dot
    normalized = raw.replace(/\./g, '').replace(',', '.');
  } else if (decimalSep === '.') {
    // remove thousand commas
    normalized = raw.replace(/,/g, '');
  }
  const num = Number(normalized);
  return isNaN(num) ? NaN : num;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
  const normalized = s.replace(/[^0-9,.-]/g, '').replace(',', '.');
  const num = Number(normalized);
  return isNaN(num) ? 0 : num;
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
>>>>>>> 4914531166dc64f262a3e7a175a794f80a9547a7
>>>>>>> f7c069de203884441268ff5818b449f8c362840e
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
>>>>>>> 4914531166dc64f262a3e7a175a794f80a9547a7
>>>>>>> f7c069de203884441268ff5818b449f8c362840e
