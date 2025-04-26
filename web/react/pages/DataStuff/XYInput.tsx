import { SvgIcon } from "@react/components/SvgElem";
import { ChangeEvent, useCallback, useState } from "react";
import plus from "@svgs/plus.svg";
import { isUndefined } from "@util/Undefined";

type Coordinates = {
    x: number,
    y: number
}

const coordinatesPartial = {
} satisfies Partial<Coordinates>
const validNumber = /^-?(\d+)?\.?(\d+)?$/; // keeping this here for fun
const trySetNumber = (cb: (n: number) => void) => (s: string) => {
    const intermediate = Number(s);
    const allValid = validNumber.test(s)
        && isNaN(intermediate)
        && isFinite(intermediate)
    if(allValid) cb(intermediate);
}

export const XYInput = (props: {
    onClick: (coords?: Coordinates) => void;
}) => {
    const [coords, setCoords] = useState<Partial<Coordinates>>(coordinatesPartial);
    const [hasError, setHasError] = useState({
        x: false,
        y: false,
    });
    const setX = trySetNumber((n) => setCoords(c => ({ ...c, x: n })))
    const setY = trySetNumber((n) => setCoords(c => ({ ...c, y: n })))

    const onChange = (setFn: (s: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFn(e.target.value)
    }

    const handleClick = () => {
        const newCoordinate: Coordinates | undefined = (!isUndefined(coords.x) && !isUndefined(coords.y)) ? coords as Coordinates : undefined;
        props.onClick(newCoordinate)
    }

    return (<div className="xy-input">
        <input className={hasError.x ? "error" : ""} placeholder={"X"} value={coords?.x} onChange={onChange(setX)}/>
        <input className={hasError.y ? "error" : ""} placeholder={"Y"} value={coords?.y} onChange={onChange(setY)}/>
        <button onClick={handleClick}><SvgIcon src={plus} size="xs"/></button>
    </div>)
}