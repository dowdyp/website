import { ChangeEvent, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { LinearRegression, Hyperparameters, LRTrainError } from "@ml/LinearRegression";
import { Tuple } from "@util/Arb";
import { XYInput } from "./XYInput";
import { Coordinate, useMutableChartData } from "@util/useChartData";
import { useCartesianScale } from "@util/Scale";
import { HyperSlider } from "./HyperparameterSlider";
import { ContentContainer } from "@react/components/chrome/ContentContainer";
import remToPx from "@util/remToPx";

export type Coordinates = {
    x: string,
    y: string
}

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
}) => {
    const { height, width, data } = props;
    const [
        { scaleXExtent, scaleX },
        { scaleYExtent, scaleY }
    ] = useCartesianScale(data, width, height, chartPadding);

    const [hypers, setHypers] = useState<Hyperparameters>({
        learningRate: 0.01,
        iterations: 2
    });
    const hypersDeferred = useDeferredValue(hypers);

    const model = useMemo(() => new LinearRegression(data, hypersDeferred).train(), [data, hypersDeferred]);
    console.log(model._weight, model._bias)
    const lineOfBestFit = model ? d3.line<number>(scaleX, (d) => scaleY(model.predict(d))) : undefined;

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

    return <div style={{display: "flex", flexDirection: "column"}} >
        <svg width={width} height={height} onClick={handleClick}>
            {/* <rect width={width} height={height} fill="#fff"/> */}
            <ChartXAxis
                width={width}
                height={height}
                domain={scaleXExtent}
                padding={chartPadding}
            />
            <ChartYAxis 
                width={width}
                height={height}
                domain={scaleYExtent}
                padding={chartPadding}
            />
            {lineOfBestFit && <ChartLine path={lineOfBestFit(scaleXExtent)} strokeColor={"red"} strokeWidth={1} />}
            {data.map(([x, y], i) => <ChartCircle
                key={`${x}-${y}-${i}`}
                transformX={scaleX(x)} 
                transformY={scaleY(y)} 
                fill={"steelblue"}
                radius={3} 
            />)}
        </svg>
        {model && <span style={{color: "white", fontStyle: "italic", width: "100%", textAlign: "center", padding: "0.5rem"}}>
            {`y = ${model._weight.toFixed(2)}x + ${model._bias.toFixed(2)}`}
        </span>}
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
            max={10}
            step={1}
            value={hypers.iterations}
            onChange={handleIterationsDrag}
        />
        {model?.hasError && <div className="train-err">{model.errorMessage}</div>}
    </div>
}

const ChartLine = (props: {
    path: string | null,
    strokeColor: string,
    strokeWidth: number,
}) => <path d={props.path ?? ""} stroke={props.strokeColor} strokeWidth={props.strokeWidth} />

const ChartCircle = (props: {
    transformX: number,
    transformY: number,
    radius: number,
    fill: string,
    strokeColor?: string,
    strokeWidth?: number,
}) => <circle 
    fill={props.fill} 
    transform={`translate(${props.transformX}, ${props.transformY})`} 
    stroke={props.strokeColor} 
    strokeWidth={props.strokeWidth}
    r={props.radius}
/>

type ChartPadding = {
    top: number,
    right: number,
    bottom: number,
    left: number,
}
type ChartMeta = {
    width: number,
    height: number,
    domain: Tuple<number>, // Cartesian minimum and maximum
    padding: ChartPadding,
}

const ChartXAxis = (props: ChartMeta) => {
    const { width, height, padding, domain } = props;

    const range = [chartPadding.left, width - chartPadding.right]
    const [axisStart, axisEnd] = range;
    
    const ticks = useMemo(() => {
        const scale = d3.scaleLinear().domain(domain).range(range);
        const delta = axisEnd - axisStart;
        const pxPerTick = 50;
        const numTicks = Math.max(1, Math.floor(delta / pxPerTick));
    
        return scale.ticks(numTicks).map((value) => ({
            v: value,
            offset: scale(value),
        }))
    }, [range.join("_"), domain.join("_")])

    return <g transform={`translate(0, ${height - padding.bottom})`}>
        <path d={["M", axisStart, 1, "v", -1, "H", axisEnd, "v", 1].join(" ")} />
        {ticks.map(({ v, offset: xOffset}) => <g key={v} transform={`translate(${xOffset}, 0)`}>
            <line y2={6} stroke={"#ffffff"} />
            <text key={v} style={{
                fontSize: "10px",
                textAnchor: "middle",
                transform: `translateY(20px)`,
                fill: "#ffffff",
                pointerEvents: "none",
            }}>
                {v}
            </text>
        </g>)}
    </g>
}

const ChartYAxis = (props: ChartMeta) => {
    const { width, height, padding, domain } = props;
    const range = [height - padding.bottom - padding.top, padding.top];
    const [axisStart, axisEnd] = range;

    const ticks = useMemo(() => {
        const scale = d3.scaleLinear().domain(domain).range(range);
        const delta = Math.abs(axisEnd - axisStart);
        const pxPerTick = 30;
        const numTicks = Math.max(1, Math.floor(delta / pxPerTick));
    
        return scale.ticks(numTicks).map((value) => ({
            v: value,
            offset: scale(value),
        }))
    }, [range.join("_"), domain.join("_")])

    return <g transform={`translate(${padding.left}, ${padding.top})`}>
        {ticks.map(({ v, offset}) => <g key={v} transform={`translate(0, ${offset})`}>
            <line x2={width - padding.left - padding.right} stroke={"gray"} />
            {v !== 0 && <text key={v} style={{
                fontSize: "10px",
                textAnchor: "start",
                transform: `translate(2px, 10px)`,
                pointerEvents: "none",
                fill: "#ffffff"
            }}>
                {v}
            </text>}
        </g>)}
    </g>
}


const Heading = (props: {
    text: string
}) => <h3 style={{ color: "white"}}>{props.text}</h3>

export const Data = () => {
    const [data, addData] = useMutableChartData([
        [0, 0],
        [1, 1],
        [2, 2], 
        [3, 3],
        // [100, 3000]
    ])

    const containerRef = useRef<HTMLDivElement>(null);
    const [chartWidth, setChartWidth] = useState(0);

    useEffect(() => {
        if(containerRef.current) {
            setChartWidth(containerRef.current.clientWidth)
        }
    }, [containerRef])

    return <ContentContainer>
        <XYInput onClick={(coord) => {
            if(coord) {
                const x = parseFloat(coord.x), y = parseFloat(coord.y);
                addData([x, y]);
            }
        }} />
        <Heading text={"random data"} />
        {/* <div style={{width: "600px"}}>this is where the chart is</div> */}
        <div ref={containerRef} className={"chart-container"}>
            <LinearRegressionChart data={data} onClick={addData} width={chartWidth} height={250} />
        </div>
    </ContentContainer>
}