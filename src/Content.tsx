import { useEffect, useState } from "react";
import Card from "./Card";
import { Convert, GeneralInfo } from "./parse";


export default function Content() {
    const [info, setInfo] = useState<GeneralInfo[] | undefined>(undefined);
    const api = 'https://restcountries.com/v3.1/';

    async function getAPI() {
        const res = await fetch(`${api}all?fields=name,flags,population,capital,region`);
        // https://restcountries.com/v3.1/{service}?fields={field},{field},{field}
        // https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies

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
        <main className="main">
            <div className="sort_section">
                <input type="text" />
                <div className="filter_list"></div>
            </div>
            <section className="grid_card">
                {info?.map((el, idx) => {
                    return <Card key={idx} info={el} />
                })}
            </section>
        </main>
    )
}