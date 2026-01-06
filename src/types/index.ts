export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

export const mockTransactions: Transaction[] = [
  // January
  { id: '1', date: '2025-01-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '2', date: '2025-01-05', description: 'Grocery Shopping', category: 'Food', amount: 120, type: 'expense' },
  { id: '3', date: '2025-01-08', description: 'Netflix Subscription', category: 'Entertainment', amount: 15, type: 'expense' },
  { id: '4', date: '2025-01-12', description: 'Gas Bill', category: 'Utilities', amount: 85, type: 'expense' },
  { id: '5', date: '2025-01-15', description: 'Freelance Project', category: 'Work', amount: 800, type: 'income' },
  { id: '6', date: '2025-01-20', description: 'Dinner Out', category: 'Food', amount: 65, type: 'expense' },

  // February
  { id: '7', date: '2025-02-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '8', date: '2025-02-03', description: 'Gym Membership', category: 'Health', amount: 50, type: 'expense' },
  { id: '9', date: '2025-02-07', description: 'Groceries', category: 'Food', amount: 145, type: 'expense' },
  { id: '10', date: '2025-02-12', description: 'Electric Bill', category: 'Utilities', amount: 95, type: 'expense' },
  { id: '11', date: '2025-02-18', description: 'Bonus', category: 'Work', amount: 1200, type: 'income' },
  { id: '12', date: '2025-02-25', description: 'Movie Tickets', category: 'Entertainment', amount: 30, type: 'expense' },

  // March
  { id: '13', date: '2025-03-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '14', date: '2025-03-04', description: 'Car Insurance', category: 'Transportation', amount: 200, type: 'expense' },
  { id: '15', date: '2025-03-08', description: 'Groceries', category: 'Food', amount: 130, type: 'expense' },
  { id: '16', date: '2025-03-10', description: 'Interest from savings', category: 'Investment', amount: 50, type: 'income' },
  { id: '17', date: '2025-03-15', description: 'Dentist Appointment', category: 'Health', amount: 120, type: 'expense' },
  { id: '18', date: '2025-03-20', description: 'Restaurant', category: 'Food', amount: 75, type: 'expense' },

  // April
  { id: '19', date: '2025-04-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '20', date: '2025-04-05', description: 'Groceries', category: 'Food', amount: 155, type: 'expense' },
  { id: '21', date: '2025-04-10', description: 'Water Bill', category: 'Utilities', amount: 45, type: 'expense' },
  { id: '22', date: '2025-04-12', description: 'Concert Tickets', category: 'Entertainment', amount: 120, type: 'expense' },
  { id: '23', date: '2025-04-18', description: 'Freelance Income', category: 'Work', amount: 600, type: 'income' },
  { id: '24', date: '2025-04-22', description: 'Clothing Shopping', category: 'Shopping', amount: 180, type: 'expense' },

  // May
  { id: '25', date: '2025-05-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '26', date: '2025-05-03', description: 'Groceries', category: 'Food', amount: 140, type: 'expense' },
  { id: '27', date: '2025-05-08', description: 'Gas Bill', category: 'Utilities', amount: 60, type: 'expense' },
  { id: '28', date: '2025-05-14', description: 'Birthday Gift', category: 'Shopping', amount: 95, type: 'expense' },
  { id: '29', date: '2025-05-20', description: 'Bonus', category: 'Work', amount: 1500, type: 'income' },
  { id: '30', date: '2025-05-25', description: 'Vacation Booking', category: 'Travel', amount: 800, type: 'expense' },

  // June
  { id: '31', date: '2025-06-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '32', date: '2025-06-04', description: 'Groceries', category: 'Food', amount: 160, type: 'expense' },
  { id: '33', date: '2025-06-09', description: 'Electric Bill', category: 'Utilities', amount: 110, type: 'expense' },
  { id: '34', date: '2025-06-12', description: 'Summer Festival', category: 'Entertainment', amount: 45, type: 'expense' },
  { id: '35', date: '2025-06-16', description: 'Freelance Project', category: 'Work', amount: 900, type: 'income' },
  { id: '36', date: '2025-06-23', description: 'Restaurant', category: 'Food', amount: 85, type: 'expense' },

  // July
  { id: '37', date: '2025-07-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '38', date: '2025-07-05', description: 'Groceries', category: 'Food', amount: 150, type: 'expense' },
  { id: '39', date: '2025-07-10', description: 'Gas Bill', category: 'Utilities', amount: 50, type: 'expense' },
  { id: '40', date: '2025-07-14', description: 'Gym Equipment', category: 'Health', amount: 75, type: 'expense' },
  { id: '41', date: '2025-07-19', description: 'Consulting Income', category: 'Work', amount: 1100, type: 'income' },
  { id: '42', date: '2025-07-28', description: 'Vacation Expenses', category: 'Travel', amount: 600, type: 'expense' },

  // August
  { id: '43', date: '2025-08-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '44', date: '2025-08-03', description: 'Groceries', category: 'Food', amount: 145, type: 'expense' },
  { id: '45', date: '2025-08-08', description: 'Water Bill', category: 'Utilities', amount: 55, type: 'expense' },
  { id: '46', date: '2025-08-12', description: 'Netflix + Spotify', category: 'Entertainment', amount: 25, type: 'expense' },
  { id: '47', date: '2025-08-17', description: 'Freelance Work', category: 'Work', amount: 700, type: 'income' },
  { id: '48', date: '2025-08-25', description: 'Back to School Shopping', category: 'Shopping', amount: 250, type: 'expense' },

  // September
  { id: '49', date: '2025-09-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '50', date: '2025-09-04', description: 'Groceries', category: 'Food', amount: 135, type: 'expense' },
  { id: '51', date: '2025-09-09', description: 'Electric Bill', category: 'Utilities', amount: 100, type: 'expense' },
  { id: '52', date: '2025-09-13', description: 'Doctor Visit', category: 'Health', amount: 80, type: 'expense' },
  { id: '53', date: '2025-09-20', description: 'Bonus', category: 'Work', amount: 1300, type: 'income' },
  { id: '54', date: '2025-09-27', description: 'Dinner Party Supplies', category: 'Food', amount: 90, type: 'expense' },

  // October
  { id: '55', date: '2025-10-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '56', date: '2025-10-02', description: 'Supermercado', category: 'Food', amount: 150, type: 'expense' },
  { id: '57', date: '2025-10-03', description: 'Suscripción Netflix', category: 'Entertainment', amount: 15, type: 'expense' },
  { id: '58', date: '2025-10-08', description: 'Gas Bill', category: 'Utilities', amount: 75, type: 'expense' },
  { id: '59', date: '2025-10-15', description: 'Freelance Income', category: 'Work', amount: 850, type: 'income' },
  { id: '60', date: '2025-10-22', description: 'Halloween Party', category: 'Entertainment', amount: 60, type: 'expense' },

  // November
  { id: '61', date: '2025-11-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '62', date: '2025-11-05', description: 'Groceries', category: 'Food', amount: 170, type: 'expense' },
  { id: '63', date: '2025-11-10', description: 'Winter Clothes', category: 'Shopping', amount: 220, type: 'expense' },
  { id: '64', date: '2025-11-12', description: 'Electric Bill', category: 'Utilities', amount: 130, type: 'expense' },
  { id: '65', date: '2025-11-18', description: 'Consulting Project', category: 'Work', amount: 1400, type: 'income' },
  { id: '66', date: '2025-11-25', description: 'Thanksgiving Dinner', category: 'Food', amount: 120, type: 'expense' },

  // December
  { id: '67', date: '2025-12-01', description: 'Salary', category: 'Work', amount: 3500, type: 'income' },
  { id: '68', date: '2025-12-03', description: 'Groceries', category: 'Food', amount: 180, type: 'expense' },
  { id: '69', date: '2025-12-08', description: 'Christmas Shopping', category: 'Shopping', amount: 350, type: 'expense' },
  { id: '70', date: '2025-12-10', description: 'Gas Bill', category: 'Utilities', amount: 95, type: 'expense' },
  { id: '71', date: '2025-12-15', description: 'Year-end Bonus', category: 'Work', amount: 2000, type: 'income' },
  { id: '72', date: '2025-12-20', description: 'Holiday Dinner', category: 'Food', amount: 140, type: 'expense' },
  { id: '73', date: '2025-12-28', description: 'New Year Celebration', category: 'Entertainment', amount: 75, type: 'expense' },
];
