/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

const apiContext = createContext({});

export const AxiosInstanceProvider = ({ children }: { children: React.ReactNode }) => {
  const axiosInstance = axios.create();

  const onRequest = (config: any) => {
    customPreRequestFunction();
    return config;
  };

  const onResponse = (response: any) => {
    customPostResponseFunction();
    return response;
  };

  axiosInstance.interceptors.request.use(onRequest);

  axiosInstance.interceptors.response.use(onResponse);

  axios.defaults.validateStatus = () => true;

  axiosInstance.defaults.withCredentials = true;

  axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

  const customPreRequestFunction = () => {
    toast.loading("Loading...", {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const customPostResponseFunction = () => {
    toast.dismiss();
  };

  return (
    <apiContext.Provider value={{ axiosInstance }}>
      {children}
    </apiContext.Provider>
  );
}

export const useAxiosInstance = () => {
  return useContext(apiContext);
}