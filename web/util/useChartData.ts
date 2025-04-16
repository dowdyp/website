import { useCallback, useState } from "react";
import { Tuple } from "./Arb";

export type Coordinate = Tuple<number>

export const useMutableChartData = (startingPoints: Coordinate[] = []) => {
    const [points, setPoints] = useState<Tuple<number>[]>(startingPoints);

    const addPoint = useCallback((newPoint: Coordinate) => setPoints((a) => [...a, newPoint]), [points]);

    return [points, addPoint] as const
}