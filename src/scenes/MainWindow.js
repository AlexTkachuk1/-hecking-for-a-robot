export class MainWindow extends Phaser.Scene {
    constructor() {
        super('MainWindow');
    }

    create() {
        this.togglePageVisibility(false);
        this.createElement();
    }

    createElement() {

    }

    togglePageVisibility(bool) {
        this.scene[bool ? "wake" : "sleep"]();
        this.scene.setVisible(bool);
    }
}