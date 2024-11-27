import { useTheme } from "./theme/ThemeContext"
import MoonIcon from "./assets/icons/moon-solid.svg?react";
import SunIcon from "./assets/icons/sun-regular.svg?react";

export default function Header() {
    const { isDark, toogleTheme } = useTheme();


    return (
        <header className={`header ${isDark ? 'dark' : ''}`}>
            <h1>Where in the world?</h1>
            <div className="theme" onClick={toogleTheme}>
                {isDark ? <SunIcon className='sun_icon' /> : <MoonIcon />}
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                {/* TODO: сделать переключатель темы динамически */}
            </div>
        </header>
    )
}