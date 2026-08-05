import { beforeEach, describe, expect, it } from 'vitest'
import { SaveService, createDefaultSave } from '../../src/services/saveService'

describe('SaveService', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('persists and restores save state', () => {
    const state = SaveService.reset()
    state.xp = 120
    state.activeMission = { missionId: 'splus-c1-m07', stage: 'decision', investigationIndex: 1, hintUsed: false, selectedOptionId: null, collectedEvidence: ['crypto-toolkit'], decisions: [], discoveredConcepts: ['aes'], masteryEvidenceEarned: ['symmetric-encryption'], activityIndex: 2, activityAttempts: { '0': 1, '1': 2 } }
    SaveService.save(state)

    const loaded = SaveService.reload()
    expect(loaded.xp).toBe(120)
    expect(loaded.playerId).toBe('local-player')
    expect(loaded.unlockedMissions).toContain('splus-c1-m01')
    expect(loaded.activeMission?.investigationIndex).toBe(1)
    expect(loaded.activeMission?.collectedEvidence).toEqual(['crypto-toolkit'])
    expect(loaded.activeMission?.activityIndex).toBe(2)
    expect(loaded.activeMission?.activityAttempts).toEqual({ '0': 1, '1': 2 })
  })

  it('migrates a Sprint 3 active mission without losing progress', () => {
    const old = createDefaultSave()
    window.localStorage.setItem('cybertrail-save-v1', JSON.stringify({
      ...old, version: 3, xp: 330,
      activeMission: { missionId: 'splus-c1-m03', stage: 'decision', investigationIndex: 1, hintUsed: false, selectedOptionId: null }
    }))
    const loaded = SaveService.reload()
    expect(loaded.version).toBe(5)
    expect(loaded.xp).toBe(330)
    expect(loaded.activeMission?.collectedEvidence).toEqual([])
    expect(loaded.activeMission?.decisions).toEqual([])
  })

  it('migrates a Sprint 4 mission into the multi-activity session format', () => {
    const old = createDefaultSave()
    window.localStorage.setItem('cybertrail-save-v1', JSON.stringify({
      ...old, version: 4,
      activeMission: {
        missionId: 'splus-c1-m06', stage: 'feedback', investigationIndex: 1, hintUsed: false,
        selectedOptionId: 'revoke-rekey-replace', collectedEvidence: ['key-copy-alert'], decisions: [],
        discoveredConcepts: ['revocation'], masteryEvidenceEarned: ['trust']
      }
    }))
    const loaded = SaveService.reload()
    expect(loaded.version).toBe(5)
    expect(loaded.activeMission?.activityIndex).toBe(0)
    expect(loaded.activeMission?.activityAttempts).toEqual({})
    expect(loaded.activeMission?.masteryEvidenceEarned).toEqual(['trust'])
  })
})
