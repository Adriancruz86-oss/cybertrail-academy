import { describe, expect, it } from 'vitest'
import { MasteryService } from '../../src/services/masteryService'
import type { SaveState } from '../../src/types'

function createTestState(): SaveState {
  return {
    version: 2,
    playerId: 'test',
    displayName: 'Analyst',
    rank: 'analyst-trainee',
    xp: 0,
    completedMissions: [],
    unlockedMissions: ['splus-c1-m01'],
    missionAttempts: {},
    conceptProgress: {},
    settings: {
      sound: false,
      reducedMotion: false,
      textSize: 'standard'
    }
  }
}

describe('MasteryService', () => {
  it('awards competent status after two first-attempt successes in distinct missions', () => {
    const state = createTestState()

    MasteryService.recordAttempt(state, {
      conceptId: 'tcp-443',
      missionId: 'splus-c1-m02',
      evidenceType: 'application',
      correct: true,
      firstAttempt: true,
      hintUsed: false,
      independent: true
    })

    expect(state.conceptProgress['tcp-443'].currentCompetencyStreak).toBe(1)
    expect(state.conceptProgress['tcp-443'].status).toBe('applied')

    MasteryService.recordAttempt(state, {
      conceptId: 'tcp-443',
      missionId: 'splus-c1-m03',
      evidenceType: 'application',
      correct: true,
      firstAttempt: true,
      hintUsed: false,
      independent: true
    })

    expect(state.conceptProgress['tcp-443'].currentCompetencyStreak).toBe(2)
    expect(state.conceptProgress['tcp-443'].status).toBe('competent')
  })

  it('resets active streak after an incorrect first attempt', () => {
    const state = createTestState()

    MasteryService.recordAttempt(state, {
      conceptId: 'firewall-rule',
      missionId: 'splus-c1-m02',
      evidenceType: 'application',
      correct: false,
      firstAttempt: true,
      hintUsed: false,
      independent: true
    })

    expect(state.conceptProgress['firewall-rule'].currentCompetencyStreak).toBe(0)
    expect(state.conceptProgress['firewall-rule'].mistakes.length).toBe(1)
  })

  it('records recognition without treating a guided activity as competency evidence', () => {
    const state = createTestState()
    MasteryService.recordAttempt(state, {
      conceptId: 'asset', missionId: 'splus-c1-m01', evidenceType: 'recognition',
      correct: true, firstAttempt: true, hintUsed: false, independent: false
    })
    expect(state.conceptProgress.asset.status).toBe('recognized')
    expect(state.conceptProgress.asset.currentCompetencyStreak).toBe(0)
  })

  it('awards mastery only in a later qualifying context', () => {
    const state = createTestState()
    for (const [index, missionId] of ['m1', 'm2', 'm3'].entries()) {
      MasteryService.recordAttempt(state, {
        conceptId: 'risk', missionId, evidenceType: 'reasoning', correct: true,
        firstAttempt: true, hintUsed: false, independent: true, now: 1000 + index
      })
    }
    expect(state.conceptProgress.risk.status).toBe('mastered')
  })
})
