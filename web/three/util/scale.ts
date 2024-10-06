import { Object3D, Object3DEventMap, Vector2, Vector3 } from "three";

export type XYPoint = [number, number];
export const XYToVec2 = (xy: XYPoint) => new Vector2(xy[0], xy[1]);
export const XYToVec3 = (xy: XYPoint) => new Vector3(xy[0], xy[1], 0);

export const resetScale = (o: Object3D<Object3DEventMap>) => o.scale.set(1, 1, o.position.z);
export const increaseScale = (o: Object3D<Object3DEventMap>, factor: number) => o.scale.set(factor, factor, o.position.z);

