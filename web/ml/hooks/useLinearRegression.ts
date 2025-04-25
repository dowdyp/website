import { Hyperparameters, LinearRegression, NormalizeFn } from "@ml/LinearRegression"
import { Tuple } from "@util/Arb";
import { ChartPadding, useCartesianScale } from "@util/Scale";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useLinearRegression = (params: {
    data: Tuple<number>[],
    hyperparameters: Hyperparameters,
    normalized: boolean
}) => {
    const model = useMemo(
        () => new LinearRegression(params.data, params.hyperparameters, params.normalized ? "unit" : "none").train(), 
        [params.data, params.hyperparameters, params.normalized]
    );

    return [model] as const
}

export const useModelNormalization = (params: {
    model: LinearRegression,
    width: number,
    height: number,
    normalized: boolean,
    padding: ChartPadding
}) => {
    const [x, y] = useCartesianScale(params.model.providedData, params.width, params.height, params.padding);
    const [nx, ny] = useCartesianScale(params.model.data, params.width, params.height, params.padding);

    const coordsFromEvent = useCallback((e: React.MouseEvent<SVGElement>): Tuple<number> => [
        x.scale.invert(e.nativeEvent.offsetX),
        y.scale.invert(e.nativeEvent.offsetY),
    ], [x, y]);

    return {
        coordsFromEvent,
        x: {
            scale: params.normalized ? nx.scale : x.scale,
            extent: params.normalized ? nx.extent: x.extent,
        },
        y: {
            scale: params.normalized ? ny.scale : y.scale,
            extent: params.normalized ? ny.extent: y.extent,
        }
    } as const
}


