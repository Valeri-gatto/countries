import { useParams } from "react-router-dom";
import { Convert, GeneralInfo } from "./parse_details";
import Arrow from "./assets/icons/arrow-left.svg?react";
import { useEffect, useState } from "react";

export default function Details() {
    const { country } = useParams();
    const [info, setInfo] = useState<GeneralInfo | undefined>(undefined);
    // if (country === undefined || !genres_list.includes(country)) {
    //     return <Notfoundpage />
    // }

    async function getAPI() {
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        // https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,currencies,subregion,tld,languages,borders,cca3
        if (!res.ok) {
            throw new Error(`Error ${res}` + `,  ${res.status}`);
        }
        const generalInfo = Convert.toGeneralInfo(await res.text());
        return generalInfo;
    };

    useEffect(() => {
        async function getGeneralInfo() {
            const data = await getAPI();
            setInfo(data);
        }
        getGeneralInfo();
    }, [])


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