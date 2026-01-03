interface Transaction {
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

export const calculateCategoryTotals = (transactions: Transaction[]) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  
  const totals = expenses.reduce((acc: { [key: string]: number }, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  return Object.keys(totals).map(key => ({
    name: key,
    value: totals[key]
  }));
};


export const aggregateMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];  
  
  return months.map(month => ({
    name: month,
    income: Math.floor(Math.random() * 5000) + 2000, // Mock data dinámica
    expenses: Math.floor(Math.random() * 3000) + 1000,
  }));
};