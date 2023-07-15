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
    build_horizontally(20, 610, 41)

    // right
    build_vertically(1270, 50, 18)

    // barriers
    build_vertically(140, 50, 6)
    build_horizontally(80, 260, 4)
    build_vertically(80, 140, 4)
    build_vertically(200, 80, 17)
    build_horizontally(50, 350, 4 )
    build_horizontally(50, 530, 4)
    build_horizontally(80, 440, 4)
    build_horizontally(200, 290, 6) 
    build_horizontally(260, 350, 4)
    build_horizontally(320, 410, 4) 
    build_vertically(320, 440, 1)
    build_horizontally(320, 470, 5) 
    build_horizontally(260, 530, 10)
    build_vertically(260, 380, 5)
    build_horizontally(260, 110, 6)
    build_vertically(260, 110, 5)
    build_horizontally(260, 230, 6)
    build_horizontally(320 ,170, 5)
    build_vertically(470, 50, 15)
    build_vertically(410, 230, 6)
    build_vertically(530, 80, 16)
    build_horizontally(560, 80, 4)
    build_vertically(650, 80, 16)
    build_vertically(590, 140, 16)
    build_vertically(830, 80, 18)
    build_horizontally(830, 80, 13)
    build_horizontally(920, 170, 14)
    build_horizontally(830, 260, 14)
    build_horizontally(920, 350, 14)
    build_horizontally(830,440 , 14)
    build_horizontally(920, 530, 14)
    build_vertically(740, 50, 17)

    // build_horizontally(290, 80, 5)
    // build_horizontally(290, 140, 5)
    // build_vertically(290, 110, 1)
    wallsData.forEach(function (wall) {
        walls.create(wall.x, wall.y, 'wall');
    });
}