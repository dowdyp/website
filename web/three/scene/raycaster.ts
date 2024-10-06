import * as T from "three";
import { increaseScale, resetScale } from "../util/scale";

export const setMouseXY = (mouseV: T.Vector2, domElem: HTMLCanvasElement, e: MouseEvent) => {
    mouseV.x = (e.clientX / domElem.clientWidth) * 2 - 1;
    mouseV.y = - (e.clientY / domElem.clientHeight) * 2 + 1;
}

export const getIntersectedObjects = (
    raycaster: T.Raycaster,
    sceneChildren: T.Scene["children"],
    mouse: T.Vector2,
    camera: T.OrthographicCamera,
) => {
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(sceneChildren, true)
}

export const nodeScaleOnHover = (
    hoveredElements: Set<T.Object3D<T.Object3DEventMap>>,
    intersectedObjects: T.Intersection<T.Object3D<T.Object3DEventMap>>[]
) => {
    // set currently hovered mesh(es) to 120% scale
    const intersectSet = new Set<string>();
    intersectedObjects.map(c => {
        increaseScale(c.object, 1.2);
        intersectSet.add(c.object.uuid);
        hoveredElements.add(c.object);
    });
    hoveredElements.forEach((g) => {
        if (!intersectSet.has(g.uuid)) {
            hoveredElements.delete(g);
            resetScale(g);
        }
    })
}