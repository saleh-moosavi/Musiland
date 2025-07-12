import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
    } else {
      localStorage.setItem("theme", theme);
    }

    document.documentElement.dataset.theme = storedTheme || theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const handleTheme = () => {
    document.documentElement.dataset.theme = theme == "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, setTheme, handleTheme };
}
