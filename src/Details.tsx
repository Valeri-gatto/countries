import { redirect, useParams } from "react-router-dom";
import { CodeInfo, DetailInfo, DetailsInfo } from "./parse_det";
import Arrow from "./assets/icons/arrow-left.svg?react";
import { useEffect, useState } from "react";


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

    useEffect(() => {
        async function getFullInfo() {
            if (country) {
                const [data, code] = await Promise.all([getAPI(country), getCca3()]);
                setInfo(data[0]);
                const mapCode = code.map(el => [el.cca3, el.name.common])
                setCodeInfo(Object.fromEntries(mapCode) as { [key: string]: string });
            }
        }
        getFullInfo();
    }, [country])

    if (!country) {
        return redirect("/");
    }

    return (
        info ? <>
            <div className="go_to_main_page"><a href="/" className="button back_button shadow"><Arrow /><span>Back</span></a></div>
            <section className="details_page">
                <img className="flag" src={info.flags.svg} alt={info.flags.alt || 'flag'} />
                <div className="details_info">
                    <div>
                        <h1 className="countryName">{info.name.common}</h1>
                        <div className="details">
                            <div className="details-col">
                                <span><em>Native Name: </em>{Object.values(info.name.nativeName).map(el => el.common).join(', ')}</span>
                                <span><em>Population: </em>{new Intl.NumberFormat().format(info.population)}</span>
                                <span><em>Region: </em>{info.region}</span>
                                <span><em>Sub region: </em>{info.subregion}</span>
                                <span><em>Capital: </em>{info.capital}</span>
                            </div>
                            <div className="details-col">
                                <span><em>Top Level Domain: </em>{info.tld?.join("; ") || "\u2014"}</span>
                                <span><em>Currencies: </em>{Object.values(info.currencies).map(el => el.name).join(', ')}</span>
                                <span><em>Languages: </em>{Object.values(info.languages).join(', ')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="borders"><em>Border countries: </em>{info.borders ? info.borders.map(el => {
                        const name = codeInfo?.[el];
                        return name && <a key={el} href={`/${name}`} className="button border_link shadow" >{name}</a>;
                    }) : 'none'}</div>
                </div>
            </section >
        </> : <></>
    )
}