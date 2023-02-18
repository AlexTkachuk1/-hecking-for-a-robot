import {errorLoad} from "../javascript/ErrorReaction";

export class BeforeLoad extends Phaser.Scene {
    constructor() {
        super('BeforeLoad');
        this.count = 0;
    }

    preload() {
        errorLoad(this, this.count);
    }

    create() {
        this.scene.launch('Loader');
    }
}