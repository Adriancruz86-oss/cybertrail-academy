import Phaser from 'phaser'
import { ContentService } from '../../services/contentService'
import { SaveService } from '../../services/saveService'
import { MasteryService } from '../../services/masteryService'
import { GameUI } from '../../ui/GameUI'

type MissionSceneData = { missionId?: string }

export class MissionScene extends Phaser.Scene {
  private missionId = ''
  private attempted = false
  private optionButtons: Phaser.GameObjects.Container[] = []

  constructor() {
    super('MissionScene')
  }

  init(data: MissionSceneData) {
    this.missionId = data?.missionId ?? ''
    if (!this.missionId) {
      const save = SaveService.get()
      this.missionId = save.unlockedMissions.find((id) => !save.completedMissions.includes(id)) ?? ''
    }
  }

  create() {
    this.attempted = false
    this.optionButtons = []

    const mission = ContentService.getMission(this.missionId)
    if (!mission) {
      this.add.text(50, 120, 'Mission not found.', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ff6b6b'
      })
      return
    }

    this.cameras.main.setBackgroundColor(0x08101c)

    this.add.text(40, 30, mission.title, {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold'
    })

    this.add.text(40, 72, mission.description, {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#cbd4e6',
      wordWrap: { width: 820 }
    })

    this.add.text(40, 150, mission.activity.prompt, {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
      wordWrap: { width: 820 }
    })

    mission.activity.options.forEach((option, index) => {
      const y = 220 + index * 90
      const optionBackground = this.add.rectangle(0, 0, 620, 64, 0x2f80ed)
      const optionText = this.add
        .text(-300, 0, option.label, {
          fontFamily: 'Arial',
          fontSize: '18px',
          color: '#ffffff',
          wordWrap: { width: 560 }
        })
        .setOrigin(0, 0.5)

      const optionContainer = this.add.container(320, y, [optionBackground, optionText])
      optionContainer.setSize(620, 64)
      optionContainer.setInteractive(
        new Phaser.Geom.Rectangle(-310, -32, 620, 64),
        Phaser.Geom.Rectangle.Contains,
        true
      )

      optionContainer.on('pointerover', () => {
        optionBackground.setFillStyle(0x4ea8de)
      })
      optionContainer.on('pointerout', () => {
        optionBackground.setFillStyle(0x2f80ed)
      })
      optionContainer.on('pointerdown', () => this.handleSelection(option))

      this.optionButtons.push(optionContainer)
    })

    this.add
      .text(40, 520, '', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#cbd4e6',
        wordWrap: { width: 820 }
      })
      .setName('resultText')
  }

  private handleSelection(option: { correct: boolean; explanation: string }) {
    if (this.attempted) {
      return
    }

    this.attempted = true
    this.disableOptions()

    const resultText = this.children.getByName('resultText') as Phaser.GameObjects.Text
    resultText.setText(option.explanation)
    resultText.setColor(option.correct ? '#9ef0b4' : '#ffb4a2')

    const mission = ContentService.getMission(this.missionId)
    if (!mission) {
      return
    }

    SaveService.update((state) => {
      mission.masteryEvidence.forEach((evidence) => {
        MasteryService.recordExposure(state, evidence.conceptId)
        MasteryService.recordAttempt(state, {
          conceptId: evidence.conceptId,
          missionId: mission.missionId,
          evidenceType: evidence.evidenceType,
          correct: option.correct,
          firstAttempt: true,
          hintUsed: false,
          independent: evidence.independent
        })
      })
    })

    if (option.correct) {
      SaveService.completeMission(mission.missionId)
      SaveService.addXp(mission.rewards.xp)
      const nextMission = ContentService.getNextMission(mission.missionId)
      if (nextMission) {
        SaveService.unlockMission(nextMission.missionId)
      }
      GameUI.get().showNotification('Mission complete. Return to the hub to continue.')
    } else {
      GameUI.get().showNotification('Incorrect choice. Review the explanation and return to the hub.')
    }

    GameUI.get().updateStatus(SaveService.get())
    GameUI.get().updateCyberDex(ContentService.getAllConcepts(), SaveService.get().conceptProgress)
    GameUI.get().updateCompetencyMatrix(ContentService.getAllConcepts(), SaveService.get().conceptProgress)

    const continueBackground = this.add.rectangle(0, 0, 260, 56, 0x4ea8de)
    const continueText = this.add
      .text(0, 0, 'Return to Hub', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setOrigin(0.5)

    const continueButton = this.add.container(460, 580, [continueBackground, continueText])
    continueButton.setSize(260, 56)
    continueButton.setInteractive(
      new Phaser.Geom.Rectangle(-130, -28, 260, 56),
      Phaser.Geom.Rectangle.Contains,
      true
    )
    continueButton.on('pointerdown', () => {
      this.scene.start('HubScene')
    })
  }

  private disableOptions() {
    this.optionButtons.forEach((button) => {
      button.disableInteractive()
      const bg = button.list.find((child) => child instanceof Phaser.GameObjects.Rectangle) as
        | Phaser.GameObjects.Rectangle
        | undefined
      if (bg) {
        bg.setFillStyle(0x1d4f9b)
      }
    })
  }
}