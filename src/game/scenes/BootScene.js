import Phaser from 'phaser';
import { SaveService } from '../../services/saveService';
import { GameUI } from '../../ui/GameUI';
export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    create() {
        const { width, height } = this.scale;
        this.cameras.main.setBackgroundColor(0x10233f);
        this.add
            .text(width / 2, 90, 'CYBERTRAIL ACADEMY', {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#ffffff',
            fontStyle: 'bold'
        })
            .setOrigin(0.5);
        this.add
            .text(width / 2, 140, 'Security+ — First Response', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#8fd3ff'
        })
            .setOrigin(0.5);
        this.add
            .text(width / 2, 230, 'Welcome, Analyst', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffffff'
        })
            .setOrigin(0.5);
        this.add
            .text(width / 2, 270, 'Your first shift begins at Cyber World Security Solutions.', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#dbeafe',
            align: 'center',
            wordWrap: { width: 520 }
        })
            .setOrigin(0.5);
        const startButton = this.add
            .rectangle(width / 2, 360, 260, 60, 0x2f80ed)
            .setInteractive({ useHandCursor: true });
        this.add
            .text(width / 2, 360, 'BEGIN FIRST SHIFT', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            fontStyle: 'bold'
        })
            .setOrigin(0.5);
        startButton.on('pointerover', () => startButton.setFillStyle(0x4ea8de));
        startButton.on('pointerout', () => startButton.setFillStyle(0x2f80ed));
        startButton.on('pointerdown', () => {
            SaveService.reset();
            this.scene.start('HubScene');
        });
        GameUI.init();
        GameUI.get().showNotification('Use the hub to travel between the SOC and BrightPath.');
    }
}
//# sourceMappingURL=BootScene.js.map