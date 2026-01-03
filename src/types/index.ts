export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-01', description: 'Sueldo', category: 'Work', amount: 3000, type: 'income' },
  { id: '2', date: '2023-10-02', description: 'Supermercado', category: 'Food', amount: 150, type: 'expense' },
  { id: '3', date: '2023-10-03', description: 'Suscripción Netflix', category: 'Entertainment', amount: 15, type: 'expense' },
];
