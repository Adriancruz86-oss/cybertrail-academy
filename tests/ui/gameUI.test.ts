import { describe, expect, it } from 'vitest'
import { GameUI } from '../../src/ui/GameUI'
import { createDefaultSave } from '../../src/services/saveService'

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
})
