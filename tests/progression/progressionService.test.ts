import { describe, expect, it } from 'vitest'
import { createDefaultSave } from '../../src/services/saveService'
import { ProgressionService } from '../../src/services/progressionService'

describe('ProgressionService', () => {
  it('enforces prerequisites and awards a mission only once', () => {
    const state = createDefaultSave()
    expect(ProgressionService.isAvailable(state, 'splus-c1-m02')).toBe(false)
    expect(ProgressionService.recordAttempt(state, 'splus-c1-m01', true)).toBe(true)
    expect(ProgressionService.complete(state, 'splus-c1-m01', 70)).toBe(true)
    expect(ProgressionService.complete(state, 'splus-c1-m01', 70)).toBe(false)
    expect(state.xp).toBe(70)
    expect(ProgressionService.isAvailable(state, 'splus-c1-m02')).toBe(true)
  })

  it('persists whether an attempt is actually the first attempt', () => {
    const state = createDefaultSave()
    expect(ProgressionService.recordAttempt(state, 'splus-c1-m01', false)).toBe(true)
    expect(ProgressionService.recordAttempt(state, 'splus-c1-m01', true)).toBe(false)
    expect(state.missionAttempts['splus-c1-m01'].firstAttemptCorrect).toBe(false)
  })
})
