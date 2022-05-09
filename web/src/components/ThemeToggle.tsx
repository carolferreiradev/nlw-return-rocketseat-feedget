import { Moon, Sun } from "phosphor-react";

import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function changeTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className="absolute right-0 top-0 mr-4 mt-20 md:mr-6 md:mt-20">
      <div className="transition duration-500 ease-in-out rounded-full p-2">
        {theme === "dark" ? (
          <Sun
            onClick={changeTheme}
            className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
          />
        ) : (
          <Moon
            onClick={changeTheme}
            className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
