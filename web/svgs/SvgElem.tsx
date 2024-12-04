export type SvgProps = {
    src: SVGString;
    small?: true
}

export const SvgIcon = (props: SvgProps) => {
    const SvgString = props.src as string;

    return <div className={`svg-icon ${props.small ? "sm" : "lg"}`}>
        <SvgString />
    </div>
}

export const Svg = (props: Omit<SvgProps, "small">) => {
    const SvgString = props.src as string;

    return <SvgString />
}