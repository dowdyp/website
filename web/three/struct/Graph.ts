import CircleGenerator from "../entities/circle";
import LineGenerator from "../entities/line";
import * as T from "three";
import { XYPoint } from "../util/scale";
import { vec2FromMouseEvent, xyFromMouseEvent } from "../util/mousePosition";
import { vec3To2 } from "../util/vector";

type AdjacencyMap = Map<T.Object3D, Set<T.Object3D>>;

const addNewNode = (a: AdjacencyMap, c: T.Mesh) => a.set(c, new Set());
const updateNodeAdjacency = (a: AdjacencyMap, v: T.Object3D, k?: T.Object3D) => {
    if(k) {
        const s = a.get(k) ?? new Set();
        s.add(v);
        a.set(k, s);
    }
}

class UndirectedGraph {
    adjacency: AdjacencyMap = new Map();
    circleGenerator: CircleGenerator;
    lineGenerator: LineGenerator;

    scene: T.Scene;
    raycaster: T.Raycaster;
    

    getAdjacentNodes(node: T.Object3D) {
        return this.adjacency.get(node) ?? new Set();
    }

    setAdjacentNode(node: T.Object3D, newNode: T.Object3D) {
        const originNodes = this.adjacency.get(node)
        if(originNodes) {
            this.adjacency.set(node, originNodes.add(newNode));
        } else {
            this.adjacency.set(node, new Set<T.Object3D>([newNode]))
        }
    }

    removeAdjacentNode(origin: T.Object3D, node: T.Object3D) {
        const originNodes = this.adjacency.get(origin);
        if(originNodes) {
            return this.adjacency.delete(node);
        } else {
            return false;
        }
    }


    handleClick(e: MouseEvent) {
        const mousePosition = vec2FromMouseEvent(e);

        // if no mesh is intersected, it can be assumed the user wants to create a new node
        if(!this.circleGenerator.hasIntersections()) {
            if(this.lineGenerator.isDrawing()){
                this.lineGenerator.updateSegmented(mousePosition);
            } else {
                const c = this.circleGenerator.createCircleV(mousePosition);   
                addNewNode(this.adjacency, c);
            }
        } else { // cursor intersects with existing nodes
            const intersection = this.circleGenerator.intersectedCircles[0];
            const nodePosition = vec3To2(intersection.object.position);
            if(this.lineGenerator.isDrawing()) {
                this.lineGenerator.finalizeSegmented(intersection.object);
                // updateNodeAdjacency(
                //     this.adjacency, 
                //     intersection.object,
                //     this.lineGenerator.currentLineStartNode, 
                // );
            } else {
                this.lineGenerator.createSegmented(nodePosition, intersection.object);
            }
        }
    }

    handleMouseMove(e: MouseEvent) {
        const mousePosition = vec2FromMouseEvent(e);

        this.lineGenerator.handleMouseMove(mousePosition);
        this.circleGenerator.handleMouseMove(this.raycaster);
    }

    constructor(scene: T.Scene, raycaster: T.Raycaster) {
        this.circleGenerator = new CircleGenerator(scene);
        this.lineGenerator = new LineGenerator(scene);
        this.scene = scene;
        this.raycaster = raycaster;
    }
}

export default UndirectedGraph;