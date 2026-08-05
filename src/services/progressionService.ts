import { ContentService } from './contentService'
import type { SaveState } from '../types'

export const ProgressionService = {
  isAvailable(state: SaveState, missionId: string): boolean {
    const mission = ContentService.getMission(missionId)
    return Boolean(mission && mission.prerequisites.every((id) => state.completedMissions.includes(id)))
  },

  getNextMission(state: SaveState) {
    return ContentService.getAllMissions().find(
      (mission) => !state.completedMissions.includes(mission.missionId) && this.isAvailable(state, mission.missionId)
    )
  },

  recordAttempt(state: SaveState, missionId: string, correct: boolean): boolean {
    const attempt = state.missionAttempts[missionId] ?? {
      attempts: 0,
      firstAttemptCorrect: null,
      rewardGranted: false
    }
    const isFirstAttempt = attempt.attempts === 0
    attempt.attempts += 1
    if (isFirstAttempt) attempt.firstAttemptCorrect = correct
    state.missionAttempts[missionId] = attempt
    return isFirstAttempt
  },

  complete(state: SaveState, missionId: string, xp: number): boolean {
    const attempt = state.missionAttempts[missionId]
    if (!attempt || attempt.rewardGranted) return false
    attempt.rewardGranted = true
    if (!state.completedMissions.includes(missionId)) state.completedMissions.push(missionId)
    state.xp += xp
    for (const mission of ContentService.getAllMissions()) {
      if (this.isAvailable(state, mission.missionId) && !state.unlockedMissions.includes(mission.missionId)) {
        state.unlockedMissions.push(mission.missionId)
      }
    }
    return true
  }
}
