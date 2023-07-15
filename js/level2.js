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
    player = this.physics.add.sprite(20, 50, 'player');
    player.setCollideWorldBounds(true);

    walls = this.physics.add.staticGroup();
    createMaze();

    goal = this.physics.add.sprite(1270, 600, 'goal');

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

function createMaze() {

    // var increment = 30;
    var wallsData = [];
    function build_vertically(x, y, blocks_num) {
        for (var i = 0; i < blocks_num; i++) {
            wallsData.push({ x: x, y: y + 30 * i });
        }
    }

    function build_horizontally( x, y, blocks_num) {
        for (var i = 0; i < blocks_num; i++) {
            wallsData.push({ x: x + 30 * i, y: y });
        }
    }

    // top
    build_horizontally(20, 20, 42)

    // left
    build_vertically(20, 80, 18)

    // bottom
    build_horizontally(60, 610, 40)
    
    // right
    build_vertically(1270, 50, 18)

    wallsData.forEach(function (wall) {
        walls.create(wall.x, wall.y, 'wall');
    });
}