import { Link, useParams } from "react-router-dom";
import { CodeInfo, DetailInfo, DetailsInfo } from "./parse_det";
import Arrow from "./assets/icons/arrow-left.svg?react";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import NotFound from "./NotFound";

const EM_DASH = "\u2014";
async function getAPI(country: string) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
    // https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,currencies,subregion,tld,languages,borders,cca3
    if (!res.ok) {
        throw new Error(`Error ${res}` + `,  ${res.status}`);
    }
    const parse_det = DetailsInfo.parse(await res.json());
    return parse_det;
};

async function getCca3() {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3');
    if (!res.ok) {
        throw new Error(`Error ${res}` + `,  ${res.status}`);
    }
    const parse_code = CodeInfo.parse(await res.json());
    return parse_code;
}

export default function Details() {
    const { country } = useParams();
    const [info, setInfo] = useState<DetailInfo | undefined>(undefined);
    const [codeInfo, setCodeInfo] = useState<{ [key: string]: string } | undefined>(undefined);
    const [countryExist, setCountryExist] = useState(true);
    useEffect(() => {
        async function getFullInfo() {
            if (!country) {
                return
            }
            let data, code;
            try {
                [data, code] = await Promise.all([getAPI(country), getCca3()]);
            } catch (error) {
                console.log(`Failed to get country: `, error);
                setCountryExist(false);
                return
            }
            setInfo(data[0]);
            const mapCode = code.map(el => [el.cca3, el.name.common])
            setCodeInfo(Object.fromEntries(mapCode) as { [key: string]: string });
        }
        getFullInfo();
    }, [country])

    return (
        countryExist &&
        (info ? <main className="main">
            <Link to="/" className="button back_button shadow"><Arrow /><span>Back</span></Link>
            <section className="details_page">
                <img className="flag" src={info.flags.svg} alt={info.flags.alt || 'flag'} />
                <div className="details_info">
                    <div>
                        <h1 className="country_title">{info.name.common}</h1>
                        <div className="details">
                            <div className="details-col">
                                <span><em>Native Name: </em>{Object.values(info.name.nativeName || {}).map(el => el.common).join(', ') || EM_DASH}</span>
                                <span><em>Population: </em>{new Intl.NumberFormat().format(info.population)}</span>
                                <span><em>Region: </em>{info.region}</span>
                                <span><em>Sub region: </em>{info.subregion || EM_DASH}</span>
                                <span><em>Capital: </em>{info.capital || EM_DASH}</span>
                            </div>
                            <div className="details-col">
                                <span><em>Top Level Domain: </em>{info.tld?.join("; ") || EM_DASH}</span>
                                <span><em>Currencies: </em>{Object.values(info.currencies || {}).map(el => el.name).join(', ') || EM_DASH}</span>
                                <span><em>Languages: </em>{Object.values(info.languages || {}).join(', ') || EM_DASH}</span>
                            </div>
                        </div>
                    </div>
                    <div className="borders"><em>Border countries: </em>{info.borders ? info.borders.map(el => {
                        const name = codeInfo?.[el];
                        return name && <a key={el} href={`/${name}`} className="button border_link shadow" >{name}</a>;
                    }) : EM_DASH}</div>
                </div>
            </section >
        </main> : <Loading />)
        || <NotFound country={country} />
    )
}