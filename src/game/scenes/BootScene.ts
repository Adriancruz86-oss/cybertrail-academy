import Phaser from 'phaser'
import { SaveService } from '../../services/saveService'
import { GameUI } from '../../ui/GameUI'
import { ContentService } from '../../services/contentService'

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  create() {
    const { width, height } = this.scale

    this.cameras.main.setBackgroundColor(0x10233f)

    this.add
      .text(width / 2, 90, 'CYBERTRAIL ACADEMY', {
        fontFamily: 'Arial',
        fontSize: '36px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, 140, 'Security+ — First Response', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#8fd3ff'
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, 230, 'Welcome, Analyst', {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#ffffff'
      })
      .setOrigin(0.5)

    this.add
      .text(
        width / 2,
        270,
        'Your first shift begins at Cyber World Security Solutions.',
        {
          fontFamily: 'Arial',
          fontSize: '18px',
          color: '#dbeafe',
          align: 'center',
          wordWrap: { width: 520 }
        }
      )
      .setOrigin(0.5)

    const hasProgress = SaveService.hasProgress()
    const startButton = this.add
      .rectangle(width / 2, 350, 260, 60, 0x2f80ed)
      .setInteractive({ useHandCursor: true })

    this.add
      .text(width / 2, 350, hasProgress ? 'CONTINUE SHIFT' : 'BEGIN FIRST SHIFT', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setOrigin(0.5)

    startButton.on('pointerover', () => startButton.setFillStyle(0x4ea8de))
    startButton.on('pointerout', () => startButton.setFillStyle(0x2f80ed))
    startButton.on('pointerdown', () => {
      const activeMission = SaveService.get().activeMission
      this.scene.start(activeMission ? 'MissionScene' : 'HubScene', activeMission ? { missionId: activeMission.missionId } : undefined)
    })

    if (hasProgress) {
      const newGame = this.add
        .text(width / 2, 415, 'Start new game', {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#b9d8f5'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
      newGame.on('pointerdown', () => {
        if (window.confirm('Reset all mission, mastery, CyberDex, and XP progress? This cannot be undone.')) {
          SaveService.reset()
          this.scene.restart()
        }
      })
    }

    const ui = GameUI.init()
    const state = SaveService.get()
    ui.updateStatus(state)
    ui.updateMissionNavigator(ContentService.getAllMissions(), state, (missionId) => {
      SaveService.update((save) => { if (save.activeMission?.missionId !== missionId) save.activeMission = null })
      this.scene.start('MissionScene', { missionId })
    })
    ui.updateCyberDex(ContentService.getAllConcepts(), state.conceptProgress)
    ui.updateCompetencyMatrix(ContentService.getAllConcepts(), state.conceptProgress, state)
    ui.showNotification('Enter the campus when you are ready for your assignment.')
  }
}
