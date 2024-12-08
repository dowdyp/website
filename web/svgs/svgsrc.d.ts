type SvgElement = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string}>

declare module "*.svg" {
    const ReactComponent: SvgElement
    export default ReactComponent;
}