import { Dispatch, SetStateAction } from "react"

export const Checkbox = (props: {
    text: string,
    state: boolean,
    setState: Dispatch<SetStateAction<boolean>>,
    disabled?: boolean,
}) => {
    return <label className="form-checkbox">
        <input 
            type={"checkbox"} 
            name={props.text} 
            checked={props.state}
            onChange={() => props.setState(s => !s)}
            aria-label={props.text}
            disabled={props.disabled}
        />
        <span>{props.text}</span>
    </label>
}