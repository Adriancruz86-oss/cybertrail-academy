import { MasterySystem } from '../../src/game/systems/MasterySystem';

describe('MasterySystem', () => {
    let masterySystem: MasterySystem;

    beforeEach(() => {
        masterySystem = new MasterySystem();
    });

    test('should initialize with no concepts', () => {
        expect(masterySystem.getAllConcepts()).toHaveLength(0);
    });

    test('should add a concept', () => {
        masterySystem.addConcept('test-concept', {
            name: 'Test Concept',
            domain: 'test-domain',
            plainDefinition: 'A concept for testing.',
            technicalDefinition: 'Technical definition of the test concept.',
            masteryRequirements: {
                competencyDemonstrations: 2,
                distinctContexts: 2,
                delayedReviewRequired: true
            }
        });

        expect(masterySystem.getAllConcepts()).toHaveLength(1);
        expect(masterySystem.getConcept('test-concept')).toBeDefined();
    });

    test('should track competency correctly', () => {
        masterySystem.addConcept('test-concept', {
            name: 'Test Concept',
            domain: 'test-domain',
            plainDefinition: 'A concept for testing.',
            technicalDefinition: 'Technical definition of the test concept.',
            masteryRequirements: {
                competencyDemonstrations: 2,
                distinctContexts: 2,
                delayedReviewRequired: true
            }
        });

        masterySystem.recordDemonstration('test-concept', true);
        masterySystem.recordDemonstration('test-concept', true);

        expect(masterySystem.getConcept('test-concept').competencyStatus).toBe('competent');
    });

    test('should not mark as competent with insufficient demonstrations', () => {
        masterySystem.addConcept('test-concept', {
            name: 'Test Concept',
            domain: 'test-domain',
            plainDefinition: 'A concept for testing.',
            technicalDefinition: 'Technical definition of the test concept.',
            masteryRequirements: {
                competencyDemonstrations: 2,
                distinctContexts: 2,
                delayedReviewRequired: true
            }
        });

        masterySystem.recordDemonstration('test-concept', true);

        expect(masterySystem.getConcept('test-concept').competencyStatus).toBe('unknown');
    });

    test('should handle incorrect demonstrations', () => {
        masterySystem.addConcept('test-concept', {
            name: 'Test Concept',
            domain: 'test-domain',
            plainDefinition: 'A concept for testing.',
            technicalDefinition: 'Technical definition of the test concept.',
            masteryRequirements: {
                competencyDemonstrations: 2,
                distinctContexts: 2,
                delayedReviewRequired: true
            }
        });

        masterySystem.recordDemonstration('test-concept', false);
        expect(masterySystem.getConcept('test-concept').mistakes).toHaveLength(1);
    });
});