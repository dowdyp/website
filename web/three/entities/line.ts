// drawing lines between two points
// on first click, save XYPoint
// until second click, draw line segment between current mouse position & first XYPoint
// on second click, save second point, add new permanant line to scene

import * as T from "three";
import { XYPoint, XYToVec2 } from "../util/scale";
import { circleFillColor } from "../util/colors";

const lineMaterialParameters: T.LineBasicMaterialParameters = {
    color: circleFillColor,
}
const lineMaterial = new T.LineBasicMaterial(lineMaterialParameters);

/**
 * LineGenerator maintains a reference to every line drawn in the canvas, as well as creation of new lines
 * 
 * @param scene current T.Scene
 */
type UUID = string;
class LineGenerator {
    scene: T.Scene;
    lines: Map<UUID, T.Line>;
    linesArr: T.Line[];

    createLine(xy: XYPoint) {
        const vec2 = XYToVec2(xy);
        const geometry = new T.BufferGeometry().setFromPoints([vec2, vec2])

        const newLine = new T.Line(geometry, lineMaterial);
        this.lines.set(newLine.uuid, newLine);
        this.linesArr.push(newLine);
        this.scene.add(newLine);

        return newLine;
    }

    updateLineEndpoint(line: T.Line, xy: XYPoint) {
        const position = line.geometry.getAttribute("position")
        position.setXY(1, xy[0], xy[1]);
        position.needsUpdate = true;
    }

    constructor(scene: T.Scene) {
        this.scene = scene;
        this.lines = new Map();
        this.linesArr = [];
    }
}

export default LineGenerator;