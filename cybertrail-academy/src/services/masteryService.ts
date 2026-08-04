import { ConceptProgress } from './types';

export class MasteryService {
    private conceptProgress: Record<string, ConceptProgress> = {};

    constructor() {
        // Initialize concept progress if needed
    }

    public trackConcept(conceptId: string, status: string): void {
        if (!this.conceptProgress[conceptId]) {
            this.conceptProgress[conceptId] = { status, exposures: 0, recognitionSuccesses: 0, applicationSuccesses: 0, reasoningSuccesses: 0 };
        } else {
            this.conceptProgress[conceptId].status = status;
        }
    }

    public updateProgress(conceptId: string, type: 'exposure' | 'recognition' | 'application' | 'reasoning'): void {
        if (this.conceptProgress[conceptId]) {
            this.conceptProgress[conceptId][`${type}Successes`] += 1;
        }
    }

    public getProgress(conceptId: string): ConceptProgress | undefined {
        return this.conceptProgress[conceptId];
    }

    public resetProgress(conceptId: string): void {
        if (this.conceptProgress[conceptId]) {
            this.conceptProgress[conceptId] = { status: 'unknown', exposures: 0, recognitionSuccesses: 0, applicationSuccesses: 0, reasoningSuccesses: 0 };
        }
    }
}