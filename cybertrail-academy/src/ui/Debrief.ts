import { Scene } from 'phaser';

export class Debrief extends Scene {
    private missionResult: string;
    private keyDecisions: string[];
    private conceptExplanations: string[];
    private competencyEvidence: string[];
    private mistakesCorrected: string[];
    private newCyberDexEntries: string[];
    private nextRecommendedMission: string;

    constructor() {
        super({ key: 'Debrief' });
    }

    init(data: {
        missionResult: string,
        keyDecisions: string[],
        conceptExplanations: string[],
        competencyEvidence: string[],
        mistakesCorrected: string[],
        newCyberDexEntries: string[],
        nextRecommendedMission: string
    }) {
        this.missionResult = data.missionResult;
        this.keyDecisions = data.keyDecisions;
        this.conceptExplanations = data.conceptExplanations;
        this.competencyEvidence = data.competencyEvidence;
        this.mistakesCorrected = data.mistakesCorrected;
        this.newCyberDexEntries = data.newCyberDexEntries;
        this.nextRecommendedMission = data.nextRecommendedMission;
    }

    create() {
        this.displayDebrief();
    }

    private displayDebrief() {
        // Logic to display the debrief information to the player
        // This will include mission results, key decisions, explanations, and next steps
    }
}