import { describe, expect, it } from 'vitest'
import { missions } from '../../src/data/missions'
import { concepts } from '../../src/data/concepts'

describe('mission content', () => {
  it('uses unique IDs and valid concept and prerequisite references', () => {
    const missionIds = missions.map((mission) => mission.missionId)
    expect(new Set(missionIds).size).toBe(missionIds.length)
    for (const mission of missions) {
      expect(mission.activity.options.filter((option) => option.correct)).toHaveLength(1)
      for (const id of [...mission.concepts, ...mission.rewards.cyberDexEntries]) {
        expect(concepts[id], `${mission.missionId} references missing concept ${id}`).toBeDefined()
      }
      for (const evidence of mission.masteryEvidence) expect(concepts[evidence.conceptId]).toBeDefined()
      for (const prerequisite of mission.prerequisites) expect(missionIds).toContain(prerequisite)
    }
  })
})
