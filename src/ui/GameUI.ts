import type { MissionData, ConceptRecord, SaveState, MissionActivity, MissionActivityOption } from '../types'
import { SaveService } from '../services/saveService'
import { getAchievements, getCampaignCompletion, getCurrentChapter, getMissionNavigatorStatus, missionChapters } from '../game/missionChapters'

type ScreenName = 'mission' | 'cyberdex' | 'progress' | 'settings'

export class GameUI {
  private static instance: GameUI | null = null
  private root: HTMLElement
  private statusPanel: HTMLElement
  private missionPanel: HTMLElement
  private cyberdexPanel: HTMLElement
  private competencyPanel: HTMLElement
  private settingsPanel: HTMLElement
  private overlay: HTMLElement
  private overlayTitle: HTMLElement
  private notificationPanel: HTMLElement
  private decisionOverlay: HTMLElement
  private resultsOverlay: HTMLElement
  private missionExitButton: HTMLButtonElement

  private constructor() {
    this.root = document.createElement('div')
    this.root.id = 'game-ui'
    this.root.innerHTML = `
      <header class="game-hud">
        <div class="status-panel" aria-live="polite"></div>
        <nav class="game-nav" aria-label="Game menu">
          <button data-screen="mission">Mission</button>
          <button data-screen="cyberdex">CyberDex</button>
          <button data-screen="progress">Progress</button>
          <button data-screen="settings">Settings</button>
        </nav>
      </header>
      <div class="screen-overlay" aria-hidden="true">
        <section class="screen-dialog" role="dialog" aria-modal="true" aria-labelledby="screen-title">
          <header class="screen-header">
            <h1 id="screen-title">Mission</h1>
            <button class="screen-close" aria-label="Return to game">×</button>
          </header>
          <div class="screen-body">
            <section class="mission-panel screen-content" data-content="mission"></section>
            <section class="cyberdex-content screen-content" data-content="cyberdex"></section>
            <section class="competency-content screen-content" data-content="progress"></section>
            <section class="settings-content screen-content" data-content="settings"></section>
          </div>
        </section>
      </div>
      <button class="mission-exit-button" aria-label="Exit mission" title="Exit mission">×</button>
      <section class="decision-overlay" aria-hidden="true" aria-labelledby="decision-prompt">
        <div class="decision-dialog">
          <div class="decision-kicker">Make a decision</div>
          <h1 id="decision-prompt"></h1>
          <div class="decision-options"></div>
          <button class="decision-hint"></button>
        </div>
      </section>
      <section class="results-overlay" aria-hidden="true" aria-labelledby="results-title">
        <div class="results-dialog" role="dialog" aria-modal="true">
          <div class="results-kicker">Mission complete</div>
          <h1 id="results-title"></h1>
          <div class="results-summary"></div>
          <button class="results-return">Return to campus</button>
        </div>
      </section>
      <div class="notification-panel" aria-live="assertive"></div>
    `
    document.body.appendChild(this.root)
    this.statusPanel = this.root.querySelector('.status-panel') as HTMLElement
    this.missionPanel = this.root.querySelector('.mission-panel') as HTMLElement
    this.cyberdexPanel = this.root.querySelector('.cyberdex-content') as HTMLElement
    this.competencyPanel = this.root.querySelector('.competency-content') as HTMLElement
    this.settingsPanel = this.root.querySelector('.settings-content') as HTMLElement
    this.overlay = this.root.querySelector('.screen-overlay') as HTMLElement
    this.overlayTitle = this.root.querySelector('#screen-title') as HTMLElement
    this.notificationPanel = this.root.querySelector('.notification-panel') as HTMLElement
    this.decisionOverlay = this.root.querySelector('.decision-overlay') as HTMLElement
    this.resultsOverlay = this.root.querySelector('.results-overlay') as HTMLElement
    this.missionExitButton = this.root.querySelector('.mission-exit-button') as HTMLButtonElement

    this.root.querySelectorAll<HTMLButtonElement>('[data-screen]').forEach((button) => {
      button.addEventListener('click', () => this.openScreen(button.dataset.screen as ScreenName))
    })
    this.root.querySelector('.screen-close')?.addEventListener('click', () => this.closeScreen())
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') this.closeScreen() })
  }

