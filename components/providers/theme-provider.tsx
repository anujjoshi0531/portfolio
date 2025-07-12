"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface ThemeContextType {
  colorMap: { name: string; code: string }[];
  setThemeColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const colorMap = [
  { name: "Red", code: "0 100% 50%" },
  { name: "Blue", code: "220 100% 60%" },
  { name: "Green", code: "140 100% 55%" },
  { name: "Pink", code: "330 100% 65%" },
  { name: "Orange", code: "30 100% 55%" },
  { name: "Purple", code: "270 100% 60%" },
  { name: "Lime", code: "75 100% 60%" },
  { name: "Magenta", code: "295 100% 60%" },
  { name: "Yellow", code: "55 100% 60%" },
  { name: "Cyan", code: "195 100% 55%" },
];

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const setThemeColor = useCallback((color: string) => {
    document.documentElement.style.setProperty("--theme", color);
    localStorage.setItem("themeColor", color);
  }, []);

  useEffect(() => {
    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) {
      document.documentElement.style.setProperty("--theme", savedColor);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ colorMap, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};