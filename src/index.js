import Phaser, { Scale } from 'phaser';
import { BeforeLoad } from "./scenes/BeforeLoad";
import { MainWindow } from "./scenes/MainWindow";
import { Loader } from "./scenes/Loader";
import { gameSize } from "./scenes/constants/GameConstants";

const config = {
    type: Phaser.AUTO,
    parent: 'GardenSlots',
    backgroundColor: '#ffffff',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        width: gameSize.width,
        height: gameSize.height,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0 },
            debug: false
        },
    },
    plugins: {
        scene: [
            { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
        ]
    },
    render: {
        batchSize: 512,
        antialiasGL: false,
    },
    scene: [BeforeLoad, Loader, MainWindow]
};

export const game = new Phaser.Game(config);