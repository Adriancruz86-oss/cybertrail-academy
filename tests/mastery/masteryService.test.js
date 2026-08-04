import { describe, expect, it } from 'vitest';
import { MasteryService } from '../../src/services/masteryService';
function createTestState() {
    return {
        version: 1,
        playerId: 'test',
        displayName: 'Analyst',
        rank: 'analyst-trainee',
        xp: 0,
        completedMissions: [],
        unlockedMissions: ['splus-c1-m01'],
        conceptProgress: {},
        settings: {
            sound: false,
            reducedMotion: false,
            textSize: 'standard'
        }
    };
}
describe('MasteryService', () => {
    it('awards competent status after two first-attempt successes in distinct missions', () => {
        const state = createTestState();
        MasteryService.recordAttempt(state, {
            conceptId: 'tcp-443',
            missionId: 'splus-c1-m02',
            evidenceType: 'application',
            correct: true,
            firstAttempt: true,
            hintUsed: false,
            independent: true
        });
        expect(state.conceptProgress['tcp-443'].currentCompetencyStreak).toBe(1);
        expect(state.conceptProgress['tcp-443'].status).toBe('applied');
        MasteryService.recordAttempt(state, {
            conceptId: 'tcp-443',
            missionId: 'splus-c1-m03',
            evidenceType: 'application',
            correct: true,
            firstAttempt: true,
            hintUsed: false,
            independent: true
        });
        expect(state.conceptProgress['tcp-443'].currentCompetencyStreak).toBe(2);
        expect(state.conceptProgress['tcp-443'].status).toBe('competent');
    });
    it('resets active streak after an incorrect first attempt', () => {
        const state = createTestState();
        MasteryService.recordAttempt(state, {
            conceptId: 'firewall-rule',
            missionId: 'splus-c1-m02',
            evidenceType: 'application',
            correct: false,
            firstAttempt: true,
            hintUsed: false,
            independent: true
        });
        expect(state.conceptProgress['firewall-rule'].currentCompetencyStreak).toBe(0);
        expect(state.conceptProgress['firewall-rule'].mistakes.length).toBe(1);
    });
});
//# sourceMappingURL=masteryService.test.js.map