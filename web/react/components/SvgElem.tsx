import React, { HTMLAttributeAnchorTarget } from "react";

export type SvgProps = {
    src: SvgElement;
    size: "xs" | "sm" | "md" | "lg"
}

export const SvgIcon = (props: SvgProps) => (
    <div className={`svg-icon svg-${props.size}`}>
        <props.src />
    </div>
)

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
    <props.src />
</a>