import { describe, expect, it } from 'vitest'
import { createDefaultSave } from '../../src/services/saveService'
import { ContentService } from '../../src/services/contentService'
import { ProgressionService } from '../../src/services/progressionService'
import { MasteryService } from '../../src/services/masteryService'

describe('mission completion integration', () => {
  it('completes missions 1-15, unlocks concepts, and reaches competency across distinct contexts', () => {
    const state = createDefaultSave()
    for (const mission of ContentService.getAllMissions()) {
      expect(ProgressionService.isAvailable(state, mission.missionId)).toBe(true)
      mission.concepts.forEach((id) => MasteryService.recordExposure(state, id))
      const first = ProgressionService.recordAttempt(state, mission.missionId, true)
      mission.masteryEvidence.forEach((evidence) => MasteryService.recordAttempt(state, {
        ...evidence, missionId: mission.missionId, correct: true, firstAttempt: first, hintUsed: false
      }))
      expect(ProgressionService.complete(state, mission.missionId, mission.rewards.xp)).toBe(true)
    }
    expect(state.completedMissions).toEqual(ContentService.getAllMissions().map((mission) => mission.missionId))
    expect(state.conceptProgress['least-functionality'].status).toBe('competent')
    expect(state.conceptProgress['least-functionality'].currentCompetencyStreak).toBe(2)
    expect(state.conceptProgress.trust.status).toBe('competent')
    expect(state.conceptProgress['alert-quality'].status).toBe('competent')
    expect(state.conceptProgress.containment.status).toBe('competent')
    expect(state.conceptProgress['clean-restoration'].status).toBe('competent')
  })
})
