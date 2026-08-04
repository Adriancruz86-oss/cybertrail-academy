import { Mission } from '../data/missions/Mission';

export class MissionLog {
    private activeMissions: Mission[] = [];
    private completedMissions: Mission[] = [];

    constructor() {
        this.loadMissions();
    }

    private loadMissions(): void {
        // Logic to load missions from data files or API
    }

    public addMission(mission: Mission): void {
        this.activeMissions.push(mission);
    }

    public completeMission(missionId: string): void {
        const missionIndex = this.activeMissions.findIndex(m => m.id === missionId);
        if (missionIndex !== -1) {
            const [completedMission] = this.activeMissions.splice(missionIndex, 1);
            this.completedMissions.push(completedMission);
        }
    }

    public getActiveMissions(): Mission[] {
        return this.activeMissions;
    }

    public getCompletedMissions(): Mission[] {
        return this.completedMissions;
    }
}