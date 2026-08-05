import { describe, expect, it } from 'vitest'
import { getMissionPresentation } from '../../src/game/missionPresentation'

describe('mission presentation', () => {
  it('uses the CWSS room for the opening mission and BrightPath afterward', () => {
    expect(getMissionPresentation('splus-c1-m01').roomKey).toBe('cwss-mission-room')
    expect(getMissionPresentation('splus-c1-m02').roomKey).toBe('brightpath-mission-room')
    expect(getMissionPresentation('splus-c1-m12').mentorName).toBe('Jordan Lee')
  })
})
