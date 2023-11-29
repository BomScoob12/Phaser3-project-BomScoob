// ! import Phaser
import Phaser from 'phaser'

// declare a variable // ! to hold the background

// ! create a class extending Phaser.Scene
class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
    })
    this.bg
    this.player
  }

  preload() {
    this.load.image(
      'bg-pink',
      'assets/image/game-scene/background/background-pink.png'
    )

    this.load.spritesheet(
      'goose',
      'assets/image/game-scene/spritesheets/goose.png',
      {
        frameWidth: 251, // * width of each frame devided by 7
        frameHeight: 250,
      }
    )

    this.load.image('logs', 'assets/image/game-scene/components/logs.png')
    this.load.image('platform', 'assets/image/game-scene/platforms/ground.png')
  }

  create() {
    this.bg = this.add
      .tileSprite(0, 0, 1280, 720, 'bg-pink') // x, y, width, height, key
      .setOrigin(0, 0) // set origin to // ! top left

    this.player = this.physics.add.sprite(700, 350, 'goose')

    // create animations
    this.anims.create({
      key: 'player-walk', // ชื่ออนิเมชั่น
      frames: this.anims.generateFrameNumbers('goose', {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    })

    // ? adding new platform by using tileSprite
    this.platform = this.add.tileSprite(0, 600, 1280, 100, 'platform').setOrigin(0,0)

    this.groupObject = this.physics.add.staticGroup()
    this.groupObject.create(400,0, 'logs')
    this.groupObject.create(200, 200, 'logs')
    this.groupObject.add(this.platform)

    // ? collider
    // this.physics.add.collider(this.player, this.groupObject)

    // todo How overlap and output ("Hey you hit me")
    // callback function()
    // * this.physics.add.overlap(this.player, this.platform, () => {
    //   // code here...

    // * })

    // ? function callbackHit () {
    // ? console.log("Hey you hit me.!!!")
    // ? }
    // todo How overlap and output ("Hey you hit me")
    // callback function()
    // * this.physics.add.overlap(this.player, this.platform, "// callback function here ")
  }

  update() {
    // bg.tilePositionY -= 1
    this.bg.tilePositionX += 1

    this.player.anims.play('player-walk', true) // ชื่ออนิเมชั่น,
  }
}

export default GameScene
