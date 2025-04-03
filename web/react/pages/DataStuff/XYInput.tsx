import { Lazy } from "@util/Arb";
import { ChangeEvent, MouseEventHandler, useCallback, useState } from "react";

type Coordinates = {
    x: string,
    y: string
}

const coordinatesPartial = {
    x: "",
    y: ""
} satisfies Coordinates
const validNumber = /^-?(\d+)?\.?(\d+)?$/;
export const XYInput = (props: {
    onClick: (coords?: Coordinates) => void;
}) => {
    const [coords, setCoords] = useState<Coordinates>(coordinatesPartial);
    const setX = useCallback((s: string) => {
        const isValid = validNumber.test(s);
        if(isValid) {
            setCoords(c => ({ ...c, x: s }))
        }
    }, [])

    const setY = useCallback((s: string) => {
        const isValid = validNumber.test(s);
        if(isValid) {
            setCoords(c => ({ ...c, y: s }))
        }
    }, [])

    const onChange = (setFn: (s: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFn(e.target.value)
    }

    const handleClick = () => {
        const newCoordinate = (coords.x && coords.y) ? coords : undefined;
        props.onClick(newCoordinate)
    }

    return (<>
        <input placeholder={"X"} value={coords?.x} onChange={onChange(setX)}/>
        <input placeholder={"Y"} value={coords?.y} onChange={onChange(setY)}/>
        <button onClick={handleClick}>add point</button>
    </>)
}