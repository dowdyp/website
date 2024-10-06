import * as T from "three";
import { XYPoint } from "../util/scale";
import { circleZIdx } from "../util/zindex";

const circleProperties = {
    radius: 12,
    numPolygons: 32,
};

const circleMaterial: T.MeshBasicMaterialParameters = {
    color: new T.Color("#B9B7BD"),
}

type UUID = string;
class CircleGenerator {
    scene: T.Scene;
    circleMap: Map<UUID, T.Mesh>;
    circleArr: T.Mesh[];

    createCircle(xy: XYPoint) {
        const geometry = new T.CircleGeometry(
            circleProperties.radius, 
            circleProperties.numPolygons
        );
        const material = new T.MeshBasicMaterial(circleMaterial);

        const newCircle = new T.Mesh(geometry, material);
        newCircle.position.set(xy[0], xy[1], circleZIdx)
        this.circleMap.set(newCircle.uuid, newCircle);
        this.circleArr.push(newCircle);
        this.scene.add(newCircle);
        return newCircle;
    }
    
    createCircleV(xy: T.Vector2) {
        const geometry = new T.CircleGeometry(
            circleProperties.radius, 
            circleProperties.numPolygons
        );
        const material = new T.MeshBasicMaterial(circleMaterial);

        const newCircle = new T.Mesh(geometry, material);
        newCircle.position.set(xy.x, xy.y, circleZIdx)
        this.circleMap.set(newCircle.uuid, newCircle);
        this.circleArr.push(newCircle);
        this.scene.add(newCircle);
        return newCircle;
    }
    
    constructor(scene: T.Scene) {
        this.scene = scene;
        this.circleMap = new Map();
        this.circleArr = [];
    }
}

export default CircleGenerator;