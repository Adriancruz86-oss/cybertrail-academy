import { missions } from '../data/missions';
import { concepts } from '../data/concepts';
export const ContentService = {
    getMission(missionId) {
        return missions.find((mission) => mission.missionId === missionId);
    },
    getNextMission(currentMissionId) {
        const index = missions.findIndex((mission) => mission.missionId === currentMissionId);
        return index >= 0 && index + 1 < missions.length ? missions[index + 1] : undefined;
    },
    getAllMissions() {
        return [...missions];
    },
    getConcept(conceptId) {
        return concepts[conceptId];
    },
    getAllConcepts() {
        return concepts;
    }
};
//# sourceMappingURL=contentService.js.map