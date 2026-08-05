import { describe, expect, it } from 'vitest'
import { createDefaultSave } from '../../src/services/saveService'
import { getAchievements, getCampaignCompletion, getCurrentChapter, getMissionNavigatorStatus } from '../../src/game/missionChapters'

describe('mission chapters', () => {
  it('shows the chapter containing the next unlocked mission', () => {
    const state = createDefaultSave()
    expect(getCurrentChapter(state).id).toBe('foundations')
    state.completedMissions.push('splus-c1-m01', 'splus-c1-m02', 'splus-c1-m03')
    state.unlockedMissions.push('splus-c1-m04')
    expect(getCurrentChapter(state).id).toBe('trust')
  })

  it('distinguishes replayable, available, active, and locked missions', () => {
    const state = createDefaultSave()
    state.completedMissions.push('splus-c1-m01')
    expect(getMissionNavigatorStatus(state, 'splus-c1-m01', [])).toBe('completed')
    expect(getMissionNavigatorStatus(state, 'splus-c1-m02', ['splus-c1-m01'])).toBe('available')
    expect(getMissionNavigatorStatus(state, 'splus-c1-m03', ['splus-c1-m02'])).toBe('locked')
    state.activeMission = { missionId: 'splus-c1-m02', stage: 'briefing', investigationIndex: 0, hintUsed: false, selectedOptionId: null, collectedEvidence: [], decisions: [], discoveredConcepts: [], masteryEvidenceEarned: [], activityIndex: 0, activityAttempts: {} }
    expect(getMissionNavigatorStatus(state, 'splus-c1-m02', ['splus-c1-m01'])).toBe('current')
  })

  it('derives campaign completion and achievements from saved progress', () => {
    const state = createDefaultSave()
    state.completedMissions = Array.from({ length: 15 }, (_, index) => `splus-c1-m${String(index + 1).padStart(2, '0')}`)
    expect(getCampaignCompletion(state)).toEqual({ completed: 15, total: 15, percent: 100 })
    expect(getAchievements(state).map((achievement) => achievement.id)).toContain('public-web-defender')
    expect(getCurrentChapter(state).id).toBe('incident-response')
  })
})
