import { Link } from "react-router-dom";
import MoonIcon from "./assets/icons/moon-solid.svg?react";
import SunIcon from "./assets/icons/sun-regular.svg?react";
import { useTheme } from "./theme/Context";

export default function Header() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className={`header ${isDark ? 'dark' : ''}`}>
            <Link to={'/'}><h1>Where in the world?</h1></Link>
            <div className="theme" onClick={toggleTheme}>
                {isDark ? <SunIcon className='sun_icon' /> : <MoonIcon />}
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
            </div>
        </header>
    )
}