import { Concept } from '../data/concepts/Concept';

export class CyberDex {
    private concepts: Concept[];

    constructor() {
        this.concepts = [];
    }

    public addConcept(concept: Concept): void {
        this.concepts.push(concept);
    }

    public getConcepts(): Concept[] {
        return this.concepts;
    }

    public findConceptById(conceptId: string): Concept | undefined {
        return this.concepts.find(concept => concept.id === conceptId);
    }

    public getConceptDetails(conceptId: string): string {
        const concept = this.findConceptById(conceptId);
        if (concept) {
            return `${concept.name}: ${concept.description}`;
        }
        return 'Concept not found.';
    }
}