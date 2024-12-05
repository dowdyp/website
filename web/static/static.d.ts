declare const __imgbrand: unique symbol;
type ImageSrc = string & {
    [__imgbrand]: "ImgSrc"
};

declare module "*.png" {
    const content: ImageSrc;
    export default content;
}