import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface IThemeContext {
    isDark: boolean,
    toogleTheme: () => void,
}
export const ThemeContext = createContext<IThemeContext>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('context error');
    }

    return context;
}

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


    function toogleTheme() {
        setIsDark(!isDark);
    }
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem("theme", isDark ? 'dark' : 'light');
    }, [isDark])

    return <ThemeContext.Provider value={{ isDark, toogleTheme }}>
        {children}
    </ThemeContext.Provider>
}