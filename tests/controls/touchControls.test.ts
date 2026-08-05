import { describe, expect, it } from 'vitest'
import { JoystickState, TouchControlState } from '../../src/game/touchControls'

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

describe('JoystickState', () => {
  it('normalizes drag distance, supports diagonals, and resets cleanly', () => {
    const joystick = new JoystickState()
    joystick.update(30, 40, 50)
    expect(joystick.position()).toEqual({ x: 0.6, y: 0.8 })
    expect(joystick.velocity(100)).toEqual({ x: 60, y: 80 })

    joystick.update(120, 0, 50)
    expect(joystick.position()).toEqual({ x: 1, y: 0 })
    joystick.reset()
    expect(joystick.velocity(180)).toEqual({ x: 0, y: 0 })
  })
})
