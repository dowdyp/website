import { ReactNode } from "react";
import { SvgIcon } from "../../../svgs/SvgElem";

export const TitleProperty = (props: {
    icon: SVGString,
    label: ReactNode,
    schema?: string,
}) => {
    return <div className={"title-property"} itemProp={props.schema}>
        <SvgIcon src={props.icon} small/>
        {props.label}
    </div>;
    }