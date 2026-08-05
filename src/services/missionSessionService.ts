import type { ActiveMissionState } from '../types'

export const MissionSessionService = {
  recordDecision(session: ActiveMissionState, optionId: string, correct: boolean): boolean {
    const activityKey = String(session.activityIndex)
    const firstAttempt = (session.activityAttempts[activityKey] ?? 0) === 0
    session.activityAttempts[activityKey] = (session.activityAttempts[activityKey] ?? 0) + 1
    session.selectedOptionId = optionId
    session.decisions.push({ optionId, correct })
    return firstAttempt
  },

  advanceActivity(session: ActiveMissionState) {
    session.activityIndex += 1
    session.selectedOptionId = null
    session.hintUsed = false
    session.stage = 'decision'
  }
}
