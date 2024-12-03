import { createContext, useContext } from "react";
interface IThemeContext {
    isDark: boolean,
    toggleTheme: () => void,
}
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('context error');
    }

    return context;
}