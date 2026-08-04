import { beforeEach, describe, expect, it } from 'vitest';
import { SaveService } from '../../src/services/saveService';
describe('SaveService', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });
    it('persists and restores save state', () => {
        const state = SaveService.reset();
        state.xp = 120;
        SaveService.save(state);
        const loaded = SaveService.load();
        expect(loaded.xp).toBe(120);
        expect(loaded.playerId).toBe('local-player');
        expect(loaded.unlockedMissions).toContain('splus-c1-m01');
    });
});
//# sourceMappingURL=saveService.test.js.map