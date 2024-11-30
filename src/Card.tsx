import { GeneralInfo } from "./parse";

export default function Card({ info }: { info: GeneralInfo }) {
    return (
        <article className="card shadow">
            <img src={info.flags.png} alt={info.flags.alt} />
            <div className="country_info">
                <h1 className="country_name">{info.name.common}</h1>
                <div>
                    <p><span>Population: </span>
                        {new Intl.NumberFormat().format(info.population)}
                    </p>
                    <p><span>Region: </span>{info.region}</p>
                    <p><span>Capital: </span>{info.capital}</p>
                </div>
            </div>
        </article>
    )
}