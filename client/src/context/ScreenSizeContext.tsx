import { createContext, useContext, useEffect, useState } from "react";

const screenSizeContext = createContext({});

export const ScreenResizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    setIsMobile(screenSize < 770);
    if (screenSize >= 770) {
      setSidebarOpen(false);
    }
  }, [screenSize]);

  return (
    <screenSizeContext.Provider value={{ isMobile, screenSize, sidebarOpen, setSidebarOpen }}>
      {children}
    </screenSizeContext.Provider>
  );
}

export const useScreenResize = () => {
  return useContext(screenSizeContext);
}