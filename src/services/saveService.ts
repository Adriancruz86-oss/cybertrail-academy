import type { SaveState, ConceptProgressState } from '../types'

const STORAGE_KEY = 'cybertrail-save-v1'

function createDefaultProgress(): ConceptProgressState {
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

function createDefaultSave(): SaveState {
  return {
    version: 1,
    playerId: 'local-player',
    displayName: 'Analyst',
    rank: 'analyst-trainee',
    xp: 0,
    completedMissions: [],
    unlockedMissions: ['splus-c1-m01'],
    conceptProgress: {},
    settings: {
      sound: true,
      reducedMotion: false,
      textSize: 'standard'
    }
  }
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
        currentState = JSON.parse(raw) as SaveState
        if (currentState.version !== 1) {
          currentState = createDefaultSave()
        }
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

  get(): SaveState {
    return this.load()
  },

  update(mutator: (state: SaveState) => void): SaveState {
    const state = this.get()
    mutator(state)
    return this.save(state)
  },

  completeMission(missionId: string): SaveState {
    return this.update((state) => {
      if (!state.completedMissions.includes(missionId)) {
        state.completedMissions.push(missionId)
      }
    })
  },

  unlockMission(missionId: string): SaveState {
    return this.update((state) => {
      if (!state.unlockedMissions.includes(missionId)) {
        state.unlockedMissions.push(missionId)
      }
    })
  },

  addXp(amount: number): SaveState {
    return this.update((state) => {
      state.xp += amount
    })
  },

  ensureConceptProgress(conceptId: string): ConceptProgressState {
    const state = this.get()
    if (!state.conceptProgress[conceptId]) {
      state.conceptProgress[conceptId] = createDefaultProgress()
      this.save(state)
    }
    return state.conceptProgress[conceptId]
  }
}