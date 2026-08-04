import { Scene } from 'phaser';

export class UIScene extends Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    preload() {
        // Load any assets needed for the UI here
    }

    create() {
        // Create UI elements such as buttons, text, and overlays
        this.add.text(20, 20, 'Welcome to CyberTrail Academy', { fontSize: '32px', fill: '#fff' });
        
        // Example of creating a button
        const startButton = this.add.text(100, 100, 'Start Mission', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.startMission());
    }

    update() {
        // Update UI elements if necessary
    }

    startMission() {
        // Logic to start the mission
        this.scene.start('HubScene'); // Example of transitioning to another scene
    }
}