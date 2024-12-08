import { ReactNode } from "react";
import { SvgIcon } from "@react/components/SvgElem";

export const TitleProperty = (props: {
    icon: SvgElement,
    label: ReactNode,
    schema?: string,
}) => {
    return <div className={"title-property"} itemProp={props.schema}>
        <SvgIcon src={props.icon} size="sm"/>
        {props.label}
    </div>;
    }