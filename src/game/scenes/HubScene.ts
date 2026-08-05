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

  create() {
    this.cameras.main.setBackgroundColor(0x08181f)
    const { width, height } = this.scale

    this.add.rectangle(width / 2, height / 2, width, height, 0x0f2a44)
    this.add
      .text(40, 32, 'Cyber World Security Solutions', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setShadow(1, 1, '#000000', 2)

    this.mayaZone = this.add
      .rectangle(160, 220, 190, 150, 0x2f80ed)
      .setStrokeStyle(2, 0x8ed1ff)
    this.add
      .text(160, 220, 'Maya\nSOC Director', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        align: 'center'
      })
      .setOrigin(0.5)

    this.brightPathZone = this.add
      .rectangle(720, 220, 220, 150, 0x183252)
      .setStrokeStyle(2, 0x4ea8de)
    this.add
      .text(720, 220, 'BrightPath\nGateway', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        align: 'center'
      })
      .setOrigin(0.5)

    this.player = this.physics.add
      .image(140, 420, '')
      .setDisplaySize(32, 32)
      .setTint(0x8bd6ff)
      .setCollideWorldBounds(true)

    this.player.body.setVelocity(0, 0)

   this.keys = this.input.keyboard!.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
      E: 'E'
    }) as any

    this.promptText = this.add
      .text(width / 2, height - 64, 'Use WASD to move. Press E to interact.', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff'
      })
      .setOrigin(0.5)

    this.createTouchControls()

    const saveState = SaveService.load()
    const activeMission = ProgressionService.getNextMission(saveState)

    GameUI.get().updateStatus(saveState)
    GameUI.get().updateMissionLog(activeMission)
    GameUI.get().updateCyberDex(ContentService.getAllConcepts(), saveState.conceptProgress)
    GameUI.get().updateCompetencyMatrix(ContentService.getAllConcepts(), saveState.conceptProgress)
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
      const label = nearby === 'maya' ? 'Talk to Maya' : 'Travel to BrightPath'
      this.promptText.setText(`Press E to ${label}`)
      if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
        this.handleInteract(nearby)
      }
    } else {
      this.promptText.setText('Use WASD to move. Press E to interact.')
    }
  }

  private createTouchControls() {
    const controls: Array<[number, number, string, Direction]> = [
      [60, 500, '◀', 'left'],
      [160, 500, '▶', 'right'],
      [60, 595, '▲', 'up'],
      [160, 595, '▼', 'down']
    ]
    controls.forEach(([x, y, label, direction]) => {
      const button = this.add.rectangle(x, y, 88, 88, 0x183252, 0.92).setStrokeStyle(3, 0x8ed1ff)
      button.setInteractive({ useHandCursor: true })
      this.add.text(x, y, label, { fontSize: '30px', color: '#ffffff' }).setOrigin(0.5)
      button.on('pointerdown', () => this.touchControls.press(direction))
      const stop = () => this.touchControls.release(direction)
      button.on('pointerup', stop)
      button.on('pointerout', stop)
    })

    const interact = this.add.rectangle(830, 540, 190, 112, 0x2f80ed, 0.92).setStrokeStyle(3, 0x8ed1ff)
    interact.setInteractive({ useHandCursor: true })
    this.add.text(830, 540, 'INTERACT', { fontSize: '20px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5)
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
