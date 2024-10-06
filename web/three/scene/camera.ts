import {  OrthographicCamera } from "three"

type WidthHeightRatio = {
    width: number,
    height: number,
    ratio: number,
}
export const getWidthHeightRatio = (): WidthHeightRatio => {
    // set a standard height, width is dependant
    const height = window.innerHeight;
    const width = window.innerWidth;
    const ratio = width / height;

    return {
        height,
        width,
        ratio
    }
}

const cameraProperties = {
    position: {
        z: 10,
    }
}
export const getOrthoCamera = () => {
    const { width, height } = getWidthHeightRatio();
    const camera = new OrthographicCamera(0, width , 0, -height)

    camera.position.z = cameraProperties.position.z;

    return camera;
}