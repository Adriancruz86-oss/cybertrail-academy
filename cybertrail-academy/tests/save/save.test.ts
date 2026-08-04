import { SaveSystem } from '../../src/game/systems/SaveSystem';

describe('SaveSystem', () => {
    let saveSystem: SaveSystem;

    beforeEach(() => {
        saveSystem = new SaveSystem();
    });

    test('should save player data correctly', () => {
        const playerData = {
            playerId: 'local-player',
            displayName: 'Analyst',
            rank: 'analyst-trainee',
            xp: 100,
            completedMissions: ['mission1'],
            conceptProgress: {},
            settings: {
                sound: true,
                reducedMotion: false,
                textSize: 'standard'
            }
        };

        saveSystem.savePlayerData(playerData);
        const loadedData = saveSystem.loadPlayerData();

        expect(loadedData).toEqual(playerData);
    });

    test('should return default data if no save exists', () => {
        const defaultData = saveSystem.loadPlayerData();
        
        expect(defaultData).toEqual({
            playerId: 'local-player',
            displayName: 'Player',
            rank: 'analyst-trainee',
            xp: 0,
            completedMissions: [],
            conceptProgress: {},
            settings: {
                sound: true,
                reducedMotion: false,
                textSize: 'standard'
            }
        });
    });

    test('should clear saved data', () => {
        const playerData = {
            playerId: 'local-player',
            displayName: 'Analyst',
            rank: 'analyst-trainee',
            xp: 100,
            completedMissions: ['mission1'],
            conceptProgress: {},
            settings: {
                sound: true,
                reducedMotion: false,
                textSize: 'standard'
            }
        };

        saveSystem.savePlayerData(playerData);
        saveSystem.clearSavedData();
        const loadedData = saveSystem.loadPlayerData();

        expect(loadedData).toEqual({
            playerId: 'local-player',
            displayName: 'Player',
            rank: 'analyst-trainee',
            xp: 0,
            completedMissions: [],
            conceptProgress: {},
            settings: {
                sound: true,
                reducedMotion: false,
                textSize: 'standard'
            }
        });
    });
});