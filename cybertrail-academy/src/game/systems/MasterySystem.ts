import { ConceptRecord } from '../data/concepts/ConceptRecord';

export class MasterySystem {
    private conceptRecords: Map<string, ConceptRecord>;
    
    constructor() {
        this.conceptRecords = new Map();
    }

    public addConcept(conceptId: string, conceptRecord: ConceptRecord): void {
        this.conceptRecords.set(conceptId, conceptRecord);
    }

    public getConcept(conceptId: string): ConceptRecord | undefined {
        return this.conceptRecords.get(conceptId);
    }

    public updateConcept(conceptId: string, updates: Partial<ConceptRecord>): void {
        const concept = this.conceptRecords.get(conceptId);
        if (concept) {
            this.conceptRecords.set(conceptId, { ...concept, ...updates });
        }
    }

    public trackProgress(conceptId: string, status: string): void {
        const concept = this.conceptRecords.get(conceptId);
        if (concept) {
            concept.status = status;
            this.conceptRecords.set(conceptId, concept);
        }
    }

    public getAllConcepts(): ConceptRecord[] {
        return Array.from(this.conceptRecords.values());
    }
}