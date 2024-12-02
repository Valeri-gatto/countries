import { useParams } from "react-router-dom";
import Arrow from "./assets/icons/arrow-left.svg?react";

export default function Details() {
    const { country } = useParams();
    // if (country === undefined || !genres_list.includes(country)) {
    //     return <Notfoundpage />
    // }

    return (
        <>
            <div><button><Arrow />Back</button></div>
            <section>
                <div><img src="" alt="flag" /></div>
                <div className="country_info">
                    <h1 className="countryName"></h1>
                    <div className="details">
                        <div className="details-1-col">
                            <p><span>Native Name: </span></p>
                            <p><span>Population: </span></p>
                            <p><span>Region: </span></p>
                            <p><span>Sub region: </span></p>
                            <p><span>Capital: </span></p>
                        </div>
                        <div className="details-2-col">
                            <p><span>Top Level Domain: </span></p>
                            <p><span>Currencies: </span></p>
                            <p><span>Languages: </span></p>
                        </div>
                    </div>
                    {/* здесь нужно мапнуть количество спанов */}
                    <div><p><span>Border countries: </span></p></div>
                </div>
            </section>
        </>
    )
}