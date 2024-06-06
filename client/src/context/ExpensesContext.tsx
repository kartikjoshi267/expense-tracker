/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { EXPENSES_BACKEND_URL } from "../config/config";
import { toast } from "react-toastify";
import { useModal } from "./ModalContext";

axios.defaults.validateStatus = () => true;

const expenseContext = createContext({});

export const ExpenseProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  // @ts-expect-error "unexpected error"
  const { user } = useUser();
  // @ts-expect-error "unexpected error"
  const { closeModal } = useModal();

  // @ts-expect-error "unexpected error"
  const [expenses, setExpenses]: [
    any[],
    (expenses: any[]) => void
  ] = useState([]);

  const getExpenses = async () => {
    try {
      const { data } = await axios.get(`${EXPENSES_BACKEND_URL}/`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (data.error) {
        toast.error(data.error);
        console.error(data.error);
        return;
      }
      
      setExpenses(data.data);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const addExpense = async (newExpenseData: {
    title: string;
    amount: number;
    description: string;
    sourceId: string;
    date: string;
  }) => {
    try {
      const { data } = await axios.post(`${EXPENSES_BACKEND_URL}/`, newExpenseData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (data.error) {
        toast.error(data.error);
        console.error(data.error);
        return;
      }

      closeModal();
      await getExpenses();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const getExpenseById = async (id: string) => {
    try {
      const { data } = await axios.get(`${EXPENSES_BACKEND_URL}/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (data.error) {
        toast.error(data.error);
        console.error(data.error);
        return null;
      }

      return data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const editExpense = async (newExpenseData: {
    title: string;
    amount: number;
    description: string;
    sourceId: string;
    date: string;
  }, id: string) => {
    try {
      const { data } = await axios.put(`${EXPENSES_BACKEND_URL}/${id}`, newExpenseData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (data.error) {
        toast.error(data.error);
        console.error(data.error);
        return;
      }

      closeModal();
      await getExpenses();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const { data } = await axios.delete(`${EXPENSES_BACKEND_URL}/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (data.error) {
        toast.error(data.error);
        console.error(data.error);
        return;
      }

      closeModal();
      await getExpenses();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!user) {
      return;
    }
    getExpenses();
  }, [user]);

  return (
    <expenseContext.Provider value={{ expenses, addExpense, getExpenseById, editExpense, deleteExpense }}>
      {children}
    </expenseContext.Provider>
  )
}

export const useExpense = () => {
  return useContext(expenseContext);
}