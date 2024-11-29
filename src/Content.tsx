import { useEffect, useState } from "react";
import Card from "./Card";
import { Convert, GeneralInfo, Region } from "./parse";
import AngleDown from "./assets/icons/angle-down.svg?react";
import AngleUp from "./assets/icons/angle-up.svg?react";


export default function Content() {
    const [info, setInfo] = useState<GeneralInfo[] | undefined>(undefined);
    const [shownList, setSShownList] = useState(false);
    const [cardList, setCardList] = useState<GeneralInfo[]>([]);
    const [regionsList, setRegionsList] = useState<(Region | 'All')[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<Region | undefined>(undefined);

    const api = 'https://restcountries.com/v3.1/';


    async function getAPI() {
        const res = await fetch(`${api}all?fields=name,flags,population,capital,region`);

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

    useEffect(() => {
        const newRList: (Region | 'All')[] = [...new Set(info?.map(c => c.region))].sort();
        newRList.unshift('All');
        setRegionsList(newRList);
    }, [info])

    useEffect(() => {
        if (!info) {
            return
        }
        if (!selectedRegion) {
            setCardList(info);
        } else {
            const newList = info.filter((country) => country.region === selectedRegion);
            setCardList(newList);
        }
    }, [selectedRegion, info])


    return (
        <main className="main">
            <div className="sort_section">
                <input type="text" />
                <div className="dropdown" onClick={() => setSShownList(!shownList)}>
                    <div className="filter_regions">
                        <span>{selectedRegion ?? 'Filter by Region'}</span>
                        {shownList ? <AngleUp /> : <AngleDown />}
                    </div>
                    {shownList && <div className="regions">
                        {regionsList.map(reg => <a id={reg} onClick={() => setSelectedRegion(reg === 'All' ? undefined : reg)}>{reg}</a>)}
                    </div>}
                </div>
            </div>
            <section className="grid_card">
                {cardList.map((el, idx) => {
                    return <Card key={idx} info={el} />
                })}
            </section>
        </main>
    )
}