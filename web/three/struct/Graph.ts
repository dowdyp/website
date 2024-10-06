import CircleGenerator from "../entities/circle";
import LineGenerator from "../entities/line";
import * as T from "three";
import { XYPoint } from "../util/scale";
import { vec2FromMouseEvent, xyFromMouseEvent } from "../util/mousePosition";

type AdjacencyMap = Map<string, Set<string>>;

const addNewNode = (a: AdjacencyMap, c: T.Mesh) => a.set(c.uuid, new Set());

class UndirectedGraph {
    adjacency: AdjacencyMap = new Map();
    circleGenerator: CircleGenerator;
    lineGenerator: LineGenerator;
    scene: T.Scene;
    isDrawing = false;

    getAdjacentNodes(nodeUuid: string) {
        return this.adjacency.get(nodeUuid) ?? new Set();
    }

    setAdjacentNode(originUuid: string, newNode: string) {
        const originNodes = this.adjacency.get(originUuid)
        if(originNodes) {
            this.adjacency.set(originUuid, originNodes.add(newNode));
        } else {
            this.adjacency.set(originUuid, new Set(newNode))
        }
    }

    removeAdjacentNode(originUuid: string, node: string) {
        const originNodes = this.adjacency.get(originUuid);
        if(originNodes) {
            return this.adjacency.delete(node);
        } else {
            return false;
        }
    }


    handleClick(e: MouseEvent, i: T.Intersection<T.Object3D<T.Object3DEventMap>>[]) {
        const mousePosition = vec2FromMouseEvent(e);

        // if no mesh is intersected, it can be assumed the user wants to create a new node
        if(i.length === 0) {
            const c = this.circleGenerator.createCircleV(mousePosition);
            addNewNode(this.adjacency, c);
            return;
        }
    }

    handleMouseMove(i: T.Intersection<T.Object3D<T.Object3DEventMap>>[]) {

    }

    constructor(scene: T.Scene) {
        this.circleGenerator = new CircleGenerator(scene);
        this.lineGenerator = new LineGenerator(scene);
        this.scene = scene;
    }
}

export default UndirectedGraph;