  static init(): GameUI {
    if (!GameUI.instance) GameUI.instance = new GameUI()
    return GameUI.instance
  }

  static get(): GameUI { return GameUI.init() }

  openScreen(screen: ScreenName) {
    const titles: Record<ScreenName, string> = {
      mission: 'Mission', cyberdex: 'CyberDex', progress: 'Competency & Achievements', settings: 'Settings'
    }
    this.overlayTitle.textContent = titles[screen]
    this.root.querySelectorAll<HTMLElement>('.screen-content').forEach((content) => {
      content.classList.toggle('active', content.dataset.content === screen)
    })
    this.overlay.setAttribute('aria-hidden', 'false')
    this.overlay.classList.add('visible')
    this.missionExitButton.classList.add('screen-covered')
    ;(this.root.querySelector('.screen-close') as HTMLButtonElement).focus()
  }

  closeScreen() {
    this.overlay.setAttribute('aria-hidden', 'true')
    this.overlay.classList.remove('visible')
    this.missionExitButton.classList.remove('screen-covered')
  }

  showMissionExit(onExit: () => void) {
    this.missionExitButton.classList.add('visible')
    this.missionExitButton.onclick = onExit
  }

  hideMissionExit() {
    this.missionExitButton.classList.remove('visible')
    this.missionExitButton.onclick = null
  }

