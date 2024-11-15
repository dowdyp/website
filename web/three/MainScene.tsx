import * as T from 'three'; 
import { getOrthoCamera } from './scene/camera';
import { getScene } from './scene/scene';
import { XYPoint } from './util/scale';
import { setMouseXY, nodeScaleOnHover, getIntersectedObjects } from './scene/raycaster';
import LineGenerator from './entities/line';
import CircleGenerator from './entities/circle';
import UndirectedGraph from './struct/Graph';

export const Scene = () => {
    let scene = getScene();
    const camera = getOrthoCamera();
    const raycaster = new T.Raycaster();
    const mouse = new T.Vector2();

    const renderer = new T.WebGLRenderer({ antialias: true });
    const graph = new UndirectedGraph(scene, raycaster);

    let intersectedMesh: T.Intersection<T.Object3D<T.Object3DEventMap>>[] = [];


    renderer.domElement.addEventListener(
        "mousedown", 
        (e) => {
            graph.handleClick(e);
            graph.handleMouseMove(e);
        }
    )

    document.body.appendChild( renderer.domElement );

    const hoveredElements = new Set<T.Object3D<T.Object3DEventMap>>();

    window.addEventListener('mousemove', (e) => {
        // update mouse position and recalc intersected mesh
        setMouseXY(mouse, renderer.domElement, e);
        raycaster.setFromCamera(mouse, camera);

        graph.handleMouseMove(e);

        // scale hovered nodes
        nodeScaleOnHover(
            hoveredElements,
            intersectedMesh,
        );
    })

    const animate = () => {
        renderer.render(scene, camera);
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
}