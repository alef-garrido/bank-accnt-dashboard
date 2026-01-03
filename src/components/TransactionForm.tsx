import React, { useState } from 'react';
import type { Transaction } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.description.trim() || !formData.amount) {
      setError('Please fill in all required fields.');
      return;
    }

    const amountNum = parseFloat(formData.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      date: formData.date,
      description: formData.description.trim(),
      category: formData.category,
      amount: amountNum,
      type: formData.type as 'income' | 'expense',
    };

    onAddTransaction(newTransaction);

    // Reset specific fields
    setFormData({ ...formData, description: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Add Transaction</h3>

      {error && <div className="text-sm text-red-600 font-medium">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Description (e.g. Salary, Rent)"
          className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Amount"
          className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />
        <select 
          className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Work">Work</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
        </select>
        <select 
          className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 font-medium text-gray-700"
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value as 'income' | 'expense'})}
        >
          <option value="expense">Expense (-)</option>
          <option value="income">Income (+)</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="date"
          className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Add Transaction
      </button>
    </form>
  );
};
