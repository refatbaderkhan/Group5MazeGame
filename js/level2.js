const config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
const game = new Phaser.Game(config);
function preload() {
    this.load.image('player', '../assets/images/player_level2.png');
    this.load.image('wall', '../assets/images/wall_level2.png');
    this.load.image('goal', '../assets/images/player_level2.png');
}

let player;
let walls;
let goal;

function create() {
    player = this.physics.add.sprite(20, 110, 'player');
    player.setCollideWorldBounds(true);

    walls = this.physics.add.staticGroup();
    createMaze();

    goal = this.physics.add.sprite(1270, 350, 'goal');

    this.physics.add.collider(player, walls);

    this.physics.add.overlap(player, goal, function () {
        alert('Congratulations! Kitty is Happy Now.');
        game.destroy();
    }, null, this);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.up.isDown) {
        player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
    } else {
        player.setVelocityY(0);
    }
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }
}
