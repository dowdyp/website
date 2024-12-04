declare const __brand: unique symbol;
type SVGString = string & {
    [__brand]: "SVGString"
}

declare module "*.svg" {
    const content: SVGString;
    export default content;
}