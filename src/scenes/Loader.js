import { loadAssets } from "./constants/GameConstants";
import { BeforeLoadConfig } from "./constants/Configs/BeforeLoadConfig";
import { game } from "..";

export class Loader extends Phaser.Scene {
    constructor() {
        super('Loader');
    }

    preload() {
        this.load.atlas(
            loadAssets.Cells.key,
            loadAssets.Cells.path,
            loadAssets.Cells.atlasURL
        );
        this.load.image(
            loadAssets.Hero.key,
            loadAssets.Hero.path,
        );
    }

    create() {
        this.scene.launch('MainWindow');
        this.createStartButton();
    }

    createButtonAnim(startButton, conf) {
        const buttonAnim = this.tweens.timeline({
            targets: startButton,
            ease: 'Linear',
            duration: 150,

            tweens: [{
                scale: 0.9,
                onComplete: () => {
                    startButton.setFrame(conf.frames.checked);
                }
            },
            {
                scale: 1,
                offset: 150,
                onComplete: () => {
                    this.openMainScene(startButton, buttonAnim);
                }
            }]
        }).pause();

        return buttonAnim;
    }

    openMainScene(startButton, startButtonAnim) {
        const mainScene = game.scene.keys["MainWindow"];
        mainScene.togglePageVisibility(true);
        this.scene.remove("BeforeLoad");
        startButton.destroy();
        startButtonAnim.destroy();
    }

    createStartButton() {
        const conf = BeforeLoadConfig.checkBox;
        const startButton = this.make.image(conf, true).setFrame(conf.frames.unchecked);
        const startButtonAnim = this.createButtonAnim(startButton, conf);

        startButton.setInteractive({ cursor: "pointer" });
        startButton.on("pointerover", () => {
            startButton.setScale(startButton.scale + 0.05);
        });
        startButton.on("pointerout", () => {
            startButton.setScale(1);
        }, this);
        startButton.on("pointerdown", () => {
            startButtonAnim.play();
        }, this);
    }
}