  showDecision(args: {
    activity: MissionActivity
    hint: string
    hintUsed: boolean
    onSelect: (option: MissionActivityOption) => void
    onHint: () => void
  }) {
    ;(this.decisionOverlay.querySelector('#decision-prompt') as HTMLElement).textContent = args.activity.prompt
    const options = this.decisionOverlay.querySelector('.decision-options') as HTMLElement
    options.innerHTML = ''
    args.activity.options.forEach((option, index) => {
      const button = document.createElement('button')
      button.className = 'decision-option'
      button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span><strong>${option.label}</strong>`
      button.addEventListener('click', () => {
        options.querySelectorAll('button').forEach((item) => { (item as HTMLButtonElement).disabled = true })
        args.onSelect(option)
      }, { once: true })
      options.appendChild(button)
    })
    const hintButton = this.decisionOverlay.querySelector('.decision-hint') as HTMLButtonElement
    hintButton.textContent = args.hintUsed ? `Hint: ${args.hint}` : 'Show hint'
    hintButton.onclick = args.hintUsed ? null : args.onHint
    this.decisionOverlay.setAttribute('aria-hidden', 'false')
    this.decisionOverlay.classList.add('visible')
  }

  hideDecision() {
    this.decisionOverlay.setAttribute('aria-hidden', 'true')
    this.decisionOverlay.classList.remove('visible')
  }

  showMissionResults(args: {
    title: string
    evidence: string[]
    discoveries: string[]
    mastery: string[]
    decisions: number
    correct: number
    xp: number
    campaignComplete?: boolean
    onReturn: () => void
  }) {
    ;(this.resultsOverlay.querySelector('.results-kicker') as HTMLElement).textContent = args.campaignComplete ? 'Campaign complete' : 'Mission complete'
    ;(this.resultsOverlay.querySelector('#results-title') as HTMLElement).textContent = args.campaignComplete ? 'Public Web District secured' : args.title
    const summary = this.resultsOverlay.querySelector('.results-summary') as HTMLElement
    const list = (items: string[], empty: string) => items.length ? items.map((item) => `<li>${item}</li>`).join('') : `<li>${empty}</li>`
    summary.innerHTML = `
      ${args.campaignComplete ? '<div class="campaign-congratulations"><strong>First Response complete</strong><span>You finished all 15 missions and the district assessment.</span></div>' : ''}
      <div class="results-stats"><strong>${args.correct}/${args.decisions}</strong><span>correct decisions</span><strong>+${args.xp}</strong><span>mission XP value</span></div>
      <section><h2>Evidence collected</h2><ul>${list(args.evidence, 'No evidence recorded')}</ul></section>
      <section><h2>CyberDex discoveries</h2><ul>${list(args.discoveries, 'No new discoveries')}</ul></section>
      <section><h2>Mastery evidence</h2><ul>${list(args.mastery, 'No qualifying mastery evidence')}</ul></section>
    `
    const button = this.resultsOverlay.querySelector('.results-return') as HTMLButtonElement
    button.textContent = args.campaignComplete ? 'Return to campus and view progress' : 'Return to campus'
    button.onclick = args.onReturn
    this.resultsOverlay.setAttribute('aria-hidden', 'false')
    this.resultsOverlay.classList.add('visible')
    button.focus()
  }

  hideMissionResults() {
    this.resultsOverlay.setAttribute('aria-hidden', 'true')
    this.resultsOverlay.classList.remove('visible')
  }

  updateStatus(state: SaveState) {
    document.documentElement.dataset.textSize = state.settings.textSize
    document.documentElement.dataset.reducedMotion = String(state.settings.reducedMotion)
    this.statusPanel.innerHTML = `<strong>${state.displayName}</strong><span>${state.rank.replace(/-/g, ' ')}</span><span>${state.xp} XP</span>`
    this.settingsPanel.innerHTML = `
      <div class="settings-grid">
        <article><h2>Readability</h2><p>Adjust interface text throughout the game.</p><button data-setting="text">${state.settings.textSize === 'large' ? 'Use standard text' : 'Use large text'}</button></article>
        <article><h2>Motion</h2><p>Reduce nonessential transitions and animation.</p><button data-setting="motion">${state.settings.reducedMotion ? 'Enable motion' : 'Reduce motion'}</button></article>
        <article class="danger-zone"><h2>Reset progress</h2><p>Erase missions, XP, CyberDex, and competency progress on this device.</p><button data-setting="reset">Reset progress</button></article>
      </div>
    `
    this.settingsPanel.querySelector('[data-setting="text"]')?.addEventListener('click', () => {
      this.updateStatus(SaveService.update((save) => { save.settings.textSize = save.settings.textSize === 'large' ? 'standard' : 'large' }))
    })
    this.settingsPanel.querySelector('[data-setting="motion"]')?.addEventListener('click', () => {
      this.updateStatus(SaveService.update((save) => { save.settings.reducedMotion = !save.settings.reducedMotion }))
    })
    this.settingsPanel.querySelector('[data-setting="reset"]')?.addEventListener('click', () => {
      if (window.confirm('Reset all mission, mastery, CyberDex, and XP progress? This cannot be undone.')) {
        SaveService.reset()
        window.location.reload()
      }
    })
  }

  updateMissionNavigator(missions: MissionData[], state: SaveState, onLaunch: (missionId: string) => void) {
    const chapter = getCurrentChapter(state)
    const chapterMissions = chapter.missionIds.map((id) => missions.find((mission) => mission.missionId === id)).filter(Boolean) as MissionData[]
    this.missionPanel.innerHTML = `
      <div class="chapter-heading"><span>Current chapter · ${chapter.domain}</span><h2>${chapter.title}</h2><p>Completed missions remain replayable. Locked missions open as you progress through this chapter.</p></div>
      <div class="mission-list">${chapterMissions.map((mission, index) => {
        const status = getMissionNavigatorStatus(state, mission.missionId, mission.prerequisites)
        const action = status === 'locked' ? 'Locked' : status === 'current' ? 'Resume' : status === 'completed' ? 'Replay' : 'Start'
        return `<article class="mission-card mission-${status}"><div class="mission-number">${index + 1}</div><div><span>${status}</span><h3>${mission.title}</h3><p>${mission.description}</p></div><button data-mission-id="${mission.missionId}" ${status === 'locked' ? 'disabled' : ''}>${action}</button></article>`
      }).join('')}</div>
    `
    this.missionPanel.querySelectorAll<HTMLButtonElement>('[data-mission-id]').forEach((button) => {
      button.addEventListener('click', () => {
        const missionId = button.dataset.missionId!
        if (state.activeMission && state.activeMission.missionId !== missionId && !window.confirm('Switch missions? Your current in-mission stage will be replaced.')) return
        this.closeScreen()
        onLaunch(missionId)
      })
    })
  }

  updateCyberDex(concepts: Record<string, ConceptRecord>, progress: SaveState['conceptProgress']) {
    const entries = Object.values(concepts).filter((concept) => Boolean(progress[concept.conceptId] && progress[concept.conceptId].status !== 'unknown'))
    this.cyberdexPanel.innerHTML = entries.length ? `<div class="library-grid">${entries.map((concept) => {
      const status = progress[concept.conceptId]?.status ?? 'unknown'
      return `<article class="cyberdex-card"><div class="card-kicker">${concept.domain.replace(/-/g, ' ')}</div><h2>${concept.name}</h2><div class="status-pill">${status}</div><p>${concept.plainDefinition}</p><small>Related: ${concept.relatedConcepts.slice(0, 3).join(', ')}</small></article>`
    }).join('')}</div>` : '<div class="empty-state"><h2>No discoveries yet</h2><p>Investigate mission evidence to build your CyberDex.</p></div>'
  }

  updateCompetencyMatrix(concepts: Record<string, ConceptRecord>, progress: SaveState['conceptProgress'], state: SaveState) {
    const entries = Object.values(concepts).filter((concept) => Boolean(progress[concept.conceptId] && progress[concept.conceptId].status !== 'unknown'))
    const competent = entries.filter((concept) => ['competent', 'mastered'].includes(progress[concept.conceptId]?.status)).length
    const campaign = getCampaignCompletion(state)
    const achievements = getAchievements(state)
    const currentChapterIndex = missionChapters.indexOf(getCurrentChapter(state))
    this.competencyPanel.innerHTML = `
      <div class="progress-summary"><span>First Response campaign</span><strong>${campaign.percent}% complete</strong><p>${campaign.completed} of ${campaign.total} missions · ${competent} competencies · ${entries.length} concepts encountered</p><div class="campaign-progress"><i style="width:${campaign.percent}%"></i></div></div>
      <section class="achievement-section"><h2>Achievements</h2>${achievements.length ? `<div class="achievement-grid">${achievements.map((achievement) => `<article><span>◆</span><div><strong>${achievement.title}</strong><p>${achievement.description}</p></div></article>`).join('')}</div>` : '<p>Complete your first mission to earn an achievement.</p>'}</section>
      <section class="chapter-progress"><h2>Chapter progress</h2>${missionChapters.slice(0, currentChapterIndex + 1).map((chapter) => { const complete = chapter.missionIds.filter((id) => state.completedMissions.includes(id)).length; return `<div><strong>${chapter.title}</strong><span>${complete}/${chapter.missionIds.length}</span></div>` }).join('')}</section>
      ${entries.length ? `<div class="competency-grid">${entries.map((concept) => {
        const status = progress[concept.conceptId]?.status ?? 'unknown'
        return `<article class="competency-tile competency-${status}"><div><strong>${concept.name}</strong><small>${concept.domain.replace(/-/g, ' ')}</small></div><span>${status}</span></article>`
      }).join('')}</div>` : '<div class="empty-state"><p>Your competency record will appear as you complete missions.</p></div>'}
    `
  }

  showNotification(message: string) {
    this.notificationPanel.textContent = message
    this.notificationPanel.classList.add('visible')
    window.clearTimeout((this.notificationPanel as any)._timeout)
    ;(this.notificationPanel as any)._timeout = window.setTimeout(() => this.notificationPanel.classList.remove('visible'), 3500)
  }
}
