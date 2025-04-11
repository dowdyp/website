import { useMemo, useState } from "react";
import * as d3 from "d3";
import { LinearRegression, Hyperparameters } from "@ml/LinearRegression";
import { Tuple } from "@util/Arb";
import { XYInput } from "./XYInput";
import { Coordinate, useMutableChartData } from "@util/useChartData";
import { useCartesianScale } from "@util/Scale";

export type Coordinates = {
    x: string,
    y: string
}

const chartPadding = {
    left: 20, 
    right: 20, 
    bottom: 30, 
    top: 10
} as const

const RandomData = (props: {
    data: Tuple<number>[];
    addData: (c: Coordinate) => void;

}) => {
    const width = 500, height = 250;
    const [scaleXExtent, scaleX] = useCartesianScale(props.data, [chartPadding.left, width - chartPadding.right], "x")
    const [scaleYExtent, scaleY] = useCartesianScale(props.data, [height - chartPadding.bottom, chartPadding.top], "y");

    const [hypers, setHypers] = useState<Hyperparameters>({
        learningRate: 0.0001,
        iterations: 1000
    })

    const lr = useMemo(() => new LinearRegression(props.data, hypers).train(), [props.data]);

    const lineOfBestFit = d3.line<number>(scaleX, (d) => scaleY(lr.predict(d)));

    return <div style={{display: "flex", flexDirection: "column"}}>
        <svg width={width} height={height} >
            <rect width={width} height={height} fill="#fff" />
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
            <ChartLine path={lineOfBestFit(scaleXExtent)} strokeColor={"red"} strokeWidth={1} />
            {props.data.map(([x, y], i) => <ChartCircle
                key={`${x}-${y}-${i}`}
                transformX={scaleX(x)} 
                transformY={scaleY(y)} 
                fill={"steelblue"}
                radius={3} 
            />)}
        </svg>
        <span style={{color: "white", fontStyle: "italic"}}>
            {`y = ${lr._weight.toFixed(2)}x + ${lr._bias.toFixed(2)}`}
        </span>
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
            <line y2={6} stroke={"currentColor"} />
            <text key={v} style={{
                fontSize: "10px",
                textAnchor: "middle",
                transform: `translateY(20px)`
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
        console.log(delta, "/", pxPerTick, "=", delta / pxPerTick)
    
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
                transform: `translate(2px, 10px)`
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
    const [data, addData] = useMutableChartData([[0, 0], [50, 1100], [100, 2000]])

    return <div>
        <XYInput onClick={(coord) => {
            if(coord) {
                const x = parseFloat(coord.x), y = parseFloat(coord.y);
                addData([x, y]);
            }
        }} />
        <Heading text={"random data"} />
        <RandomData data={data} addData={addData}/>
        
    </div>
}