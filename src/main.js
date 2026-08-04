import Phaser from 'phaser';
import './style.css';
import { BootScene } from './game/scenes/BootScene';
import { HubScene } from './game/scenes/HubScene';
import { MissionScene } from './game/scenes/MissionScene';
import { GameUI } from './ui/GameUI';
import { registerServiceWorker } from './registerServiceWorker';
GameUI.init();
const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 960,
    height: 640,
    backgroundColor: '#10233f',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [BootScene, HubScene, MissionScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
new Phaser.Game(config);
registerServiceWorker();
//# sourceMappingURL=main.js.map