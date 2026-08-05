import type { SaveState, EvidenceType, ConceptProgressState } from '../types'
import { createDefaultProgress } from './saveService'

function ensureProgress(state: SaveState, conceptId: string): ConceptProgressState {
  if (!state.conceptProgress[conceptId]) {
    state.conceptProgress[conceptId] = createDefaultProgress()
  }
  return state.conceptProgress[conceptId]
}

function updateStatusForCorrect(progress: ConceptProgressState, evidenceType: EvidenceType, now: number) {
  if (evidenceType === 'application') {
    progress.applicationSuccesses += 1
  }
  if (evidenceType === 'reasoning') {
    progress.reasoningSuccesses += 1
  }

  if (progress.status === 'competent' && progress.nextReview && now >= progress.nextReview) {
    progress.status = 'mastered'
  } else if (progress.currentCompetencyStreak >= 2) {
    progress.status = 'competent'
  } else if (evidenceType === 'reasoning' || evidenceType === 'assessment') {
    progress.status = 'reasoned'
  } else {
    progress.status = 'applied'
  }
  progress.lastReviewed = now
  progress.nextReview = now + 7 * 24 * 60 * 60 * 1000
}

export const MasteryService = {
  recordExposure(state: SaveState, conceptId: string): ConceptProgressState {
    const progress = ensureProgress(state, conceptId)
    progress.exposures += 1
    if (progress.status === 'unknown') {
      progress.status = 'exposed'
    }
    return progress
  },

  recordAttempt(state: SaveState, args: {
    conceptId: string
    missionId: string
    contextId?: string
    evidenceType: EvidenceType
    correct: boolean
    firstAttempt: boolean
    hintUsed: boolean
    independent: boolean
    now?: number
  }): ConceptProgressState {
    const progress = ensureProgress(state, args.conceptId)

    if (args.evidenceType === 'recognition' && args.correct && args.firstAttempt) {
      progress.status = 'recognized'
      return progress
    }

    const qualifying = args.firstAttempt && !args.hintUsed && args.independent
    if (!['application', 'reasoning', 'assessment'].includes(args.evidenceType)) {
      return progress
    }

    if (!args.correct) {
      if (args.independent) {
        progress.currentCompetencyStreak = 0
        progress.mistakes.push({ missionId: args.missionId, note: `Incorrect attempt for ${args.evidenceType}`, timestamp: Date.now() })
      }
      return progress
    }

    if (!qualifying) return progress

    const contextId = args.contextId ?? args.missionId
    const differentContext = progress.lastSuccessfulMissionId !== contextId
    if (differentContext) {
      progress.currentCompetencyStreak += 1
      progress.lastSuccessfulMissionId = contextId
    }

    updateStatusForCorrect(progress, args.evidenceType, args.now ?? Date.now())
    return progress
  }
}
