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

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const calculateMonthlyComparison = (transactions: { amount: number; type: 'income'|'expense'; date: string }[]) => {
  const months = MONTH_NAMES.map((name, idx) => ({ name, income: 0, expenses: 0 }));

  transactions.forEach(t => {
    const d = new Date(t.date);
    const m = d.getMonth();
    if (t.type === 'income') months[m].income += t.amount;
    else months[m].expenses += t.amount;
  });

  return months;
};

export const calculateBalanceOverTime = (transactions: { amount: number; type: 'income'|'expense'; date: string }[]) => {
  const monthly = Array(12).fill(0);
  transactions.forEach(t => {
    const m = new Date(t.date).getMonth();
    monthly[m] += t.type === 'income' ? t.amount : -t.amount;
  });

  // cumulative
  const result: { date: string; balance: number }[] = [];
  let cum = 0;
  for (let i = 0; i < 12; i++) {
    cum += monthly[i];
    result.push({ date: MONTH_NAMES[i], balance: cum });
  }
  return result;
};