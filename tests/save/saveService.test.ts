import { beforeEach, describe, expect, it } from 'vitest'
import { SaveService, createDefaultSave } from '../../src/services/saveService'

describe('SaveService', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('persists and restores save state', () => {
    const state = SaveService.reset()
    state.xp = 120
    state.activeMission = { missionId: 'splus-c1-m01', stage: 'investigation', investigationIndex: 1, hintUsed: false, selectedOptionId: null, collectedEvidence: ['incident-board'], decisions: [], discoveredConcepts: ['risk'], masteryEvidenceEarned: [] }
    SaveService.save(state)

    const loaded = SaveService.reload()
    expect(loaded.xp).toBe(120)
    expect(loaded.playerId).toBe('local-player')
    expect(loaded.unlockedMissions).toContain('splus-c1-m01')
    expect(loaded.activeMission?.investigationIndex).toBe(1)
    expect(loaded.activeMission?.collectedEvidence).toEqual(['incident-board'])
  })

  it('migrates a Sprint 3 active mission without losing progress', () => {
    const old = createDefaultSave()
    window.localStorage.setItem('cybertrail-save-v1', JSON.stringify({
      ...old, version: 3, xp: 330,
      activeMission: { missionId: 'splus-c1-m03', stage: 'decision', investigationIndex: 1, hintUsed: false, selectedOptionId: null }
    }))
    const loaded = SaveService.reload()
    expect(loaded.version).toBe(4)
    expect(loaded.xp).toBe(330)
    expect(loaded.activeMission?.collectedEvidence).toEqual([])
    expect(loaded.activeMission?.decisions).toEqual([])
  })
})
