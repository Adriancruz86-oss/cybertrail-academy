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
