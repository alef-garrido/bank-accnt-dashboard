import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { FinanceState, FinanceAction, Transaction } from "../types/finance";
import { generateId } from "../lib/finance-utils";
import { DEMO_TRANSACTIONS } from "../lib/demo-data";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

function financeReducer(state: FinanceState, action: FinanceAction): FinanceState {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      const newTransaction: Transaction = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        transactions: [newTransaction, ...state.transactions],
      };
    }
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case "LOAD_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };
    case "RESET_TO_DEMO":
      return {
        ...state,
        transactions: DEMO_TRANSACTIONS,
      };
    default:
      return state;
  }
}

interface FinanceContextValue {
  state: FinanceState;
  dispatch: React.Dispatch<FinanceAction>;
  addTransaction: (transaction: Omit<Transaction, "id" | "createdAt">) => void;
  deleteTransaction: (id: string) => void;
  resetToDemo: () => void;
}

const FinanceContext = createContext<FinanceContextValue | null>(null);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, { transactions: [] });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const transactions = JSON.parse(stored);
        dispatch({ type: "LOAD_TRANSACTIONS", payload: transactions });
      } catch {
        dispatch({ type: "RESET_TO_DEMO" });
      }
    } else {
      dispatch({ type: "RESET_TO_DEMO" });
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (state.transactions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
    }
  }, [state.transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id" | "createdAt">) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const deleteTransaction = (id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const resetToDemo = () => {
    dispatch({ type: "RESET_TO_DEMO" });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_TRANSACTIONS));
  };

  return (
    <FinanceContext.Provider
      value={{ state, dispatch, addTransaction, deleteTransaction, resetToDemo }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}

