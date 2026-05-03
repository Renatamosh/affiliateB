'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ theme: 'deep', setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('deep');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bp_tweaks') || '{}');
      if (saved.theme) setThemeState(saved.theme);
    } catch {}
  }, []);

  const setTheme = (t) => {
    setThemeState(t);
    try { localStorage.setItem('bp_tweaks', JSON.stringify({ theme: t })); } catch {}
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
