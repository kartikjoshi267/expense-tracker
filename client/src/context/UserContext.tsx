import { SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { EXPIRY_TIME_ACCESS_TOKEN, EXPIRY_TIME_REFRESH_TOKEN, USER_BACKEND_URL } from "../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "./AxiosInstanceContext";

axios.defaults.validateStatus = () => true;

const userContext = createContext({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // @ts-expect-error "unexpected error"
  const { axiosInstance } = useAxiosInstance();

  const [user, setUser] = useState(null);

  const [accessTokenExpiry, setAccessTokenExpiry]: [number | null, React.Dispatch<SetStateAction<number | null>>] = useState(localStorage.getItem('expiry_time_access_token') ? Number(localStorage.getItem('expiry_time_access_token')) : null);

  const [refreshTokenExpiry, setRefreshTokenExpiry]: [number | null, React.Dispatch<SetStateAction<number | null>>] = useState(localStorage.getItem('expiry_time_refresh_token') ? Number(localStorage.getItem('expiry_time_refresh_token')) : null);

  const navigate = useNavigate();

  const refreshToken = async () => {
    if (refreshTokenExpiry) {
      if (Date.now() > refreshTokenExpiry + EXPIRY_TIME_REFRESH_TOKEN) {
        localStorage.removeItem("expiry_time_access_token");
        setRefreshTokenExpiry(null);
        localStorage.removeItem("expiry_time_refresh_token");
        setAccessTokenExpiry(null);
        navigate("/login");
        return;
      }
    }

    try {
      const { data } = await axios.post(USER_BACKEND_URL + "/refresh-token", {}, {
        withCredentials: true,
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }

      // Update the token expiry time
      setAccessTokenExpiry(Date.now());
      setRefreshTokenExpiry(Date.now());
    } catch (error) {
      console.error("Error refreshing token:", error);
      toast.error("Failed to refresh token.");
    }
  }

  const getUser = useCallback(async () => {
    if (refreshTokenExpiry) {
      if (Date.now() > refreshTokenExpiry + EXPIRY_TIME_REFRESH_TOKEN) {
        localStorage.removeItem("expiry_time_access_token");
        setRefreshTokenExpiry(null);
        localStorage.removeItem("expiry_time_refresh_token");
        setAccessTokenExpiry(null);
        navigate("/login");
        return;
      }
    }

    try {
      const { data } = await axios.get(USER_BACKEND_URL + "/", {
        withCredentials: true,
      });

      if (data.error) {
        return;
      }

      setUser(data.data);
    } catch (error) {
      console.error("Error getting user:", error);
      toast.error("Failed to get user.");
    }
  }, [navigate, refreshTokenExpiry]);

  useEffect(() => {
    if (!refreshTokenExpiry) {
      return;
    }

    const interval = setInterval(() => {
      if (accessTokenExpiry && Date.now() > accessTokenExpiry + EXPIRY_TIME_ACCESS_TOKEN) {
        refreshToken();
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (!refreshTokenExpiry) {
      return;
    }

    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async ({ email, password }: { email: string, password: string }) => {
    try {
      const { data } = await axiosInstance.post(USER_BACKEND_URL + "/login", {
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setAccessTokenExpiry(Date.now());
      localStorage.setItem("expiry_time_access_token", String(Date.now()));
      setRefreshTokenExpiry(Date.now());
      localStorage.setItem("expiry_time_refresh_token", String(Date.now()));
      
      await getUser();
      toast.success(data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to log in.");
    }
  }

  const register = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
      const { data } = await axiosInstance.post(USER_BACKEND_URL + "/register", {
        name,
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to log in.");
    }
  }

  const logout = async () => {
    try {
      const { data } = await axiosInstance.post(USER_BACKEND_URL + "/logout", {}, {
        withCredentials: true,
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }

      localStorage.removeItem("expiry_time_access_token");
      setAccessTokenExpiry(null);
      localStorage.removeItem("expiry_time_refresh_token");
      setRefreshTokenExpiry(null);
      setUser(null);
      navigate("/login");
      toast.success(data.message);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out.");
    }
  }

  return (
    <userContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </userContext.Provider>
  )
};

export const useUser = () => {
  return useContext(userContext);
}