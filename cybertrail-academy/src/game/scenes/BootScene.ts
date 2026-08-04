import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load assets here
        this.load.image('loading', 'assets/loading.png'); // Example loading image
    }

    create() {
        this.scene.start('HubScene'); // Transition to the main hub scene
    }
}