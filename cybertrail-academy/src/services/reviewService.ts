import { Concept } from '../data/concepts/Concept';

export class ReviewService {
    private reviewQueue: Concept[] = [];
    
    constructor() {}

    addToReviewQueue(concept: Concept): void {
        if (!this.reviewQueue.includes(concept)) {
            this.reviewQueue.push(concept);
        }
    }

    getReviewQueue(): Concept[] {
        return this.reviewQueue;
    }

    clearReviewQueue(): void {
        this.reviewQueue = [];
    }

    scheduleReview(concept: Concept): void {
        // Logic to schedule a review for the concept
    }

    // Additional methods for managing review activities can be added here
}