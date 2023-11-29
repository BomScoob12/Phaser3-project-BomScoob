import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config = {
    type : Phaser.AUTO,
    width : 1280,
    height : 720,
    parent : 'content',
    backgroundColor : '#000',
    physics : {
        default : 'arcade',
        arcade : {
            gravity: {y: 100},
            debug : true
        }
    },
    scene : [GameScene]
}

let game = new Phaser.Game(config);