import Phaser from 'phaser';
import { DialogueSystem } from '../systems/DialogueSystem';

export class BrightPathScene extends Phaser.Scene {
    private dialogueSystem: DialogueSystem;

    constructor() {
        super({ key: 'BrightPathScene' });
        this.dialogueSystem = new DialogueSystem(this);
    }

    preload() {
        // Load assets specific to the BrightPath scene
        this.load.image('background', 'assets/images/brightpath_background.png');
        this.load.image('npc', 'assets/images/npc.png');
    }

    create() {
        // Set the background
        this.add.image(400, 300, 'background');

        // Create NPCs and set up interactions
        const npc = this.add.sprite(200, 300, 'npc').setInteractive();
        npc.on('pointerdown', () => {
            this.dialogueSystem.startDialogue('npcDialogue');
        });

        // Additional scene setup can go here
    }

    update() {
        // Update logic for the scene
    }
}