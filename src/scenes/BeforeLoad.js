import { loadAssets } from "./constants/GameConstants";
import { BeforeLoadConfig } from "./constants/Configs/BeforeLoadConfig";

export class BeforeLoad extends Phaser.Scene {
    constructor() {
        super('BeforeLoad');
    }

    preload() {
        this.load.atlas(
            loadAssets.Buttons.key,
            loadAssets.Buttons.path,
            loadAssets.Buttons.atlasURL
        );
    }

    create() {
        this.scene.launch('Loader');
        this.bg = this.make.image(BeforeLoadConfig.bg, true);
    }
}