import { Vector2 } from "three";
import { XYPoint } from "./scale";

export const xyFromMouseEvent = (e: MouseEvent): XYPoint => [e.clientX, -e.clientY];
export const vec2FromMouseEvent = (e: MouseEvent): Vector2 => new Vector2(e.clientX, -e.clientY);