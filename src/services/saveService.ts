import type { SaveState, ConceptProgressState } from '../types'

const STORAGE_KEY = 'cybertrail-save-v1'
const SAVE_VERSION = 3

export function createDefaultProgress(): ConceptProgressState {
  return {
    status: 'unknown',
    exposures: 0,
    applicationSuccesses: 0,
    reasoningSuccesses: 0,
    currentCompetencyStreak: 0,
    lastSuccessfulMissionId: null,
    mistakes: [],
    lastReviewed: null,
    nextReview: null
  }
}

export function createDefaultSave(): SaveState {
  return {
    version: SAVE_VERSION,
    playerId: 'local-player',
    displayName: 'Analyst',
    rank: 'analyst-trainee',
    xp: 0,
    completedMissions: [],
    unlockedMissions: ['splus-c1-m01'],
    missionAttempts: {},
    activeMission: null,
    conceptProgress: {},
    settings: {
      sound: true,
      reducedMotion: false,
      textSize: 'standard'
    }
  }
}

function migrateSave(value: unknown): SaveState {
  if (!value || typeof value !== 'object') return createDefaultSave()
  const candidate = value as Partial<SaveState>
  if (candidate.version === 1 || candidate.version === 2) {
    return {
      ...createDefaultSave(),
      ...candidate,
      version: SAVE_VERSION,
      missionAttempts: candidate.missionAttempts ?? {},
      activeMission: null
    }
  }
  if (candidate.version !== SAVE_VERSION) return createDefaultSave()
  return { ...createDefaultSave(), ...candidate, missionAttempts: candidate.missionAttempts ?? {}, activeMission: candidate.activeMission ?? null }
}

let currentState: SaveState | null = null

export const SaveService = {
  load(): SaveState {
    if (currentState) {
      return currentState
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        currentState = migrateSave(JSON.parse(raw))
      } else {
        currentState = createDefaultSave()
      }
    } catch {
      currentState = createDefaultSave()
    }

    this.save(currentState)
    return currentState
  },

  save(state?: SaveState): SaveState {
    if (state) {
      currentState = state
    }
    if (!currentState) {
      currentState = createDefaultSave()
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState))
    return currentState
  },

  reset(): SaveState {
    currentState = createDefaultSave()
    return this.save(currentState)
  },

  reload(): SaveState {
    currentState = null
    return this.load()
  },

  hasProgress(): boolean {
    const state = this.get()
    return state.xp > 0 || state.completedMissions.length > 0 || Object.keys(state.missionAttempts).length > 0
  },

  get(): SaveState {
    return this.load()
  },

  update(mutator: (state: SaveState) => void): SaveState {
    const state = this.get()
    mutator(state)
    return this.save(state)
  }
}
