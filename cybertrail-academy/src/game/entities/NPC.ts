import { GameObject } from 'phaser';

export class NPC extends GameObject {
    name: string;
    dialogue: string[];

    constructor(scene: Phaser.Scene, name: string, dialogue: string[]) {
        super(scene, name);
        this.name = name;
        this.dialogue = dialogue;
    }

    speak(): string {
        const randomIndex = Math.floor(Math.random() * this.dialogue.length);
        return this.dialogue[randomIndex];
    }
}