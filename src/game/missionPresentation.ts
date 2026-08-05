export interface MissionPresentation {
  roomKey: 'cwss-mission-room' | 'brightpath-mission-room'
  mentorName: string
  mentorRole: string
  accent: number
}

const cwssPresentation: MissionPresentation = {
  roomKey: 'cwss-mission-room',
  mentorName: 'Maya Rivera',
  mentorRole: 'CWSS Operations Lead',
  accent: 0x62c7ff
}

const brightPathPresentation: MissionPresentation = {
  roomKey: 'brightpath-mission-room',
  mentorName: 'Jordan Lee',
  mentorRole: 'BrightPath Security Mentor',
  accent: 0xffc96b
}

export function getMissionPresentation(missionId: string): MissionPresentation {
  return missionId === 'splus-c1-m01' ? cwssPresentation : brightPathPresentation
}

export function getObjectiveBeaconLabel(activeMissionId: string | null, completedMissionCount: number) {
  if (activeMissionId) return 'CURRENT MISSION'
  return completedMissionCount === 0 ? 'START HERE' : 'NEXT MISSION'
}
