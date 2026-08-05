import Phaser from 'phaser'
import { ContentService } from '../../services/contentService'
import { SaveService } from '../../services/saveService'
import { MasteryService } from '../../services/masteryService'
import { GameUI } from '../../ui/GameUI'
import { ProgressionService } from '../../services/progressionService'
import { MissionSessionService } from '../../services/missionSessionService'
import { getMissionPresentation } from '../missionPresentation'
import type { MissionActivityOption, MissionStage } from '../../types'

type MissionSceneData = { missionId?: string }

export class MissionScene extends Phaser.Scene {
  private missionId = ''
  private mobile = false

  constructor() { super('MissionScene') }

  init(data: MissionSceneData) {
    const save = SaveService.get()
    this.missionId = data?.missionId ?? save.activeMission?.missionId ?? ProgressionService.getNextMission(save)?.missionId ?? ''
  }

  preload() {
    this.load.image('cwss-mission-room', new URL('../../assets/cwss-mission-room.png', import.meta.url).href)
    this.load.image('brightpath-mission-room', new URL('../../assets/brightpath-mission-room.png', import.meta.url).href)
    this.load.image('mission-analyst', new URL('../../assets/analyst-sprite.png', import.meta.url).href)
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
        state.activeMission = { missionId: this.missionId, stage: 'briefing', investigationIndex: 0, hintUsed: false, selectedOptionId: null, collectedEvidence: [], decisions: [], discoveredConcepts: [], masteryEvidenceEarned: [], activityIndex: 0, activityAttempts: {} }
      })
    }
    GameUI.get().showMissionExit(() => {
      GameUI.get().hideDecision()
      GameUI.get().hideMissionResults()
      GameUI.get().showNotification('Mission paused. Return to the highlighted building when you are ready.')
      this.scene.start('HubScene')
    })
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      GameUI.get().hideDecision()
      GameUI.get().hideMissionResults()
      GameUI.get().hideMissionExit()
    })
    this.renderStage()
  }

  private renderStage() {
    GameUI.get().hideDecision()
    this.children.removeAll()
    const mission = ContentService.getMission(this.missionId)!
    const session = SaveService.get().activeMission!
    this.renderRoom(session.stage)

    this.add.text(480, 91, mission.title, {
      fontFamily: 'Arial', fontSize: this.mobile ? '32px' : '24px', color: '#ffffff', fontStyle: 'bold',
      align: 'center', wordWrap: { width: 390 }
    }).setOrigin(0.5, 0)
    this.add.text(480, 72, this.stageLabel(session.stage), {
      fontFamily: 'Arial', fontSize: this.mobile ? '20px' : '12px', color: '#8fd3ff', fontStyle: 'bold', letterSpacing: 2
    }).setOrigin(0.5)

    if (session.stage === 'briefing') {
      this.addBody(mission.briefing)
      this.addAction('Begin investigation', () => this.setStage('investigation'))
    } else if (session.stage === 'investigation') {
      const item = mission.investigations[session.investigationIndex]
      this.add.text(480, 142, item.title, { fontFamily: 'Arial', fontSize: this.mobile ? '28px' : '20px', color: '#ffffff', fontStyle: 'bold', align: 'center', wordWrap: { width: 380 } }).setOrigin(0.5, 0)
      this.addBody(item.body, 182)
      SaveService.update((state) => {
        item.discoveryConcepts.forEach((id) => {
          const undiscovered = !state.conceptProgress[id] || state.conceptProgress[id].status === 'unknown'
          MasteryService.recordExposure(state, id)
          if (undiscovered && state.activeMission && !state.activeMission.discoveredConcepts.includes(id)) state.activeMission.discoveredConcepts.push(id)
        })
        if (state.activeMission && !state.activeMission.collectedEvidence.includes(item.evidenceId)) state.activeMission.collectedEvidence.push(item.evidenceId)
      })
      this.refreshLearningUI()
      if (item.label && item.value) this.add.text(480, 314, `${item.label}: ${item.value}`, { fontFamily: 'Arial', fontSize: this.mobile ? '23px' : '16px', color: '#9ef0b4', align: 'center', wordWrap: { width: 370 } }).setOrigin(0.5, 0)
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
      const activities = this.getActivities()
      const option = activities[session.activityIndex].options.find((item) => item.id === session.selectedOptionId)!
      this.addBody(option.explanation)
      const finalActivity = session.activityIndex === activities.length - 1
      this.addAction(option.correct ? (finalActivity ? 'View debrief' : 'Next decision') : 'Try again', () => {
        if (!option.correct) this.setStage('decision')
        else if (finalActivity) this.setStage('debrief')
        else {
          SaveService.update((state) => {
            if (state.activeMission) {
              MissionSessionService.advanceActivity(state.activeMission)
            }
          })
          this.renderStage()
        }
      })
    } else {
      this.addBody(mission.debrief)
      this.addAction('View mission results', () => this.showMissionResults())
    }
  }

  private renderDecision() {
    const mission = ContentService.getMission(this.missionId)!
    const session = SaveService.get().activeMission!
    const activity = this.getActivities()[session.activityIndex]
    this.add.text(480, 180, 'Review the situation and choose the strongest response.', {
      fontFamily: 'Arial', fontSize: this.mobile ? '28px' : '18px', color: '#dbeafe', align: 'center', wordWrap: { width: 360 }
    }).setOrigin(0.5)
    GameUI.get().showDecision({
      activity,
      hint: mission.hint,
      hintUsed: session.hintUsed,
      onSelect: (option) => this.handleSelection(option),
      onHint: () => {
        SaveService.update((state) => { if (state.activeMission) state.activeMission.hintUsed = true })
        this.renderStage()
      }
    })
  }

  private handleSelection(option: MissionActivityOption) {
    const mission = ContentService.getMission(this.missionId)!
    const session = SaveService.get().activeMission!
    SaveService.update((state) => {
      ProgressionService.recordAttempt(state, mission.missionId, option.correct)
      if (!state.activeMission) return
      const isFirstAttempt = MissionSessionService.recordDecision(state.activeMission, option.id, option.correct)
      const activityEvidence = mission.masteryEvidence.filter((evidence) => (evidence.activityIndex ?? 0) === session.activityIndex)
      activityEvidence.forEach((evidence) => MasteryService.recordAttempt(state, {
        conceptId: evidence.conceptId,
        missionId: mission.missionId,
        contextId: evidence.contextId,
        evidenceType: evidence.evidenceType,
        correct: option.correct,
        firstAttempt: evidence.firstAttemptRequired ? isFirstAttempt : true,
        hintUsed: evidence.hintDisqualifies && session.hintUsed,
        independent: evidence.independent
      }))
      activityEvidence.forEach((evidence) => {
        const qualifies = option.correct && evidence.independent && ['application', 'reasoning', 'assessment'].includes(evidence.evidenceType) && (!evidence.firstAttemptRequired || isFirstAttempt) && !(evidence.hintDisqualifies && session.hintUsed)
        if (qualifies && state.activeMission && !state.activeMission.masteryEvidenceEarned.includes(evidence.conceptId)) state.activeMission.masteryEvidenceEarned.push(evidence.conceptId)
      })
      if (option.correct && session.activityIndex === this.getActivities().length - 1) ProgressionService.complete(state, mission.missionId, mission.rewards.xp)
      if (state.activeMission) {
        state.activeMission.stage = 'feedback'
      }
    })
    this.refreshLearningUI()
    this.renderStage()
  }

  private setStage(stage: MissionStage) {
    SaveService.update((state) => { if (state.activeMission) state.activeMission.stage = stage })
    this.renderStage()
  }

  private showMissionResults() {
    const mission = ContentService.getMission(this.missionId)!
    const session = SaveService.get().activeMission!
    const conceptNames = ContentService.getAllConcepts()
    GameUI.get().showMissionResults({
      title: mission.title,
      evidence: mission.investigations.filter((item) => session.collectedEvidence.includes(item.evidenceId)).map((item) => item.title),
      discoveries: session.discoveredConcepts.map((id) => conceptNames[id]?.name ?? id),
      mastery: session.masteryEvidenceEarned.map((id) => conceptNames[id]?.name ?? id),
      decisions: session.decisions.length,
      correct: session.decisions.filter((item) => item.correct).length,
      xp: mission.rewards.xp,
      campaignComplete: mission.missionId === 'splus-c1-m15',
      onReturn: () => {
        GameUI.get().hideMissionResults()
        SaveService.update((state) => { state.activeMission = null })
        this.refreshLearningUI()
        this.scene.start('HubScene')
      }
    })
  }

  private renderRoom(stage: MissionStage) {
    const { width, height } = this.scale
    const presentation = getMissionPresentation(this.missionId)
    this.add.image(width / 2, height / 2, presentation.roomKey).setDisplaySize(width, height)
    this.add.rectangle(480, 264, 440, 398, 0x06111d, 0.84).setStrokeStyle(2, presentation.accent, 0.8)
    const analyst = this.add.image(838, 452, 'mission-analyst').setDisplaySize(190, 285)
    this.add.rectangle(144, 551, 222, 58, 0x06111d, 0.88).setStrokeStyle(1, presentation.accent, 0.75)
    this.add.text(144, 539, presentation.mentorName, { fontFamily: 'Arial', fontSize: '16px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5)
    this.add.text(144, 561, presentation.mentorRole, { fontFamily: 'Arial', fontSize: '12px', color: '#c8e8fa' }).setOrigin(0.5)
    this.add.text(838, 605, 'YOU', { fontFamily: 'Arial', fontSize: '12px', color: '#ffffff', backgroundColor: '#071421cc', padding: { x: 8, y: 4 } }).setOrigin(0.5)
    if (stage === 'briefing' && SaveService.get().settings.reducedMotion === false) {
      this.tweens.add({ targets: analyst, y: 496, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' })
    }
  }

  private addBody(body: string, y = 145) {
    this.add.text(480, y, body, { fontFamily: 'Arial', fontSize: `${this.getBodyFontSize(body)}px`, color: '#dbeafe', align: 'center', lineSpacing: this.mobile ? 4 : 6, wordWrap: { width: 382 } }).setOrigin(0.5, 0)
  }

  private getBodyFontSize(body: string) {
    if (!this.mobile) return body.length > 260 ? 14 : body.length > 180 ? 15 : 17
    return body.length > 220 ? 20 : body.length > 150 ? 23 : body.length > 90 ? 26 : 29
  }

  private addAction(label: string, action: () => void) {
    const bg = this.add.rectangle(0, 0, 300, 64, 0x2f80ed)
    const text = this.add.text(0, 0, label, { fontFamily: 'Arial', fontSize: this.mobile ? '28px' : '18px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5)
    const button = this.add.container(480, 452, [bg, text]).setSize(300, 64).setInteractive(new Phaser.Geom.Rectangle(-150, -32, 300, 64), Phaser.Geom.Rectangle.Contains, true)
    button.on('pointerdown', action)
  }

  private stageLabel(stage: MissionStage) { return stage.toUpperCase() }

  private getActivities() {
    const mission = ContentService.getMission(this.missionId)!
    return mission.activities ?? [mission.activity]
  }

  private refreshLearningUI() {
    const state = SaveService.get()
    GameUI.get().updateStatus(state)
    GameUI.get().updateMissionNavigator(ContentService.getAllMissions(), state, (missionId) => {
      if (missionId !== this.missionId) SaveService.update((save) => { save.activeMission = null })
      GameUI.get().hideDecision()
      GameUI.get().hideMissionResults()
      this.scene.start('MissionScene', { missionId })
    })
    GameUI.get().updateCyberDex(ContentService.getAllConcepts(), state.conceptProgress)
    GameUI.get().updateCompetencyMatrix(ContentService.getAllConcepts(), state.conceptProgress, state)
  }
}
