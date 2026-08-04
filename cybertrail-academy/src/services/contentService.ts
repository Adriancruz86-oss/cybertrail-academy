import { Concept } from '../data/concepts/Concept';

export class ContentService {
    private concepts: Map<string, Concept>;

    constructor() {
        this.concepts = new Map();
    }

    public async loadConcepts(): Promise<void> {
        const response = await fetch('/src/data/concepts/concepts.json');
        const data = await response.json();
        data.forEach((concept: Concept) => {
            this.concepts.set(concept.id, concept);
        });
    }

    public getConcept(id: string): Concept | undefined {
        return this.concepts.get(id);
    }

    public getAllConcepts(): Concept[] {
        return Array.from(this.concepts.values());
    }
}