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
            aria-label={props.text} 
            onChange={() => props.setState(s => !s)}
            disabled={props.disabled}
        />
        <span>{props.text}</span>
    </label>
}