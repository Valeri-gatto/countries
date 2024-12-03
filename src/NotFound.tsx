import { Link } from "react-router-dom";

export default function NotFound({ country }: { country?: string }) {
    return (
        country ?
            <div className="not_found_container" >
                <h1>Country {country || "lol"} not found</h1>
                <p>Oops! The country you are looking for does not exist in our country list.</p>
                <Link to="/" className="home-link shadow">Go to Home</Link>
            </div>
            : <div className="not_found_container">
                <h1>404 - Page Not Found</h1>
                <p>Oops! The page you are looking for does not exist.</p>
                <Link to="/" className="home-link shadow">Go to Home</Link>
            </div>
    )
}