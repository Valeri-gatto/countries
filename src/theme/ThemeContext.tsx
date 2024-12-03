import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "./Context";

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [isDark, setIsDark] = useState(() => {
        const curTheme = localStorage.getItem('theme');
        if (curTheme === 'dark') {
            return true;
        } else if (curTheme === 'light') {
            return false;
        } else {
            return window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
        }
    });

    function toggleTheme() {
        setIsDark(!isDark);
    }
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem("theme", isDark ? 'dark' : 'light');
    }, [isDark])

    return <ThemeContext.Provider value={{ isDark, toggleTheme: toggleTheme }}>
        {children}
    </ThemeContext.Provider>
}