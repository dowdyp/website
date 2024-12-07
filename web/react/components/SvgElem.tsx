import React, { HTMLAttributeAnchorTarget } from "react";

export type SvgProps = {
    src: SVGString;
    size: "sm" | "md" | "lg"
}

export const SvgIcon = (props: SvgProps) => (
    <div className={`svg-icon svg-${props.size}`}>
        {React.createElement(props.src, props)}
    </div>
)
export const Svg = (props: Omit<SvgProps, "size"> & {
    width?: number,
    height?: number,
}) => React.createElement(props.src, props);

export const SvgAnchor = (props: SvgProps & {
    href: string;
    target: HTMLAttributeAnchorTarget,
    title: string,
}) => <a
    title={props.title}
    aria-labelledby={props.title}
    href={props.href}
    target={props.target}
    className={`svg-icon svg-${props.size}`}
>
    {React.createElement(props.src, props)}
</a>