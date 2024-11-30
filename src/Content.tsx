import { useEffect, useState } from "react";
import Card from "./Card";
import { Convert, GeneralInfo, Region } from "./parse";
import AngleDown from "./assets/icons/angle-down.svg?react";
import MagnifyingGlass from "./assets/icons/magnifying-glass.svg?react";
import AngleUp from "./assets/icons/angle-up.svg?react";

type Info = GeneralInfo & {
    allNames: string;
}

export default function Content() {
    const [info, setInfo] = useState<Info[] | undefined>(undefined);
    const [shownList, setSShownList] = useState(false);
    const [cardList, setCardList] = useState<Info[]>([]);
    const [regionsList, setRegionsList] = useState<(Region | 'All')[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<Region | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

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
            const dataWithNames = data.map(c => {
                const listOfNames = Object.values(c.name.nativeName).flatMap(n => [n.common, n.official]);
                listOfNames.push(c.name.common, c.name.official);
                return { ...c, allNames: listOfNames.join('\x00').toLowerCase() };
            });
            setInfo(dataWithNames);
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
        let filtered = info;
        if (debouncedSearchTerm) {
            filtered = filtered.filter(country =>
                country.allNames.includes(debouncedSearchTerm)
            );
        }
        if (selectedRegion) {
            filtered = filtered.filter((country) => country.region === selectedRegion);
        }
        setCardList(filtered);
    }, [selectedRegion, debouncedSearchTerm, info])

    useEffect(() => {
        const filterTime = setTimeout(() => {
            const trimStr = searchTerm.trim().toLowerCase();
            if (trimStr.length >= 2) {
                setDebouncedSearchTerm(trimStr);
            } else {
                setDebouncedSearchTerm('');
            }
        }, 100);
        return () => clearTimeout(filterTime);
    }, [searchTerm]);


    return (
        <main className="main">
            <div className="sort_section">
                <div className={searchTerm ? "search active" : "search"}>
                    {!searchTerm && <MagnifyingGlass className="search_icon" />}
                    <input value={searchTerm} placeholder='Search for a country...' className="inputCountry shadow" type="text" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="dropdown shadow" onClick={() => setSShownList(!shownList)}>
                    <div className="filter_regions">
                        <span>{selectedRegion ?? 'Filter by Region'}</span>
                        {shownList ? <AngleUp /> : <AngleDown />}
                    </div>
                    {shownList && <div className="regions shadow">
                        {regionsList.map(reg => <a key={reg} onClick={() => setSelectedRegion(reg === 'All' ? undefined : reg)}>{reg}</a>)}
                    </div>}
                </div>
            </div>
            {(cardList.length !== 0 || !info) ? (<section className="grid_card">
                {cardList.map((el, idx) => {
                    return <Card key={idx} info={el} />
                })}
            </section>) : (<section className="no_filters"><p>No countries that match specified filters were found :ccc</p></section>)}
        </main>
    )
}