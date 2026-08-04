import { NPC } from "../entities/NPC";

export class DialogueSystem {
    private dialogues: Map<string, string[]>;

    constructor() {
        this.dialogues = new Map();
    }

    public addDialogue(npc: NPC, dialogue: string[]): void {
        this.dialogues.set(npc.id, dialogue);
    }

    public getDialogue(npc: NPC): string[] | undefined {
        return this.dialogues.get(npc.id);
    }

    public displayDialogue(npc: NPC): void {
        const dialogue = this.getDialogue(npc);
        if (dialogue) {
            dialogue.forEach(line => {
                console.log(`${npc.name}: ${line}`);
            });
        } else {
            console.log(`${npc.name} has nothing to say.`);
        }
    }
}