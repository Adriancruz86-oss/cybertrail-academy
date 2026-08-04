import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { NPC } from '../entities/NPC';
import { DialogueSystem } from '../systems/DialogueSystem';
import { SaveSystem } from '../systems/SaveSystem';
import { MasterySystem } from '../systems/MasterySystem';

export class HubScene extends Phaser.Scene {
    private player: Player;
    private npcs: NPC[];
    private dialogueSystem: DialogueSystem;
    private saveSystem: SaveSystem;
    private masterySystem: MasterySystem;

    constructor() {
        super({ key: 'HubScene' });
    }

    preload() {
        // Load assets for the hub scene
        this.load.image('hubBackground', 'assets/hubBackground.png');
        // Load other necessary assets
    }

    create() {
        this.add.image(400, 300, 'hubBackground');

        this.player = new Player(this);
        this.npcs = this.createNPCs();

        this.dialogueSystem = new DialogueSystem(this.npcs);
        this.saveSystem = new SaveSystem();
        this.masterySystem = new MasterySystem();

        this.setupInteractions();
    }

    update() {
        // Update player and NPC interactions
        this.player.update();
        this.npcs.forEach(npc => npc.update());
    }

    private createNPCs(): NPC[] {
        const npcData = [
            { name: 'Maya', position: { x: 100, y: 200 } },
            { name: 'Ben', position: { x: 300, y: 200 } },
            // Add more NPCs as needed
        ];

        return npcData.map(data => {
            const npc = new NPC(this, data.name, data.position.x, data.position.y);
            return npc;
        });
    }

    private setupInteractions() {
        this.input.on('pointerdown', (pointer) => {
            const clickedObject = this.input.hitTest(pointer.x, pointer.y);
            if (clickedObject) {
                this.dialogueSystem.startDialogue(clickedObject);
            }
        });
    }
}