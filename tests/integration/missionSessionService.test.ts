import { describe, expect, it } from 'vitest'
import { MissionSessionService } from '../../src/services/missionSessionService'
import type { ActiveMissionState } from '../../src/types'

function createSession(): ActiveMissionState {
  return {
    missionId: 'splus-c1-m07', stage: 'decision', investigationIndex: 1, hintUsed: true,
    selectedOptionId: null, collectedEvidence: [], decisions: [], discoveredConcepts: [],
    masteryEvidenceEarned: [], activityIndex: 0, activityAttempts: {}
  }
}

describe('MissionSessionService', () => {
  it('tracks first attempts separately for every activity and resumes cleanly', () => {
    const session = createSession()
    expect(MissionSessionService.recordDecision(session, 'wrong', false)).toBe(true)
    expect(MissionSessionService.recordDecision(session, 'bulk-aes', true)).toBe(false)
    expect(session.activityAttempts).toEqual({ '0': 2 })

    MissionSessionService.advanceActivity(session)
    expect(session.activityIndex).toBe(1)
    expect(session.hintUsed).toBe(false)
    expect(MissionSessionService.recordDecision(session, 'key-ecdhe', true)).toBe(true)
    expect(session.activityAttempts).toEqual({ '0': 2, '1': 1 })
    expect(session.decisions).toHaveLength(3)
  })
})
