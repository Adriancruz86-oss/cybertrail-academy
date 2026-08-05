import { describe, expect, it } from 'vitest'
import { TouchControlState } from '../../src/game/touchControls'

describe('TouchControlState', () => {
  it('tracks simultaneous presses and releases without sticking', () => {
    const controls = new TouchControlState()
    controls.press('up')
    controls.press('right')
    expect(controls.velocity(180)).toEqual({ x: 180, y: -180 })
    controls.release('up')
    expect(controls.velocity(180)).toEqual({ x: 180, y: 0 })
    controls.reset()
    expect(controls.velocity(180)).toEqual({ x: 0, y: 0 })
  })
})
