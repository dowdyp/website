import { ChangeEvent, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { LinearRegression, Hyperparameters, NormalizeFn } from "@ml/LinearRegression";
import { Tuple } from "@util/Arb";
import { XYInput } from "./XYInput";
import { Coordinate, useMutableChartData } from "@util/useChartData";
import { useCartesianScale } from "@util/Scale";
import { HyperSlider } from "./HyperparameterSlider";
import { ContentContainer } from "@react/components/chrome/ContentContainer";
import remToPx from "@util/remToPx";
import { ChartXAxis, ChartYAxis, ChartLine, ChartCircle } from "@react/components/data/ChartFeatures"; 
import { ModelErrorAndWarning } from "@react/components/data/ModelError";
import { DataExplorer } from "@react/components/data/DataExplorer";
import { ChartContainer } from "@react/components/data/ChartContainer";
import { Checkbox } from "@react/components/Checkbox";

const chartPadding = {
    left: remToPx(1), 
    right: remToPx(1), 
    bottom: 30, 
    top: 10
} as const

const LinearRegressionChart = (props: {
    data: Tuple<number>[];
    onClick: (c: Coordinate) => void;
    width: number;
    height: number;
    normalize?: NormalizeFn
}) => {
    const [hypers, setHypers] = useState<Hyperparameters>({
        learningRate: 0.01,
        iterations: 10
    });
    const hypersDeferred = useDeferredValue(hypers);
    const model = useMemo(
        () => new LinearRegression(props.data, hypersDeferred, props.normalize).train(), 
        [props.data, hypersDeferred, props.normalize]
    );
    const [
        { scaleXExtent, scaleX },
        { scaleYExtent, scaleY }
    ] = useCartesianScale(model.data, props.width, props.height, chartPadding);

    const lineOfBestFit = d3.line<number>(scaleX, (d) => scaleY(model.predict(d)));

    const handleClick = useCallback((e: React.MouseEvent<SVGElement>) => props.onClick([
        scaleX.invert(e.nativeEvent.offsetX),
        scaleY.invert(e.nativeEvent.offsetY)
    ]), [props.onClick, scaleX, scaleY])

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
                domain={scaleXExtent}
                padding={chartPadding}
            />
            <ChartYAxis 
                width={props.width}
                height={props.height}
                domain={scaleYExtent}
                padding={chartPadding}
            />
            {lineOfBestFit && <ChartLine path={lineOfBestFit(scaleXExtent)} strokeColor={"red"} strokeWidth={1} />}
            {model.data.map(([x, y], i) => <ChartCircle
                key={`${x}-${y}-${i}`}
                transformX={scaleX(x)} 
                transformY={scaleY(y)} 
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
            max={0.01} 
            step={0.0001} 
            value={hypers.learningRate} 
            onChange={handleLearningRateDrag}
         />
        <HyperSlider 
            title={"Iterations"}
            min={0}
            max={1000}
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
    const [normalize, setNormalize] = useState(false);

    return <ContentContainer>
        <div className={"operations"}>
            <XYInput onClick={(coord) => {
                if(coord) {
                    const x = parseFloat(coord.x), y = parseFloat(coord.y);
                    addData([x, y]);
                }
            }} />
            <Checkbox text={"Normalize"} state={normalize} setState={setNormalize} />
        </div>
        <ChartContainer>
            {(width) => <LinearRegressionChart 
                data={data} 
                onClick={addData} 
                width={width} 
                height={250} 
                normalize={normalize ? "unit" : "none"} 
            />}
        </ChartContainer>
    </ContentContainer>
}