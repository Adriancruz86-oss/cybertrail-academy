export type ConceptStatus =
  | 'unknown'
  | 'exposed'
  | 'recognized'
  | 'applied'
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

export interface MissionData {
  missionId: string
  title: string
  description: string
  objectives: string[]
  prerequisites: string[]
  concepts: string[]
  activity: MissionActivity
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

export interface SaveState {
  version: number
  playerId: string
  displayName: string
  rank: string
  xp: number
  completedMissions: string[]
  unlockedMissions: string[]
  conceptProgress: Record<string, ConceptProgressState>
  settings: {
    sound: boolean
    reducedMotion: boolean
    textSize: 'standard' | 'large'
  }
}