export type Direction = 'up' | 'down' | 'left' | 'right'

export class TouchControlState {
  private active = new Set<Direction>()

  press(direction: Direction) { this.active.add(direction) }
  release(direction: Direction) { this.active.delete(direction) }
  reset() { this.active.clear() }

  velocity(speed: number) {
    return {
      x: (this.active.has('right') ? speed : 0) - (this.active.has('left') ? speed : 0),
      y: (this.active.has('down') ? speed : 0) - (this.active.has('up') ? speed : 0)
    }
  }
}

export class JoystickState {
  private normalizedX = 0
  private normalizedY = 0

  update(deltaX: number, deltaY: number, maxRadius: number) {
    if (maxRadius <= 0) {
      this.reset()
      return
    }
    const length = Math.hypot(deltaX, deltaY)
    const scale = length > maxRadius ? maxRadius / length : 1
    this.normalizedX = (deltaX * scale) / maxRadius
    this.normalizedY = (deltaY * scale) / maxRadius
  }

  reset() {
    this.normalizedX = 0
    this.normalizedY = 0
  }

  position() {
    return { x: this.normalizedX, y: this.normalizedY }
  }

  velocity(speed: number) {
    return { x: this.normalizedX * speed, y: this.normalizedY * speed }
  }
}
