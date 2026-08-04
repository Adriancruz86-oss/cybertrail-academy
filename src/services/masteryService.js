function ensureProgress(state, conceptId) {
    if (!state.conceptProgress[conceptId]) {
        state.conceptProgress[conceptId] = {
            status: 'unknown',
            exposures: 0,
            applicationSuccesses: 0,
            reasoningSuccesses: 0,
            currentCompetencyStreak: 0,
            lastSuccessfulMissionId: null,
            mistakes: [],
            lastReviewed: null,
            nextReview: null
        };
    }
    return state.conceptProgress[conceptId];
}
function updateStatusForCorrect(progress, evidenceType) {
    if (evidenceType === 'application') {
        progress.applicationSuccesses += 1;
    }
    if (evidenceType === 'reasoning') {
        progress.reasoningSuccesses += 1;
    }
    if (progress.currentCompetencyStreak >= 2) {
        progress.status = 'competent';
    }
    else {
        progress.status = 'applied';
    }
}
export const MasteryService = {
    recordExposure(state, conceptId) {
        const progress = ensureProgress(state, conceptId);
        progress.exposures += 1;
        if (progress.status === 'unknown') {
            progress.status = 'exposed';
        }
        return progress;
    },
    recordAttempt(state, args) {
        const progress = ensureProgress(state, args.conceptId);
        if (!args.firstAttempt || args.hintUsed || !args.independent) {
            return progress;
        }
        if (!['application', 'reasoning', 'assessment'].includes(args.evidenceType)) {
            return progress;
        }
        if (!args.correct) {
            progress.currentCompetencyStreak = 0;
            progress.mistakes.push({
                missionId: args.missionId,
                note: `Incorrect first attempt for ${args.evidenceType}`,
                timestamp: Date.now()
            });
            return progress;
        }
        const differentContext = progress.lastSuccessfulMissionId !== args.missionId;
        if (differentContext) {
            progress.currentCompetencyStreak += 1;
            progress.lastSuccessfulMissionId = args.missionId;
        }
        updateStatusForCorrect(progress, args.evidenceType);
        return progress;
    }
};
//# sourceMappingURL=masteryService.js.map