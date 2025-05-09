import { Tuple } from "@util/Arb"
import { useMemo } from "react"
import { scaleLinear } from "d3"

export const ChartLine = (props: {
    path: string | null,
    strokeColor: string,
    strokeWidth: number,
}) => <path d={props.path ?? ""} stroke={props.strokeColor} strokeWidth={props.strokeWidth} />

export const ChartCircle = (props: {
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

export const ChartXAxis = (props: ChartMeta) => {
    const { width, height, padding, domain } = props;

    const range = [padding.left, width - padding.right]
    const [axisStart, axisEnd] = range;
    
    const ticks = useMemo(() => {
        const scale = scaleLinear().domain(domain).range(range);
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

export const ChartYAxis = (props: ChartMeta) => {
    const { width, height, padding, domain } = props;
    const range = [height - padding.bottom - padding.top, padding.top];
    const [axisStart, axisEnd] = range;

    const ticks = useMemo(() => {
        const scale = scaleLinear().domain(domain).range(range);
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