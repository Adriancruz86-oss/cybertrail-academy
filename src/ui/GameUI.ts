import type { MissionData, ConceptRecord, SaveState } from '../types'
import { SaveService } from '../services/saveService'

export class GameUI {
  private static instance: GameUI | null = null
  private root: HTMLElement
  private statusPanel: HTMLElement
  private missionPanel: HTMLElement
  private cyberdexPanel: HTMLElement
  private competencyPanel: HTMLElement
  private notificationPanel: HTMLElement

  private constructor() {
    this.root = document.createElement('div')
    this.root.id = 'game-ui'
    this.root.innerHTML = `
      <section class="status-panel" aria-live="polite"></section>
      <section class="mission-panel"></section>
      <section class="sidebar-panel">
        <div class="panel-header">CyberDex</div>
        <div class="cyberdex-content"></div>
        <div class="panel-header">Competency Matrix</div>
        <div class="competency-content"></div>
      </section>
      <div class="notification-panel" aria-live="assertive"></div>
    `
    document.body.appendChild(this.root)
    this.statusPanel = this.root.querySelector('.status-panel') as HTMLElement
    this.missionPanel = this.root.querySelector('.mission-panel') as HTMLElement
    this.cyberdexPanel = this.root.querySelector('.cyberdex-content') as HTMLElement
    this.competencyPanel = this.root.querySelector('.competency-content') as HTMLElement
    this.notificationPanel = this.root.querySelector('.notification-panel') as HTMLElement
  }

  static init(): GameUI {
    if (!GameUI.instance) {
      GameUI.instance = new GameUI()
    }
    return GameUI.instance
  }

  static get(): GameUI {
    return GameUI.init()
  }

  updateStatus(state: SaveState) {
    document.documentElement.dataset.textSize = state.settings.textSize
    document.documentElement.dataset.reducedMotion = String(state.settings.reducedMotion)
    this.statusPanel.innerHTML = `
      <div class="status-card"><strong>Analyst:</strong> ${state.displayName}</div>
      <div class="status-card"><strong>Rank:</strong> ${state.rank.replace(/-/g, ' ')}</div>
      <div class="status-card"><strong>XP:</strong> ${state.xp}</div>
      <button class="setting-button" data-setting="text">${state.settings.textSize === 'large' ? 'Standard text' : 'Large text'}</button>
      <button class="setting-button" data-setting="motion">${state.settings.reducedMotion ? 'Enable motion' : 'Reduce motion'}</button>
    `
    this.statusPanel.querySelector('[data-setting="text"]')?.addEventListener('click', () => {
      const updated = SaveService.update((save) => {
        save.settings.textSize = save.settings.textSize === 'large' ? 'standard' : 'large'
      })
      this.updateStatus(updated)
    })
    this.statusPanel.querySelector('[data-setting="motion"]')?.addEventListener('click', () => {
      const updated = SaveService.update((save) => {
        save.settings.reducedMotion = !save.settings.reducedMotion
      })
      this.updateStatus(updated)
    })
  }

  updateMissionLog(mission?: MissionData) {
    if (!mission) {
      this.missionPanel.innerHTML = `
        <div class="panel-header">Mission log</div>
        <p>No active mission selected.</p>
      `
      return
    }

    this.missionPanel.innerHTML = `
      <div class="panel-header">Mission log</div>
      <h2>${mission.title}</h2>
      <p>${mission.description}</p>
      <div class="mission-objectives">
        ${mission.objectives.map((objective) => `<div class="objective">• ${objective}</div>`).join('')}
      </div>
    `
  }

  updateCyberDex(concepts: Record<string, ConceptRecord>, progress: SaveState['conceptProgress']) {
    const entries = Object.values(concepts)
      .filter((concept) => Boolean(progress[concept.conceptId] && progress[concept.conceptId].status !== 'unknown'))
      .slice(0, 8)

    if (entries.length === 0) {
      this.cyberdexPanel.innerHTML = '<p class="empty-state">No concepts discovered yet.</p>'
      return
    }

    this.cyberdexPanel.innerHTML = entries
      .map((concept) => {
        const status = progress[concept.conceptId]?.status ?? 'unknown'
        return `
          <article class="cyberdex-card">
            <div class="cyberdex-title">${concept.name}</div>
            <div class="cyberdex-status">${status}</div>
            <p>${concept.plainDefinition}</p>
          </article>
        `
      })
      .join('')
  }

  updateCompetencyMatrix(concepts: Record<string, ConceptRecord>, progress: SaveState['conceptProgress']) {
    const tiles = Object.values(concepts)
      .filter((concept) => Boolean(progress[concept.conceptId] && progress[concept.conceptId].status !== 'unknown'))
      .slice(0, 12)

    if (tiles.length === 0) {
      this.competencyPanel.innerHTML = '<p class="empty-state">No competency progress yet.</p>'
      return
    }

    this.competencyPanel.innerHTML = tiles
      .map((concept) => {
        const status = progress[concept.conceptId]?.status ?? 'unknown'
        return `<div class="competency-tile competency-${status}">${concept.name}<span>${status}</span></div>`
      })
      .join('')
  }

  showNotification(message: string) {
    this.notificationPanel.textContent = message
    this.notificationPanel.classList.add('visible')
    window.clearTimeout((this.notificationPanel as any)._timeout)
    ;(this.notificationPanel as any)._timeout = window.setTimeout(() => {
      this.notificationPanel.classList.remove('visible')
    }, 3000)
  }
}
