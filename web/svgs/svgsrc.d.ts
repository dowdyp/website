type SvgElement = React.FunctionComponent<React.SVGProps<SVGSVGElement>>

declare module "*.svg" {
    const ReactComponent: SvgElement
    export default ReactComponent;
}