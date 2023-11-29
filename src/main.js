import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import GameScene2 from './scenes/GameScene2';

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
            debug : true // ! set debug
        }
    },
    scene : [GameScene, GameScene2]
}

let game = new Phaser.Game(config);