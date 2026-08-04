import { missions } from '../data/missions'
import { concepts } from '../data/concepts'
import type { ConceptRecord, MissionData } from '../types'

export const ContentService = {
  getMission(missionId: string): MissionData | undefined {
    return missions.find((mission) => mission.missionId === missionId)
  },

  getNextMission(currentMissionId: string): MissionData | undefined {
    const index = missions.findIndex((mission) => mission.missionId === currentMissionId)
    return index >= 0 && index + 1 < missions.length ? missions[index + 1] : undefined
  },

  getAllMissions(): MissionData[] {
    return [...missions]
  },

  getConcept(conceptId: string): ConceptRecord | undefined {
    return concepts[conceptId]
  },

  getAllConcepts(): Record<string, ConceptRecord> {
    return concepts
  }
}