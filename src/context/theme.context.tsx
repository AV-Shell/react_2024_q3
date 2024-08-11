'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export interface IThemeContext {
  isDarkTheme: boolean;
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<IThemeContext>({ isDarkTheme: true, setIsDarkTheme: () => {} });

export const ThemeContextProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  return <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>{children}</ThemeContext.Provider>;
};
