import * as T from 'three'; 
import { getOrthoCamera } from './scene/camera';
import { getScene } from './scene/scene';
import { XYPoint } from './util/scale';
import { setMouseXY, nodeScaleOnHover, getIntersectedObjects } from './scene/raycaster';
import LineGenerator from './entities/line';
import CircleGenerator from './entities/circle';

export const Scene = () => {
    let scene = getScene();
    const camera = getOrthoCamera();

    const renderer = new T.WebGLRenderer({ antialias: true });
    const lineGenerator = new LineGenerator(scene);
    const circleGenerator = new CircleGenerator(scene);
    
    let drawing = false;
    let linesDrawing: T.Line[] = [];

    let intersectedMesh: T.Intersection<T.Object3D<T.Object3DEventMap>>[] = [];


    renderer.domElement.addEventListener(
        "mousedown", 
        (e) => {
            const mousePosition: XYPoint = [e.clientX, -e.clientY];
            const meshFound = circleGenerator.circleMap.get(intersectedMesh[0]?.object.uuid)
            // if no mesh found,
            //    if drawing, add circle and finalize line
            //    if !drawing, add circle
            if(meshFound) { // if mesh is found, 
                const meshPos: XYPoint = [meshFound.position.x, meshFound.position.y];
                if(drawing) {//    if drawing, finalize line
                    const line = linesDrawing.pop();
                    line && lineGenerator.updateLineEndpoint(line, meshPos);
                    drawing = !drawing;
                } else { //    if !drawing, start line
                    drawing = !drawing;
                    linesDrawing.push(lineGenerator.createLine(meshPos))
                }
            } else { 
                circleGenerator.createCircle(mousePosition);
                if(drawing) {
                    const line = linesDrawing.pop();
                    line && lineGenerator.updateLineEndpoint(line, mousePosition);
                    drawing = !drawing;
                }
            }
        }
    )

    document.body.appendChild( renderer.domElement );

    const raycaster = new T.Raycaster();
    
    const mouse = new T.Vector2();
    const hoveredElements = new Set<T.Object3D<T.Object3DEventMap>>();

    window.addEventListener('mousemove', (e) => {
        // update mouse position and recalc intersected mesh
        setMouseXY(mouse, renderer.domElement, e);
        raycaster.setFromCamera(mouse, camera);
        intersectedMesh = getIntersectedObjects(raycaster, circleGenerator.circleArr, mouse, camera)

        // scale hovered nodes
        nodeScaleOnHover(
            hoveredElements,
            intersectedMesh,
        );

        if(drawing) {
            linesDrawing.forEach((line) => lineGenerator.updateLineEndpoint(line, [e.clientX, -e.clientY]))
        }
    })

    const animate = () => {
        renderer.render(scene, camera);
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
}