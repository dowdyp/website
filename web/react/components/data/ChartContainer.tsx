import { ReactElement, ReactNode, useCallback, useDeferredValue, useEffect, useRef, useState } from "react"

export const ChartContainer = (props: {
    children: (width: number) => ReactElement
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(500);
    const deferredWidth = useDeferredValue(width);

    const setWidthOnResize = useCallback<ResizeObserverCallback>((e) => {
        const containerElem = e[0];
        if(containerElem) {
            setWidth(containerElem.contentRect.width)
        }
    }, [containerRef])
    
    useEffect(() => {
        if(containerRef.current) {
            const observer = new ResizeObserver(setWidthOnResize);
            observer.observe(containerRef.current);
        
            return () => observer.disconnect();
        }
    }, [containerRef.current])

    return <div ref={containerRef} className={"chart-container"}>
        {props.children(deferredWidth)}
    </div>
}