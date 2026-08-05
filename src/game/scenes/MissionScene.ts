import Phaser from 'phaser'
import { ContentService } from '../../services/contentService'
import { SaveService } from '../../services/saveService'
import { MasteryService } from '../../services/masteryService'
import { GameUI } from '../../ui/GameUI'
import { ProgressionService } from '../../services/progressionService'
import type { MissionActivityOption, MissionStage } from '../../types'

type MissionSceneData = { missionId?: string }

export class MissionScene extends Phaser.Scene {
  private missionId = ''
  private optionButtons: Phaser.GameObjects.Container[] = []
  private mobile = false

  constructor() { super('MissionScene') }

  init(data: MissionSceneData) {
    const save = SaveService.get()
    this.missionId = data?.missionId ?? save.activeMission?.missionId ?? ProgressionService.getNextMission(save)?.missionId ?? ''
  }

  create() {
    this.mobile = window.matchMedia('(max-width: 600px)').matches
    const mission = ContentService.getMission(this.missionId)
    const save = SaveService.get()
    if (!mission || !ProgressionService.isAvailable(save, this.missionId)) {
      this.add.text(40, 100, 'Mission unavailable.', { fontFamily: 'Arial', fontSize: '24px', color: '#ff6b6b' })
      return
    }
    if (!save.activeMission || save.activeMission.missionId !== this.missionId) {
      SaveService.update((state) => {
        state.activeMission = { missionId: this.missionId, stage: 'briefing', investigationIndex: 0, hintUsed: false, selectedOptionId: null, collectedEvidence: [], decisions: [], discoveredConcepts: [], masteryEvidenceEarned: [] }
      })
    }
    this.renderStage()
  }

  private renderStage() {
    this.children.removeAll()
    this.optionButtons = []
    this.cameras.main.setBackgroundColor(0x08101c)
    const mission = ContentService.getMission(this.missionId)!
    const session = SaveService.get().activeMission!

    this.add.text(40, 28, mission.title, { fontFamily: 'Arial', fontSize: this.mobile ? '38px' : '28px', color: '#ffffff', fontStyle: 'bold' })
    this.add.text(40, this.mobile ? 78 : 68, this.stageLabel(session.stage), { fontFamily: 'Arial', fontSize: this.mobile ? '25px' : '15px', color: '#8fd3ff', fontStyle: 'bold' })

    if (session.stage === 'briefing') {
      this.addBody(mission.briefing)
      this.addAction('Begin investigation', () => this.setStage('investigation'))
    } else if (session.stage === 'investigation') {
      const item = mission.investigations[session.investigationIndex]
      this.add.text(40, 120, item.title, { fontFamily: 'Arial', fontSize: this.mobile ? '34px' : '22px', color: '#ffffff', fontStyle: 'bold' })
      this.addBody(item.body, 165)
      SaveService.update((state) => {
        item.discoveryConcepts.forEach((id) => {
          const undiscovered = !state.conceptProgress[id] || state.conceptProgress[id].status === 'unknown'
          MasteryService.recordExposure(state, id)
          if (undiscovered && state.activeMission && !state.activeMission.discoveredConcepts.includes(id)) state.activeMission.discoveredConcepts.push(id)
        })
        if (state.activeMission && !state.activeMission.collectedEvidence.includes(item.evidenceId)) state.activeMission.collectedEvidence.push(item.evidenceId)
      })
      this.refreshLearningUI()
      if (item.label && item.value) this.add.text(40, 300, `${item.label}: ${item.value}`, { fontFamily: 'Arial', fontSize: this.mobile ? '31px' : '19px', color: '#9ef0b4', wordWrap: { width: 820 } })
      const last = session.investigationIndex === mission.investigations.length - 1
      this.addAction(last ? 'Make a decision' : 'Inspect next clue', () => {
        if (last) this.setStage('decision')
        else {
          SaveService.update((state) => { if (state.activeMission) state.activeMission.investigationIndex += 1 })
          this.renderStage()
        }
      })
    } else if (session.stage === 'decision') {
      this.renderDecision()
    } else if (session.stage === 'feedback') {
      const option = mission.activity.options.find((item) => item.id === session.selectedOptionId)!
      this.addBody(option.explanation)
      this.addAction(option.correct ? 'View debrief' : 'Try again', () => this.setStage(option.correct ? 'debrief' : 'decision'))
    } else {
      this.addBody(mission.debrief)
      const evidenceNames = mission.investigations.filter((item) => session.collectedEvidence.includes(item.evidenceId)).map((item) => item.title)
      this.add.text(40, 300, `Evidence collected: ${evidenceNames.join(', ')}\nDecisions: ${session.decisions.length} · Correct: ${session.decisions.filter((item) => item.correct).length}\nMastery evidence earned: ${session.masteryEvidenceEarned.join(', ') || 'None'}\nNew CyberDex entries: ${session.discoveredConcepts.join(', ') || 'None'}`, { fontFamily: 'Arial', fontSize: this.mobile ? '25px' : '16px', color: '#9fd4ff', lineSpacing: 4, wordWrap: { width: 820 } })
      this.addAction('Complete mission', () => {
        SaveService.update((state) => { state.activeMission = null })
        this.refreshLearningUI()
        this.scene.start('HubScene')
      })
    }
  }

