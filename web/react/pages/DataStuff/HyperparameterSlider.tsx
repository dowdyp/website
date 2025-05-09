import { ChangeEvent } from "react"

export const HyperSlider = (props: {
    title: string,
    min: number,
    max: number,
    step: number,
    value: number,
    onChange: (n: ChangeEvent<HTMLInputElement>) => void,
}) => {
    return <div className="hyper-slider">
        <div className="hyper-slider__title__value">
            <label htmlFor={props.title}>{props.title}</label>
            <span>{props.value}</span>
        </div>
        <input 
            name={props.title} 
            type={"range"} 
            min={props.min} 
            max={props.max} 
            step={props.step} 
            value={props.value} 
            onChange={props.onChange}
        />
    </div>
}