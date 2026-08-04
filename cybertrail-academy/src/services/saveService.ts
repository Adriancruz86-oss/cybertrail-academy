import { PlayerData } from '../data/playerData';

export class SaveService {
    private storageKey: string = 'cybertrailAcademySave';

    public save(data: PlayerData): void {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    public load(): PlayerData | null {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    }

    public clear(): void {
        localStorage.removeItem(this.storageKey);
    }
}