  private renderDecision() {
    const mission = ContentService.getMission(this.missionId)!
    const session = SaveService.get().activeMission!
    this.add.text(40, 112, mission.activity.prompt, { fontFamily: 'Arial', fontSize: this.mobile ? '32px' : '20px', color: '#ffffff', wordWrap: { width: 820 } })
    mission.activity.options.forEach((option, index) => {
      const y = 195 + index * 82
      const bg = this.add.rectangle(0, 0, 700, 62, 0x2f80ed)
      const text = this.add.text(-330, 0, option.label, { fontFamily: 'Arial', fontSize: this.mobile ? '30px' : '18px', color: '#ffffff', wordWrap: { width: 630 } }).setOrigin(0, 0.5)
      const button = this.add.container(390, y, [bg, text]).setSize(700, 62).setInteractive(new Phaser.Geom.Rectangle(-350, -31, 700, 62), Phaser.Geom.Rectangle.Contains, true)
      button.on('pointerdown', () => this.handleSelection(option))
      this.optionButtons.push(button)
    })
    const hint = this.add.text(40, 470, session.hintUsed ? `Hint: ${mission.hint}` : 'Need a hint?', { fontFamily: 'Arial', fontSize: this.mobile ? '28px' : '17px', color: '#9fd4ff', wordWrap: { width: 800 } }).setInteractive({ useHandCursor: true })
    hint.on('pointerdown', () => {
      SaveService.update((state) => { if (state.activeMission) state.activeMission.hintUsed = true })
      this.renderStage()
    })
  }

  private handleSelection(option: MissionActivityOption) {
    const mission = ContentService.getMission(this.missionId)!
    const session = SaveService.get().activeMission!
    this.optionButtons.forEach((button) => button.disableInteractive())
    SaveService.update((state) => {
      const isFirstAttempt = ProgressionService.recordAttempt(state, mission.missionId, option.correct)
      mission.masteryEvidence.forEach((evidence) => MasteryService.recordAttempt(state, {
        conceptId: evidence.conceptId,
        missionId: mission.missionId,
        contextId: evidence.contextId,
        evidenceType: evidence.evidenceType,
        correct: option.correct,
        firstAttempt: evidence.firstAttemptRequired ? isFirstAttempt : true,
        hintUsed: evidence.hintDisqualifies && session.hintUsed,
        independent: evidence.independent
      }))
      mission.masteryEvidence.forEach((evidence) => {
        const qualifies = option.correct && evidence.independent && ['application', 'reasoning', 'assessment'].includes(evidence.evidenceType) && (!evidence.firstAttemptRequired || isFirstAttempt) && !(evidence.hintDisqualifies && session.hintUsed)
        if (qualifies && state.activeMission && !state.activeMission.masteryEvidenceEarned.includes(evidence.conceptId)) state.activeMission.masteryEvidenceEarned.push(evidence.conceptId)
      })
      if (option.correct) ProgressionService.complete(state, mission.missionId, mission.rewards.xp)
      if (state.activeMission) {
        state.activeMission.selectedOptionId = option.id
        state.activeMission.stage = 'feedback'
        state.activeMission.decisions.push({ optionId: option.id, correct: option.correct })
      }
    })
    this.refreshLearningUI()
    this.renderStage()
  }

  private setStage(stage: MissionStage) {
    SaveService.update((state) => { if (state.activeMission) state.activeMission.stage = stage })
    this.renderStage()
  }

  private addBody(body: string, y = 125) {
    this.add.text(40, y, body, { fontFamily: 'Arial', fontSize: this.mobile ? '34px' : '20px', color: '#dbeafe', lineSpacing: 8, wordWrap: { width: 820 } })
  }

  private addAction(label: string, action: () => void) {
    const bg = this.add.rectangle(0, 0, 300, 64, 0x2f80ed)
    const text = this.add.text(0, 0, label, { fontFamily: 'Arial', fontSize: this.mobile ? '28px' : '18px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5)
    const button = this.add.container(480, 550, [bg, text]).setSize(300, 64).setInteractive(new Phaser.Geom.Rectangle(-150, -32, 300, 64), Phaser.Geom.Rectangle.Contains, true)
    button.on('pointerdown', action)
  }

  private stageLabel(stage: MissionStage) { return stage.toUpperCase() }

  private refreshLearningUI() {
    const state = SaveService.get()
    GameUI.get().updateStatus(state)
    GameUI.get().updateMissionLog(ContentService.getMission(this.missionId), state.activeMission?.collectedEvidence ?? [])
    GameUI.get().updateCyberDex(ContentService.getAllConcepts(), state.conceptProgress)
    GameUI.get().updateCompetencyMatrix(ContentService.getAllConcepts(), state.conceptProgress)
  }
}
