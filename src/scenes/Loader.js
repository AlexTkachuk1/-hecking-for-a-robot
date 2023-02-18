import { errorLoad } from "../javascript/ErrorReaction";
import { elementParams, loadAssets } from "./constants/gameConstants";
import { ProgressBar } from "./classes/ProgressBar";
import { game } from "../index";

export class Loader extends Phaser.Scene {
    constructor() {
        super('Loader');
    }

    preload() {

    }

    createBtnStart() {
        
    }

    loadScenes() {
        this.scene.launch('MainWindow');
    }
}