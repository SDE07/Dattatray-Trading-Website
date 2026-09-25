import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  isDark: false,
});

const THEME_STORAGE_KEY = "dattatray-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. Check local storage
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
    } catch {
      // localStorage may be unavailable or restricted
    }
    // 2. Fallback to system preference
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  // Apply theme class to documentElement immediately
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      try {
        localStorage.setItem(THEME_STORAGE_KEY, "dark");
      } catch {}
    } else {
      root.classList.remove("dark");
      try {
        localStorage.setItem(THEME_STORAGE_KEY, "light");
      } catch {}
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const isDark = theme === "dark";

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark,
    }),
    [theme, toggleTheme, isDark]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

