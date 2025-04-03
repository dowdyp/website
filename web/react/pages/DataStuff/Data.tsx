import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { LinearRegression, Hyperparameters } from "@ml/LinearRegression";
import { Tuple } from "@util/Arb";
import { XYInput } from "./XYInput";
import { Coordinate, useMutableChartData } from "@util/useChartData";

const useDefaultChartMargins = (overrides?: {
    top?: number,
    left?: number,
    bottom?: number,
    right?: number
}) => {
    return {
        top: overrides?.top ?? 20,
        left: overrides?.left ?? 20,
        bottom: overrides?.bottom ?? 50,
        right: overrides?.right ?? 20,
    } as const
}

const defaultXExtent = [0, 10] as const satisfies Tuple<number>
const defaultYExtent = [0, 100] as const satisfies Tuple<number>

const tryGetExtent = (
    extent: Tuple<number> | Tuple<undefined>,
    fallback: Tuple<number>, 
    override?: { min?: number, max?: number }
): Tuple<number> => {
    if(!extent[0] || !extent[1]) {
        return fallback;
    } else {
        return [override?.min ?? extent[0], override?.max ?? extent[1]]
    }
}

export type Coordinates = {
    x: string,
    y: string
}

const RandomData = (props: {
    data: Tuple<number>[];
    addData: (c: Coordinate) => void;
}) => {
    const width = 500, 
        height = 250, 
        marginLeft = 20, 
        marginRight = 20, 
        marginBottom = 50, 
        marginTop = 20;

    const gx = useRef<SVGGElement>(null);
    const gy = useRef<SVGGElement>(null);
    const lobf = useRef<SVGLineElement>(null);
    const svgElem = useRef<SVGSVGElement>(null);

    const scaleXExtent = useMemo((): Tuple<number> => tryGetExtent(d3.extent(props.data, (d) => d[0]), defaultXExtent), [props.data]);
    const scaleX = useMemo(() => d3.scaleLinear(scaleXExtent, [50, width - marginRight]), [props.data])

    const scaleYExtent = useMemo((): Tuple<number> => tryGetExtent(d3.extent(props.data, (d) => d[1]), defaultYExtent, { min: 0 }), [props.data])
    const scaleY = useMemo(() => d3.scaleLinear(scaleYExtent, [height - marginBottom, marginTop]), [props.data]);

    const [hypers, setHypers] = useState<Hyperparameters>({
        nudge: 0.01,
        iterations: 1000
    })

    const lr = new LinearRegression(props.data, hypers);
    lr.train();

    const lineOfBestFit = d3.line<number>(scaleX, (d) => scaleY(lr.predict(d)));

    const calcXFromClick = (x: number) => {
        return scaleX.invert(x)
    }

    const calcYFromClick = (y: number) => {
        return scaleY.invert(y)
    }

    useEffect(() => void d3.select(gx.current!).call(d3.axisBottom(scaleX)), [gx, scaleX]);
    useEffect(() => {
        d3.select(gy.current!)
            .call(d3.axisLeft(scaleY))

        d3.select(gy.current!)
            .call(d3.axisLeft(scaleY).ticks(5))
            .call(g => g.selectAll(".tick text"))
            .attr("font-size", 20)
    }, [gy, scaleY]);

    useEffect(() => {
        d3.select(svgElem.current!).on("click", (e) => {
            const [x, y] = d3.pointer(e);
            const scaledX = calcXFromClick(x), scaledY = calcYFromClick(y);
            if(
                scaledX < scaleXExtent[0] 
                || scaledX > scaleXExtent[1]
                || scaledY < scaleYExtent[0]
                || scaledY > scaleYExtent[1]
            ) {
                return
            } else {
                props.addData([scaledX, scaledY])
            }
        })
    }, [props.data])

    useEffect(() => {
        d3.select(lobf.current!)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
    }, [props.data])

    useEffect(() => {
        d3.select(svgElem.current!).selectAll("circle").remove();
        d3.select(svgElem.current!)
            .append("g")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
        .selectAll("circle")
        .data(props.data)
        .join("circle")
            .attr("transform", ([x, y]) => `translate(${scaleX(x)}, ${scaleY(y)})`)
            .attr("r", 3)
    }, [props.data])

    return <div>
        <svg ref={svgElem} width={width} height={height} >
            <rect width={width} height={height} fill="#fff" />
            <g ref={gx} transform={`translate(0, ${height - marginBottom})`} />
            <g ref={gy} transform={`translate(${marginBottom}, 0)`} />
            <path ref={lobf} d={lineOfBestFit(scaleXExtent)!} />
        </svg>
    </div>
}

const Heading = (props: {
    text: string
}) => <h3 style={{ color: "white"}}>{props.text}</h3>

export const Data = () => {
    const [data, addData] = useMutableChartData([[0, 100], [4, 258], [11, 312], [6, 98]])

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