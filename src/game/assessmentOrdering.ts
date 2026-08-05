import type { MissionActivity, MissionActivityOption } from '../types'

function missionSequence(missionId: string) {
  const match = missionId.match(/m(\d+)$/)
  return match ? Number(match[1]) : 1
}

export function orderAssessmentOptions(activity: MissionActivity, missionId: string, activityIndex: number): MissionActivity {
  const correct = activity.options.find((option) => option.correct)
  if (!correct || activity.options.length < 2) return activity
  const incorrect = activity.options.filter((option) => option.id !== correct.id)
  const targetIndex = (missionSequence(missionId) + activityIndex) % activity.options.length
  const options: MissionActivityOption[] = [...incorrect]
  options.splice(targetIndex, 0, correct)
  return { ...activity, options }
}
