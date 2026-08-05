import { describe, expect, it } from 'vitest'
import { GameUI } from '../../src/ui/GameUI'
import { createDefaultSave } from '../../src/services/saveService'
import type { MissionActivity } from '../../src/types'

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
    exit.click()
    expect(exited).toBe(true)
    ui.hideMissionExit()
    expect(exit.classList.contains('visible')).toBe(false)
  })
})
