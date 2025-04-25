import { useMemo } from "react";
import { Tuple } from "./Arb";
import { extent, scaleLinear } from "d3";
import { isUndefined } from "./Undefined";

const defaultXExtent = [0, 10] as const satisfies Tuple<number>
const defaultYExtent = [0, 100] as const satisfies Tuple<number>

const tryGetExtent = (
    extent: Tuple<number> | Tuple<undefined>,
    fallback: Tuple<number>, 
    override?: { min?: number, max?: number }
): Tuple<number> => {
    return (!isUndefined(extent[0]) && !isUndefined(extent[1])) ? [override?.min ?? extent[0]!, override?.max ?? extent[1]!] : fallback
}

export const getXFromTuple = (t: Tuple<number>) => t[0];
export const getYFromTuple = (t: Tuple<number>) => t[1];

const getGetter = (a: Axes) => {
    switch(a) {
        case "x": return getXFromTuple
        case "y": return getYFromTuple
    }
}

const getDefaultExtent = (a: Axes) => {
    switch(a) {
        case "x": return defaultXExtent
        case "y": return defaultYExtent
    }
}

export const useCartesianScale = (data: Tuple<number>[], width: number, height: number, padding: ChartPadding) => {
    const xRange = [padding.left, width - padding.right];
    const yRange = [height - padding.bottom, padding.top];

    const scaleXExtent: Extent = tryGetExtent(extent(data, getXFromTuple), getDefaultExtent("x"))
    const scaleYExtent: Extent = tryGetExtent(extent(data, getYFromTuple), getDefaultExtent("y"))

    const scaleX = scaleLinear(scaleXExtent, xRange);
    const scaleY = scaleLinear(scaleYExtent, yRange)

    return [{
            scale: scaleX,
            extent: scaleXExtent
        }, {
            scale: scaleY,
            extent: scaleYExtent
        }] as const
}

type Extent = Tuple<number>
type Axes = "x" | "y";
export type ChartPadding = {
    top: number,
    right: number,
    bottom: number,
    left: number,
}