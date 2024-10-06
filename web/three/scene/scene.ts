import { Scene, Color } from "three"; 
import { sceneBackgroundColor } from "../util/colors";

const sceneProperties = {
    backgroundColor: sceneBackgroundColor,
}

export const getScene = (): Scene => {
    const scene = new Scene();

    scene.background = sceneProperties.backgroundColor

    return scene;
}