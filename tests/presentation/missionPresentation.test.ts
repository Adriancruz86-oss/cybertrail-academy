import { describe, expect, it } from 'vitest'
import { getMissionPresentation, getObjectiveBeaconLabel } from '../../src/game/missionPresentation'

describe('mission presentation', () => {
  it('uses the CWSS room for the opening mission and BrightPath afterward', () => {
    expect(getMissionPresentation('splus-c1-m01').roomKey).toBe('cwss-mission-room')
    expect(getMissionPresentation('splus-c1-m02').roomKey).toBe('brightpath-mission-room')
    expect(getMissionPresentation('splus-c1-m12').mentorName).toBe('Jordan Lee')
  })

  it('labels the first, next, and paused mission destinations clearly', () => {
    expect(getObjectiveBeaconLabel(null, 0)).toBe('START HERE')
    expect(getObjectiveBeaconLabel(null, 1)).toBe('NEXT MISSION')
    expect(getObjectiveBeaconLabel('splus-c1-m02', 1)).toBe('CURRENT MISSION')
  })
})
