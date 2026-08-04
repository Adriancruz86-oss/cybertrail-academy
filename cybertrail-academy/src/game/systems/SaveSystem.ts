import { PlayerData } from '../entities/Player';

export class SaveSystem {
    private saveKey: string = 'cybertrailAcademySave';

    public save(playerData: PlayerData): void {
        const dataToSave = JSON.stringify(playerData);
        localStorage.setItem(this.saveKey, dataToSave);
    }

    public load(): PlayerData | null {
        const savedData = localStorage.getItem(this.saveKey);
        if (savedData) {
            return JSON.parse(savedData) as PlayerData;
        }
        return null;
    }

    public clear(): void {
        localStorage.removeItem(this.saveKey);
    }
}