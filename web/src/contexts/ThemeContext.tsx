import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string;
}

interface ThemeContextProps {
  theme: string;
  setTheme: (value: string) => void;
}
export const ThemeContext = createContext({} as ThemeContextProps);

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const userPreference = window.localStorage.getItem(
      "color-theme-drink-at-home"
    );
    if (typeof userPreference === "string") {
      return userPreference;
    }
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "light";
    }
    return "dark";
  }
};

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(getInitialTheme);
  const themeSelected = (themeSelectedParam: any) => {
    const classListTheme = window.document.documentElement.classList;
    const isDark = themeSelectedParam === "dark";

    classListTheme.remove(isDark ? "light" : "dark");
    classListTheme.add(themeSelectedParam);

    localStorage.setItem("color-theme-drink-at-home", themeSelectedParam);
  };

  if (initialTheme) {
    themeSelected(initialTheme);
  }

  useEffect(() => {
    themeSelected(theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
