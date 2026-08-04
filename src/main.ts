import Phaser from 'phaser'
import './style.css'

class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  create() {
    const { width, height } = this.scale

    this.add.rectangle(width / 2, height / 2, width, height, 0x10233f)

    this.add.text(width / 2, 90, 'CYBERTRAIL ACADEMY', {
      fontFamily: 'Arial',
      fontSize: '34px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    this.add.text(width / 2, 140, 'Security+ — First Response', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#8fd3ff',
    }).setOrigin(0.5)

    this.add.rectangle(width / 2, 290, 520, 190, 0x183252)
      .setStrokeStyle(2, 0x4ea8de)

    this.add.text(width / 2, 235, 'Welcome, Analyst', {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(0.5)

    this.add.text(
      width / 2,
      290,
      'Your first shift begins at Cyber World Security Solutions.',
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#dbeafe',
        align: 'center',
        wordWrap: { width: 430 },
      },
    ).setOrigin(0.5)

    const startButton = this.add.rectangle(width / 2, 380, 230, 58, 0x2f80ed)
      .setInteractive({ useHandCursor: true })

    this.add.text(width / 2, 380, 'BEGIN FIRST SHIFT', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    startButton.on('pointerover', () => startButton.setFillStyle(0x4ea8de))
    startButton.on('pointerout', () => startButton.setFillStyle(0x2f80ed))
    startButton.on('pointerdown', () => this.scene.start('MissionOneScene'))
  }
}

class MissionOneScene extends Phaser.Scene {
  constructor() {
    super('MissionOneScene')
  }

  create() {
    const { width, height } = this.scale

    this.add.rectangle(width / 2, height / 2, width, height, 0x0d1b2a)

    this.add.text(40, 30, 'MISSION 1: WELCOME TO THE SOC', {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold',
    })

    this.add.text(40, 75, 'Objective: Learn the difference between an asset, threat, vulnerability, risk, and control.', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#b9d7f2',
      wordWrap: { width: 800 },
    })

    this.add.rectangle(160, 230, 180, 110, 0x1b4332)
      .setStrokeStyle(2, 0x74c69d)

    this.add.text(160, 215, 'DATABASE SERVER', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    this.add.text(160, 250, 'Stores student records', {
      fontFamily: 'Arial',
      fontSize: '15px',
      color: '#d8f3dc',
    }).setOrigin(0.5)

    this.add.rectangle(450, 230, 180, 110, 0x5c2b29)
      .setStrokeStyle(2, 0xe76f51)

    this.add.text(450, 215, 'RANSOMWARE', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    this.add.text(450, 250, 'Can encrypt files', {
      fontFamily: 'Arial',
      fontSize: '15px',
      color: '#ffd6cc',
    }).setOrigin(0.5)

    this.add.rectangle(740, 230, 180, 110, 0x4a4e69)
      .setStrokeStyle(2, 0xc9ada7)

    this.add.text(740, 215, 'MISSING PATCH', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    this.add.text(740, 250, 'Weakness attackers can use', {
      fontFamily: 'Arial',
      fontSize: '15px',
      color: '#f2e9e4',
      align: 'center',
      wordWrap: { width: 150 },
    }).setOrigin(0.5)

    this.add.text(width / 2, 355, 'Which one is the ASSET?', {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    const result = this.add.text(width / 2, 500, '', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#9ef0b4',
      align: 'center',
      wordWrap: { width: 700 },
    }).setOrigin(0.5)

    const choices = [
      { x: 160, label: 'DATABASE SERVER', correct: true },
      { x: 450, label: 'RANSOMWARE', correct: false },
      { x: 740, label: 'MISSING PATCH', correct: false },
    ]

        choices.forEach((choice) => {
      const button = this.add
        .rectangle(choice.x, 410, 190, 52, 0x2f80ed)
        .setInteractive({ useHandCursor: true })

      this.add
        .text(choice.x, 410, choice.label, {
          fontFamily: 'Arial',
          fontSize: '15px',
          color: '#ffffff',
          fontStyle: 'bold',
        })
        .setOrigin(0.5)

      button.on('pointerdown', () => {
        if (choice.correct) {
          result.setColor('#9ef0b4')
          result.setText(
            'Correct. The database server is an asset because it has value to the organization.',
          )
        } else {
          result.setColor('#ffb4a2')
          result.setText(
            choice.label === 'RANSOMWARE'
              ? 'Not quite. Ransomware is a threat because it can cause harm.'
              : 'Not quite. A missing patch is a vulnerability because it is a weakness.',
          )
        }
      })
    })
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 900,
  height: 600,
  backgroundColor: '#10233f',
  scene: [BootScene, MissionOneScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
}

new Phaser.Game(config)