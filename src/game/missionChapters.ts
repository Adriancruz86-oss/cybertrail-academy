import type { SaveState } from '../types'

export interface MissionChapter {
  id: string
  title: string
  domain: string
  missionIds: string[]
}

export const missionChapters: MissionChapter[] = [
  { id: 'foundations', title: 'Security Foundations', domain: 'General Security & Threats', missionIds: ['splus-c1-m01', 'splus-c1-m02', 'splus-c1-m03'] },
  { id: 'trust', title: 'Certificates & Trust', domain: 'Security Architecture', missionIds: ['splus-c1-m04', 'splus-c1-m05', 'splus-c1-m06'] },
  { id: 'cryptography', title: 'Applied Cryptography', domain: 'Cryptography', missionIds: ['splus-c1-m07'] },
  { id: 'identity', title: 'Threats & Identity', domain: 'Threats, Vulnerabilities & Identity', missionIds: ['splus-c1-m08', 'splus-c1-m09'] },
  { id: 'operations', title: 'Detection & Response', domain: 'Security Operations', missionIds: ['splus-c1-m10', 'splus-c1-m11', 'splus-c1-m12'] }
]

export function getCurrentChapter(state: SaveState): MissionChapter {
  const focusMissionId = state.activeMission?.missionId
    ?? state.unlockedMissions.find((id) => !state.completedMissions.includes(id))
    ?? state.completedMissions[state.completedMissions.length - 1]
    ?? missionChapters[0].missionIds[0]
  return missionChapters.find((chapter) => chapter.missionIds.includes(focusMissionId)) ?? missionChapters[0]
}

export type MissionNavigatorStatus = 'current' | 'available' | 'completed' | 'locked'

export function getMissionNavigatorStatus(state: SaveState, missionId: string, prerequisites: string[]): MissionNavigatorStatus {
  if (state.activeMission?.missionId === missionId) return 'current'
  if (state.completedMissions.includes(missionId)) return 'completed'
  return prerequisites.every((id) => state.completedMissions.includes(id)) ? 'available' : 'locked'
}
