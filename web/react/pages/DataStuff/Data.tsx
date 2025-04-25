import { ChangeEvent, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { LinearRegression, Hyperparameters, NormalizeFn } from "@ml/LinearRegression";
import { Tuple } from "@util/Arb";
import { XYInput } from "./XYInput";
import { Coordinate, useMutableChartData } from "@util/useChartData";
import { ChartPadding, useCartesianScale } from "@util/Scale";
import { HyperSlider } from "./HyperparameterSlider";
import { ContentContainer } from "@react/components/chrome/ContentContainer";
import remToPx from "@util/remToPx";
import { ChartXAxis, ChartYAxis, ChartLine, ChartCircle } from "@react/components/data/ChartFeatures"; 
import { ModelErrorAndWarning } from "@react/components/data/ModelError";
import { DataExplorer } from "@react/components/data/DataExplorer";
import { ChartContainer } from "@react/components/data/ChartContainer";
import { Checkbox } from "@react/components/Checkbox";
import { useLinearRegression, useModelNormalization } from "@ml/hooks/useLinearRegression";

const chartPadding = {
    left: remToPx(1), 
    right: remToPx(1), 
    bottom: 30, 
    top: 10
} as const satisfies ChartPadding;

const LinearRegressionChart = (props: {
    data: Tuple<number>[];
    onClick: (c: Coordinate) => void;
    width: number;
    height: number;
    normalized: boolean
}) => {
    const [hypers, setHypers] = useState<Hyperparameters>({
        learningRate: 0.01,
        iterations: 10
    });
    const hypersDeferred = useDeferredValue(hypers);
    const [model] = useLinearRegression({
        data: props.data, 
        hyperparameters: hypersDeferred, 
        normalized: props.normalized
    });

    const {
        x,
        y,
        coordsFromEvent
    } = useModelNormalization({
        model,
        width: props.width,
        height: props.height,
        normalized: props.normalized,
        padding: chartPadding
    })

    const lineOfBestFit = d3.line<number>(x.scale, (d) => y.scale(model.predict(d)));

    const handleClick = useCallback(
        (e: React.MouseEvent<SVGElement>) => props.onClick(coordsFromEvent(e)),
        [props.onClick, coordsFromEvent]
    );

    const handleLearningRateDrag = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const float = parseFloat(e.target.value);
        setHypers(h => ({...h, learningRate: float }))
    }, [hypers])

    const handleIterationsDrag = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const int = parseInt(e.target.value);
        setHypers(h => ({ ...h, iterations: int }))
    }, [hypers])

    return <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
        <svg width={props.width} height={props.height} onClick={handleClick}>
            <ChartXAxis
                width={props.width}
                height={props.height}
                domain={x.extent}
                padding={chartPadding}
            />
            <ChartYAxis 
                width={props.width}
                height={props.height}
                domain={y.extent}
                padding={chartPadding}
            />
            {lineOfBestFit && <ChartLine path={lineOfBestFit(x.extent)} strokeColor={"red"} strokeWidth={1} />}
            {model.data.map(([a, b], i) => <ChartCircle
                key={`${a}-${b}-${i}`}
                transformX={x.scale(a)} 
                transformY={y.scale(b)} 
                fill={"steelblue"}
                radius={3} 
            />)}
        </svg>
        {<span style={{ color: "white", fontStyle: "italic", width: "100%", textAlign: "center", padding: "0.5rem" }}>
            {`y = ${model._weight.toFixed(3)}x + ${model._bias.toFixed(3)}`}
        </span>}
        <DataExplorer data={model.data} />
        <HyperSlider
            title={"Learning Rate"}
            min={0.0001}
            max={0.1} 
            step={0.0001} 
            value={hypers.learningRate} 
            onChange={handleLearningRateDrag}
         />
        <HyperSlider 
            title={"Iterations"}
            min={0}
            max={10_000}
            step={10}
            value={hypers.iterations}
            onChange={handleIterationsDrag}
        />
        <ModelErrorAndWarning model={model} /> 
    </div>
}

export const Data = () => {
    const [data, addData] = useMutableChartData([
        [0, 0],
        [1, 1],
        [2, 2], 
        [3, 3]
    ]);
    const [normalized, setNormalized] = useState(false);

    return <ContentContainer>
        <div className={"operations"}>
            <XYInput onClick={(coord) => {
                if(coord) {
                    const x = parseFloat(coord.x), y = parseFloat(coord.y);
                    addData([x, y]);
                }
            }} />
            <Checkbox text={"Normalize"} state={normalized} setState={setNormalized} />
        </div>
        <ChartContainer>
            {(width) => <LinearRegressionChart 
                data={data} 
                onClick={addData} 
                width={width} 
                height={250} 
                normalized={normalized} 
            />}
        </ChartContainer>
    </ContentContainer>
}