// drawing lines between two points
// on first click, save XYPoint
// until second click, draw line segment between current mouse position & first XYPoint
// on second click, save second point, add new permanant line to scene

import * as T from "three";
import { XYPoint, XYToVec2 } from "../util/scale";
import { circleFillColor } from "../util/colors";
import { vec3To2 } from "../util/vector";

const lineMaterialParameters: T.LineBasicMaterialParameters = {
    color: circleFillColor,
}
const lineMaterial = new T.LineBasicMaterial(lineMaterialParameters);

type SegmentWithNode = {
    segment: T.Line;
    node?: T.Object3D;
}
const toSegmentWithNode = (l: T.Line, n?: T.Object3D): SegmentWithNode => ({
    segment: l,
    node: n
})
/**
 * LineGenerator maintains a reference to every line drawn in the canvas, as well as creation of new lines
 * 
 * @param scene current T.Scene
 */
type UUID = string;
class LineGenerator {
    scene: T.Scene;
    lines: Map<UUID, T.Line> = new Map();

    segmentMap: Map<T.Vector2, T.Line> = new Map();
    currentLine: SegmentWithNode[] = [];

    isDrawing() {
        return this.currentLine.length > 0;
    }

    handleMouseMove(mousePosition: T.Vector2) {
        const currLineEndpoint = this.currentLine?.[this.currentLine.length - 1];
        if(currLineEndpoint) {
            this.updateLineEndpoint(currLineEndpoint.segment, mousePosition)
        }
    }

    createLine(sp: T.Vector2, ep: T.Vector2) {
        const geometry = new T.BufferGeometry().setFromPoints([sp, ep])

        const newLine = new T.Line(geometry, lineMaterial);
        this.lines.set(newLine.uuid, newLine);
        this.scene.add(newLine);

        return newLine;
    }

    createSegmented(sp: T.Vector2, node: T.Object3D) {
        this.currentLine.push(toSegmentWithNode(this.createLine(sp, sp), node));
    }

    updateSegmented(ep: T.Vector2) {
        this.currentLine.push(toSegmentWithNode(this.createLine(ep, ep)))
    }

    finalizeSegmented(node: T.Object3D) {
        const currLineEndpoint = this.currentLine?.[this.currentLine.length - 1];
        if(currLineEndpoint) {
            this.updateLineEndpoint(currLineEndpoint.segment, vec3To2(node.position));
        }
        this.currentLine = [];
    }

    updateLineEndpoint(line: T.Line, v: T.Vector2) {
        const position = line.geometry.getAttribute("position")
        position.setXY(1, v.x, v.y);
        position.needsUpdate = true;
    }

    constructor(scene: T.Scene) {
        this.scene = scene;
    }
}

export default LineGenerator;