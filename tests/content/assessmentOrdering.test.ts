import { describe, expect, it } from 'vitest'
import { missions } from '../../src/data/missions'
import { orderAssessmentOptions } from '../../src/game/assessmentOrdering'

describe('assessment option ordering', () => {
  it('is stable and distributes correct choices beyond option A', () => {
    const positions: number[] = []
    for (const mission of missions) {
      const activities = mission.activities ?? [mission.activity]
      activities.forEach((activity, index) => {
        const first = orderAssessmentOptions(activity, mission.missionId, index)
        const second = orderAssessmentOptions(activity, mission.missionId, index)
        expect(second.options.map((option) => option.id)).toEqual(first.options.map((option) => option.id))
        positions.push(first.options.findIndex((option) => option.correct))
      })
    }
    expect(new Set(positions)).toEqual(new Set([0, 1, 2, 3]))
    const mostCommon = Math.max(...[0, 1, 2, 3].map((position) => positions.filter((item) => item === position).length))
    expect(mostCommon / positions.length).toBeLessThan(0.45)
  })

  it('keeps answer identity and correctness intact after ordering', () => {
    const activity = missions[14].activities![4]
    const ordered = orderAssessmentOptions(activity, missions[14].missionId, 4)
    expect(ordered.options.find((option) => option.correct)?.id).toBe('report-lessons-monitor')
    expect(ordered.options.map((option) => option.id).sort()).toEqual(activity.options.map((option) => option.id).sort())
  })
})
