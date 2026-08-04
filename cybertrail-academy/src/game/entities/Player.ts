import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'playerSprite'); // 'playerSprite' should be the key for the player's sprite in the asset loader
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.setScale(1); // Adjust scale as necessary

        // Player properties
        this.health = 100;
        this.speed = 200;
        this.inventory = [];

        // Input handling
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update() {
        this.handleMovement();
    }

    handleMovement() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
        } else {
            this.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
        } else {
            this.setVelocityY(0);
        }
    }

    // Additional methods for player actions can be added here
}