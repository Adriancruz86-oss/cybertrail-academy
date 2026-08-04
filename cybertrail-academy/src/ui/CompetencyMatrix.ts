import { Competency } from '../data/concepts/Competency';

export class CompetencyMatrix {
    private competencies: Competency[];

    constructor(competencies: Competency[]) {
        this.competencies = competencies;
    }

    public display(): void {
        // Logic to render the competency matrix on the UI
        this.competencies.forEach(competency => {
            console.log(`${competency.name}: ${competency.status}`);
        });
    }

    public updateCompetency(competencyId: string, status: string): void {
        const competency = this.competencies.find(c => c.id === competencyId);
        if (competency) {
            competency.status = status;
            this.display();
        }
    }
}