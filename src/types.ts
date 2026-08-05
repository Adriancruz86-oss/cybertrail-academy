export type ConceptStatus =
  | 'unknown'
  | 'exposed'
  | 'recognized'
  | 'applied'
  | 'reasoned'
  | 'competent'
  | 'mastered'

export type EvidenceType = 'exposure' | 'recognition' | 'application' | 'reasoning' | 'assessment'

export interface ConceptRecord {
  conceptId: string
  name: string
  fullName: string
  domain: string
  plainDefinition: string
  technicalDefinition: string
  whyItExists: string
  relatedConcepts: string[]
  commonMisconceptions: string[]
}

export interface MasteryEvidenceConfig {
  conceptId: string
  evidenceType: EvidenceType
  contextId: string
  firstAttemptRequired: boolean
  hintDisqualifies: boolean
  independent: boolean
}

export interface MissionActivityOption {
  id: string
  label: string
  correct: boolean
  explanation: string
}

export interface MissionActivity {
  type: 'classification' | 'configuration'
  prompt: string
  options: MissionActivityOption[]
}

export interface MissionInvestigation {
  evidenceId: string
  title: string
  body: string
  label?: string
  value?: string
  discoveryConcepts: string[]
}

export interface MissionData {
  missionId: string
  title: string
  description: string
  objectives: string[]
  prerequisites: string[]
  concepts: string[]
  briefing: string
  investigations: MissionInvestigation[]
  activity: MissionActivity
  hint: string
  debrief: string
  masteryEvidence: MasteryEvidenceConfig[]
  rewards: {
    xp: number
    cyberDexEntries: string[]
  }
}

export interface ConceptProgressState {
  status: ConceptStatus
  exposures: number
  applicationSuccesses: number
  reasoningSuccesses: number
  currentCompetencyStreak: number
  lastSuccessfulMissionId: string | null
  mistakes: Array<{ missionId: string; note: string; timestamp: number }>
  lastReviewed: number | null
  nextReview: number | null
}

export interface MissionAttemptState {
  attempts: number
  firstAttemptCorrect: boolean | null
  rewardGranted: boolean
}

export type MissionStage = 'briefing' | 'investigation' | 'decision' | 'feedback' | 'debrief'

export interface ActiveMissionState {
  missionId: string
  stage: MissionStage
  investigationIndex: number
  hintUsed: boolean
  selectedOptionId: string | null
  collectedEvidence: string[]
  decisions: Array<{ optionId: string; correct: boolean }>
  discoveredConcepts: string[]
  masteryEvidenceEarned: string[]
}

export interface SaveState {
  version: number
  playerId: string
  displayName: string
  rank: string
  xp: number
  completedMissions: string[]
  unlockedMissions: string[]
  missionAttempts: Record<string, MissionAttemptState>
  activeMission: ActiveMissionState | null
  conceptProgress: Record<string, ConceptProgressState>
  settings: {
    sound: boolean
    reducedMotion: boolean
    textSize: 'standard' | 'large'
  }
}
