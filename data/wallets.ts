
export interface Wallet {
  currency: 'USDT' | 'MXNB';
  balance: string;
  flag: string;
  name: string;
}

export const wallets: Wallet[] = [
  { currency: 'USDT', balance: '0.00', flag: '🇺🇸', name: 'Main' },
  { currency: 'MXNB', balance: '26.18', flag: '🇲🇽', name: 'Main' },
];
