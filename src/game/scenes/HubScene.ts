import Phaser from 'phaser'
import { SaveService } from '../../services/saveService'
import { ContentService } from '../../services/contentService'
import { GameUI } from '../../ui/GameUI'
import { ProgressionService } from '../../services/progressionService'
import { TouchControlState, type Direction } from '../touchControls'

const PLAYER_SPEED = 180

export class HubScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  private keys!: Phaser.Types.Input.Keyboard.CursorKeys & { E: Phaser.Input.Keyboard.Key }
  private mayaZone!: Phaser.GameObjects.Rectangle
  private brightPathZone!: Phaser.GameObjects.Rectangle
  private promptText!: Phaser.GameObjects.Text
  private touchControls = new TouchControlState()

  constructor() {
    super('HubScene')
  }

  preload() {
    this.load.image('campus', new URL('../../assets/cybertrail-campus.webp', import.meta.url).href)
    this.load.image('analyst', new URL('../../assets/analyst-sprite.png', import.meta.url).href)
  }

  create() {
    this.cameras.main.setBackgroundColor(0x08181f)
    const { width, height } = this.scale

    this.add.image(width / 2, height / 2, 'campus').setDisplaySize(width, height)
    this.add.rectangle(width / 2, 42, width, 84, 0x071421, 0.72)
    this.add
      .text(34, 24, 'CYBERTRAIL CAMPUS', {
        fontFamily: 'Arial',
        fontSize: '22px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setShadow(1, 1, '#000000', 2)

    this.add.text(34, 53, 'Follow the objective marker to continue your assignment.', {
      fontFamily: 'Arial', fontSize: '14px', color: '#c7e9ff'
    })

    this.mayaZone = this.add
      .rectangle(245, 285, 135, 90, 0x2f80ed, 0)
    this.add
      .text(245, 255, 'CWSS HQ', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#0b2945cc',
        padding: { x: 10, y: 6 }
      })
      .setOrigin(0.5)

    this.add.circle(245, 300, 11, 0x54c7ff, 0.9).setStrokeStyle(3, 0xffffff)

    this.brightPathZone = this.add
      .rectangle(690, 270, 150, 100, 0x183252, 0)
    this.add
      .text(690, 235, 'BRIGHTPATH', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#3b291bcc',
        padding: { x: 10, y: 6 }
      })
      .setOrigin(0.5)

    this.add.circle(690, 285, 11, 0xffc857, 0.95).setStrokeStyle(3, 0xffffff)

    this.player = this.physics.add
      .image(480, 500, 'analyst')
      .setDisplaySize(62, 92)
      .setCollideWorldBounds(true)

    this.player.body.setSize(34, 30).setOffset(14, 60)

    this.player.body.setVelocity(0, 0)

   this.keys = this.input.keyboard!.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
      E: 'E'
    }) as any

    this.promptText = this.add
      .text(width / 2, height - 32, 'Move with WASD or touch • E or INTERACT at an entrance', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#071421d9',
        padding: { x: 14, y: 8 }
      })
      .setOrigin(0.5)

    this.createTouchControls()

    const saveState = SaveService.load()
    const activeMission = ProgressionService.getNextMission(saveState)

    GameUI.get().updateStatus(saveState)
    GameUI.get().updateMissionLog(activeMission)
    GameUI.get().updateCyberDex(ContentService.getAllConcepts(), saveState.conceptProgress)
    GameUI.get().updateCompetencyMatrix(ContentService.getAllConcepts(), saveState.conceptProgress)
    if (activeMission) {
      const destination = activeMission.missionId === 'splus-c1-m01' ? 'CWSS Headquarters' : 'BrightPath'
      GameUI.get().showNotification(`Next: ${activeMission.title}. Enter ${destination}.`)
    }
  }

  update() {
    if (!this.player || !this.keys) {
      return
    }

    const velocity = this.touchControls.velocity(PLAYER_SPEED)
    if (this.keys.left.isDown) velocity.x = -PLAYER_SPEED
    if (this.keys.right.isDown) velocity.x = PLAYER_SPEED
    if (this.keys.up.isDown) velocity.y = -PLAYER_SPEED
    if (this.keys.down.isDown) velocity.y = PLAYER_SPEED

    this.player.setVelocity(velocity.x, velocity.y)

    const nearby = this.findNearbyTarget()
    if (nearby) {
      const label = nearby === 'maya' ? 'enter CWSS Headquarters' : 'enter BrightPath'
      this.promptText.setText(`Press E or tap INTERACT to ${label}`)
      if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
        this.handleInteract(nearby)
      }
    } else {
      this.promptText.setText('Move with WASD or touch • E or INTERACT at an entrance')
    }
  }

  private createTouchControls() {
    const controls: Array<[number, number, string, Direction]> = [
      [60, 510, '◀', 'left'],
      [175, 510, '▶', 'right'],
      [60, 600, '▲', 'up'],
      [175, 600, '▼', 'down']
    ]
    controls.forEach(([x, y, label, direction]) => {
      const button = this.add.circle(x, y, 55, 0x071421, 0.72).setStrokeStyle(3, 0xb8e5ff, 0.9)
      button.setInteractive({ useHandCursor: true })
      this.add.text(x, y, label, { fontSize: '30px', color: '#ffffff' }).setOrigin(0.5)
      button.on('pointerdown', () => this.touchControls.press(direction))
      const stop = () => this.touchControls.release(direction)
      button.on('pointerup', stop)
      button.on('pointerout', stop)
    })

    const interact = this.add.circle(852, 550, 72, 0x146fb0, 0.88).setStrokeStyle(3, 0xffffff, 0.9)
    interact.setInteractive({ useHandCursor: true })
    this.add.text(852, 550, 'INTERACT', { fontSize: '17px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5)
    interact.on('pointerdown', () => {
      const nearby = this.findNearbyTarget()
      if (nearby) this.handleInteract(nearby)
    })
  }

  private findNearbyTarget(): 'maya' | 'brightpath' | null {
    const distanceToMaya = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.mayaZone.x,
      this.mayaZone.y
    )
    if (distanceToMaya < 100) {
      return 'maya'
    }

    const distanceToBrightPath = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.brightPathZone.x,
      this.brightPathZone.y
    )
    return distanceToBrightPath < 100 ? 'brightpath' : null
  }

  private handleInteract(target: 'maya' | 'brightpath') {
    const saveState = SaveService.get()
    const mission1Complete = saveState.completedMissions.includes('splus-c1-m01')

    if (target === 'maya') {
      if (mission1Complete) {
        GameUI.get().showNotification('The SOC introduction is complete. Continue through BrightPath.')
      } else {
        this.scene.start('MissionScene', { missionId: 'splus-c1-m01' })
      }
      return
    }

    if (!mission1Complete) {
      GameUI.get().showNotification('Complete the SOC introduction before traveling to BrightPath.')
      return
    }

    const nextMission = ProgressionService.getNextMission(saveState)
    if (nextMission) {
      this.scene.start('MissionScene', { missionId: nextMission.missionId })
    } else {
      GameUI.get().showNotification('No unlocked mission available yet.')
    }
  }
}
