import { Tuple } from "@util/Arb"
import { useState } from "react";

export const DataExplorer = (props: {
    data: Tuple<number>[]
}) => {
    const [expanded, setExpanded] = useState(false);
    return <div className={`data-explorer ${expanded ? "expanded" : ""}`} onClick={() => setExpanded(c => !c)}>
        <span className={`data-explorer__list ${expanded ? "" : "clamp-1"}`}>
            {props.data.map(([x, y], i) => {
                const xFmt = x.toFixed(2);
                const yFmt = y.toFixed(2);
                return <p key={`${x}-${yFmt}-${i}`} className="data-explorer__list__item">({xFmt}, {yFmt})</p>
            })}
        </span>
    </div>
}


