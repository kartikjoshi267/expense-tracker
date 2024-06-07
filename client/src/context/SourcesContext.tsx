/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { SOURCE_BACKEND_URL } from "../config/config";
import { toast } from "react-toastify";
import { useModal } from "./ModalContext";
import { useExpense } from "./ExpensesContext";
import { useAxiosInstance } from "./AxiosInstanceContext";

axios.defaults.validateStatus = () => true;

const sourceContext = createContext({});

export const SourceProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  // @ts-expect-error "unexpected error"
  const { axiosInstance } = useAxiosInstance();
  // @ts-expect-error "unexpected error"
  const { user } = useUser();
  // @ts-expect-error "unexpected error"
  const { closeModal } = useModal();
  // @ts-expect-error "unexpected error"
  const { getExpenses } = useExpense();

  // @ts-expect-error "unexpected error"
  const [sources, setSources]: [
    any[],
    (sources: any[]) => void
  ] = useState([]);
  const [types, setTypes] = useState([]);

  const getSources = async () => {
    try {
      const { data } = await axios.get(`${SOURCE_BACKEND_URL}/`, {
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
      
      setSources(data.data);
      await getExpenses();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const getTypes = async () => {
    try {
      const { data } = await axios.get(`${SOURCE_BACKEND_URL}/types`, {
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

      setTypes(data.data);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const addSource = async (newSourceData: {
    name: string;
    type: string;
  }) => {
    try {
      const { data } = await axiosInstance.post(`${SOURCE_BACKEND_URL}/`, newSourceData, {
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
      await getSources();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const editSource = async (newSourceData: {
    name: string;
    type: string;
  }, id: string) => {
    try {
      const { data } = await axiosInstance.put(`${SOURCE_BACKEND_URL}/${id}`, newSourceData, {
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
      await getSources();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const getSourceById = async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`${SOURCE_BACKEND_URL}/${id}`, {
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

      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSource = async (id: string) => {
    try {
      const { data } = await axiosInstance.post(`${SOURCE_BACKEND_URL}/${id}`, {}, {
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
      await getSources();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!user) {
      return;
    }
    getSources();
    getTypes();
  }, [user]);

  return (
    <sourceContext.Provider value={{ sources, addSource, types, editSource, getSourceById, deleteSource }}>
      {children}
    </sourceContext.Provider>
  )
}

export const useSource = () => {
  return useContext(sourceContext);
}