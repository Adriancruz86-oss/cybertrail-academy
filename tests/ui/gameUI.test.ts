import { describe, expect, it } from 'vitest'
import { GameUI } from '../../src/ui/GameUI'
import { createDefaultSave } from '../../src/services/saveService'
import type { MissionActivity } from '../../src/types'
import { missions } from '../../src/data/missions'

describe('GameUI navigation', () => {
  it('opens dedicated screens and returns focus to gameplay', () => {
    const ui = GameUI.init()
    ui.updateStatus(createDefaultSave())

    const overlay = document.querySelector('.screen-overlay') as HTMLElement
    expect(overlay.getAttribute('aria-hidden')).toBe('true')

    ;(document.querySelector('[data-screen="cyberdex"]') as HTMLButtonElement).click()
    expect(overlay.getAttribute('aria-hidden')).toBe('false')
    expect(document.querySelector('[data-content="cyberdex"]')?.classList.contains('active')).toBe(true)

    ;(document.querySelector('.screen-close') as HTMLButtonElement).click()
    expect(overlay.getAttribute('aria-hidden')).toBe('true')
  })

  it('offers reliable decision choices, hints, and mission exit controls', () => {
    const ui = GameUI.get()
    const activity: MissionActivity = {
      type: 'classification',
      prompt: 'Which response contains the incident?',
      options: [
        { id: 'a', label: 'Isolate the affected device', correct: true, explanation: 'Correct' },
        { id: 'b', label: 'Ignore the alert', correct: false, explanation: 'Incorrect' }
      ]
    }
    let selected = ''
    let hintRequested = false
    ui.showDecision({
      activity,
      hint: 'Contain before recovery.',
      hintUsed: false,
      onSelect: (option) => { selected = option.id },
      onHint: () => { hintRequested = true }
    })

    const decision = document.querySelector('.decision-overlay') as HTMLElement
    const choices = Array.from(document.querySelectorAll<HTMLButtonElement>('.decision-option'))
    expect(decision.getAttribute('aria-hidden')).toBe('false')
    expect(choices).toHaveLength(2)
    expect(choices[0].getAttribute('aria-label')).toBe('Option A: Isolate the affected device')
    choices[0].click()
    choices[0].click()
    expect(selected).toBe('a')
    expect(choices.every((choice) => choice.disabled)).toBe(true)
    ;(document.querySelector('.decision-hint') as HTMLButtonElement).click()
    expect(hintRequested).toBe(true)
    ui.hideDecision()
    expect(decision.getAttribute('aria-hidden')).toBe('true')

    let exited = false
    ui.showMissionExit(() => { exited = true })
    const exit = document.querySelector('.mission-exit-button') as HTMLButtonElement
    expect(exit.textContent).toBe('×')
    ui.openScreen('settings')
    expect(exit.classList.contains('screen-covered')).toBe(true)
    ui.closeScreen()
    expect(exit.classList.contains('screen-covered')).toBe(false)
    exit.click()
    expect(exited).toBe(true)
    ui.hideMissionExit()
    expect(exit.classList.contains('visible')).toBe(false)
  })

  it('renders chapter missions and a separate mission-results panel', () => {
    const ui = GameUI.get()
    const state = createDefaultSave()
    state.completedMissions.push('splus-c1-m01')
    let launched = ''
    ui.updateMissionNavigator(missions, state, (missionId) => { launched = missionId })
    expect(document.querySelectorAll('.mission-card')).toHaveLength(3)
    expect(document.querySelector('.mission-completed button')?.textContent).toBe('Replay')
    ;(document.querySelector('.mission-available button') as HTMLButtonElement).click()
    expect(launched).toBe('splus-c1-m02')

    let returned = false
    ui.showMissionResults({ title: 'Welcome to the SOC', evidence: ['Incident board'], discoveries: ['Asset'], mastery: [], decisions: 1, correct: 1, xp: 70, onReturn: () => { returned = true } })
    const results = document.querySelector('.results-overlay') as HTMLElement
    expect(results.getAttribute('aria-hidden')).toBe('false')
    expect(document.querySelector('.results-summary')?.textContent).toContain('Incident board')
    ;(document.querySelector('.results-return') as HTMLButtonElement).click()
    expect(returned).toBe(true)
    ui.hideMissionResults()
  })

  it('allows browsing completed chapters without exposing future chapters', () => {
    const ui = GameUI.get()
    const state = createDefaultSave()
    state.completedMissions.push('splus-c1-m01', 'splus-c1-m02', 'splus-c1-m03')
    state.unlockedMissions.push('splus-c1-m04')
    ui.updateMissionNavigator(missions, state, () => {})
    const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-chapter-id]'))
    expect(tabs.map((tab) => tab.textContent)).toEqual(['Security Foundations', 'Certificates & Trust'])
    tabs[0].click()
    expect(document.querySelector('.chapter-heading h2')?.textContent).toBe('Security Foundations')
    expect(document.querySelectorAll('.mission-card')).toHaveLength(3)
  })
})
