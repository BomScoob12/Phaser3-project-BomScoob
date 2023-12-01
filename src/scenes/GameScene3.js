import Phaser from 'phaser'

class GameScene3 extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene3',
    })
    this.bg
    this.player
    this.platforms
    this.logs
    this.myCam
    this.score = 0
  }

  preload() {
    this.load.image('key', 'assets/image/game-scene/components/key.png')
  }

  collectCoin(player, coin) {
    // This function will be called when the player overlaps with the coin
    coin.destroy() // Remove the coin sprite
    console.log('Coin collected!')

    // Trigger a custom event when a coin is collected
    this.events.emit('coinCollected', 1) // You can pass additional data, such as the number of coins collected
  }

  create() {
    this.bg = this.add
      .tileSprite(0, 0, 1500, 720, 'bg-pink') // x, y, width, height, key
      .setOrigin(0, 0) // set origin to // ! top left

    this.platform = this.add
      .tileSprite(0, 600, 1500, 100, 'platform')
      .setOrigin(0, 0)

    this.platforms = this.physics.add.staticGroup()
    this.platforms.add(this.platform)

    this.player = this.physics.add.sprite(700, 350, 'goose').setScale(0.5)
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
    this.physics.world.enable(this.player)
    this.physics.add.collider(this.player, this.platform)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.coins = this.physics.add.group({
      key: 'key',
      repeat: 5,
      setXY: { x: 12, y: 0, stepX: 250 },
    })
    this.coins.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })
    this.physics.add.collider(this.coins, this.platform)

    // ! set event listener
    // * Somewhere else in your code, subscribe to the 'coinCollected' event
    this.events.on(
      'coinCollected',
      function (numCoins) {
        console.log(`Total coins collected: ' + ${this.score += numCoins}`)
        // * Perform other actions based on the number of coins collected
      },
      this
    )

    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this
    )
  }

  playerMove() {
    // Check for keyboard input and update player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
    } else {
      this.player.setVelocityX(0)
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      console.log('jump')
      // Allow the player to jump only if touching the ground
      this.player.setVelocityY(-330)
    }
  }

  update() {
    this.playerMove()
  }
}

export default GameScene3
