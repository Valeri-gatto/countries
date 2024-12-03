import LoadingIcon from "./assets/loading.svg?react";

export default function Loading() {
    return (<div className="loading_container">
        <h2>Loading</h2>
        <div className="loading_icon"><LoadingIcon /></div>
    </div>)
}