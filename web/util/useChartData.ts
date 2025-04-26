import { useCallback, useState } from "react";
import { Tuple } from "./Arb";

export type Coordinates = Tuple<number>

export const useMutableChartData = (startingPoints: Coordinates[] = []) => {
    const [points, setPoints] = useState<Tuple<number>[]>(startingPoints);

    const addPoint = useCallback((newPoint: Coordinates) => setPoints((a) => [...a, newPoint]), [points]);

    return [points, addPoint] as const
}