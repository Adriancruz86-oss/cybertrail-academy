import Phaser from 'phaser';
import config from './game/config';
import BootScene from './game/scenes/BootScene';
import HubScene from './game/scenes/HubScene';
import BrightPathScene from './game/scenes/BrightPathScene';
import UIScene from './game/scenes/UIScene';

const gameConfig = {
    ...config,
    scene: [BootScene, HubScene, BrightPathScene, UIScene]
};

const game = new Phaser.Game(gameConfig);