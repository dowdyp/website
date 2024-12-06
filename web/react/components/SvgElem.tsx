import { HTMLAttributeAnchorTarget } from "react";

export type SvgProps = {
    src: SVGString;
    size: "sm" | "md" | "lg"
}

export const SvgIcon = (props: SvgProps) => {
    const SvgString = props.src as string; // using @svgr embeds the svg src into the bundle, which should be changed to keep bundle size small

    return <div className={`svg-icon svg-${props.size}`}>
        <SvgString />
    </div>
}

export const Svg = (props: Omit<SvgProps, "size">) => {
    const SvgString = props.src as string;

    return <SvgString />
}

export const SvgAnchor = (props: SvgProps & {
    href: string;
    target: HTMLAttributeAnchorTarget,
    title: string,
}) => {
        const SvgString = props.src as string;

        return <a 
            title={props.title}
            href={props.href}
            target={props.target} 
            className={`svg-icon svg-${props.size}`}
        >
            <SvgString />
        </a>;
    }