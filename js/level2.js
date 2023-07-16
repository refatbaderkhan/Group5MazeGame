//for further comments and explainations, checkout level 1 script
const config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F0E3',
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
    this.load.image('goal', '../assets/images/goal_level2.png');
    this.load.image('trap', '/assets/images/hole_level2.png');
    this.load.audio('scream', '/assets/audio/scream.mp3');
    this.load.audio('music_level2', '/assets/audio/music_level2.mp3');
}

// function to slide modal to screen
function unhideModal(hide, failure, score) {
    // getting elements
    var message = document.getElementById('message')
    var score_span = document.getElementById('score-span')
    var next_link = document.getElementById('next-level')
    var overlay = document.getElementById('overlay');

    // displaying modal, message and score
    overlay.classList.add('overlay-slide-right');
    total_score = parseInt(localStorage.getItem('score')) + score;
    score_span.innerText = `score ${total_score}`

    // if timeout or bumped to cactus hide next level button
    if (hide == true) {
        next_link.classList.add('hide')
        // set custom message
        if (failure == 1) {
            message.innerText = 'You bumped into a cactus!'
        }
        else {
            message.innerText = 'Time is up! Game Over'
        }
    }

    // set new score in local storage
    localStorage.setItem('score', total_score)

    // reset and next level button listener
    var modal_btn = document.getElementsByClassName('level1-to-2');
    modal_btn.addEventListener(function () {
        overlay.classList.remove('overlay-slide-right')
    });
}


let player;
let walls;
let goal;
let traps;
let timer;
let timerText;
let gameText;


function create() {
    const music = this.sound.add('music_level2', { loop: false });
    music.play();

    player = this.physics.add.sprite(20, 50, 'player');

    player.setCollideWorldBounds(true);

    walls = this.physics.add.staticGroup();

    traps = this.physics.add.staticGroup();

    timer = this.time.addEvent({
        delay: 120000,
        callback: endGameTime,
        callbackScope: this
    });

    timerText = this.add.text(this.cameras.main.width / 2, 10, 'Time: 30', {
        fontFamily: 'Arial',
        fontSize: 24,
        color: '#000000',
        backgroundColor: '#F5F5DC',
        fontWeight: 'bold'
    }).setOrigin(0.5, 0);

    timerText.setDepth(1);

    createMaze();

    gameText = this.add.text(this.cameras.main.width / 2, 625, 'Guide your kitty to get some food ** Hurry up and be on time! otherwise your cat will starve :( ** Watch out for the cactus! kitty hates them ** Press ESC anytime to quit the game', {
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#000000',
        backgroundColor: '#F5F5DC',
        fontWeight: 'bold'
    }).setOrigin(0.5, 0);

    goal = this.physics.add.sprite(1270, 600, 'goal');

    this.physics.add.collider(player, walls);

    this.physics.add.overlap(player, traps, endGameTrap, null, this);

    this.physics.add.overlap(player, goal, function () {
        unhideModal(false, -1, 200);
        game.destroy();
    }, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    quit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
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

    if (Phaser.Input.Keyboard.JustDown(quit)) {
        endGameQuit();
    }

    const remainingTime = Math.round((timer.delay - timer.getElapsed()) / 1000);
    timerText.setText('Time: ' + remainingTime);
}

//timer end game function
function endGameTime() {
    unhideModal(true, -1, 0)
    game.destroy();
}

//trap end game function with sound effect
function endGameTrap() {
    const scream = this.sound.add('scream', { loop: false });
    scream.play();
    unhideModal(true, 1, 0)
    resetGame();
}

//esc quit game function
function endGameQuit() {
    alert('See you later!.');
    game.destroy();
}

function createMaze() {
    var wallsData = [];

    // function that adds blocks together vertically by fixing x-value and changing y value
    function build_vertically(x, y, blocks_num) {
        for (var i = 0; i < blocks_num; i++) {
            wallsData.push({ x: x, y: y + 30 * i });
        }
    }

    // function that adds blocks together vertically by fixing y-value and changing x value
    function build_horizontally(x, y, blocks_num) {
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
    build_horizontally(50, 350, 4)
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
    build_horizontally(320, 170, 5)
    build_vertically(470, 50, 15)
    build_vertically(410, 230, 6)
    build_vertically(530, 80, 16)
    build_horizontally(560, 80, 4)
    build_vertically(650, 80, 18)
    build_vertically(590, 140, 16)
    build_vertically(830, 80, 18)
    build_horizontally(830, 80, 13)
    build_horizontally(920, 170, 14)
    build_horizontally(830, 260, 13)
    build_horizontally(920, 350, 14)
    build_horizontally(830, 440, 13)
    build_horizontally(920, 530, 14)
    build_vertically(740, 50, 17)

    wallsData.forEach(function (wall) {
        walls.create(wall.x, wall.y, 'wall').setDepth(0);
    });


    var trapsData = [
        { x: 830, y: 260 },
        { x: 920, y: 350 },
        { x: 830, y: 440 },
        { x: 50, y: 350 },
        { x: 50, y: 530 },
        { x: 80, y: 440 },
        { x: 80, y: 140 },
        { x: 200, y: 80 },
        { x: 410, y: 80 },
        { x: 320, y: 170 },
        { x: 410, y: 230 },
        { x: 350, y: 290 },
        { x: 350, y: 350 },
        { x: 290, y: 530 },
        { x: 140, y: 530 },
        { x: 470, y: 470 },
        { x: 410, y: 470 },
        { x: 530, y: 410 },
        { x: 470, y: 350 },
        { x: 530, y: 290 },
        { x: 470, y: 200 },
        { x: 530, y: 80 },
        { x: 650, y: 80 },
        { x: 590, y: 140 },
        { x: 590, y: 200 },
        { x: 590, y: 320 },
        { x: 590, y: 440 },
        { x: 590, y: 560 },
        { x: 590, y: 320 },
        { x: 590, y: 320 },
        { x: 650, y: 170 },
        { x: 650, y: 230 },
        { x: 650, y: 350 },
        { x: 650, y: 410 },
        { x: 650, y: 500 },
        { x: 740, y: 560 },
        { x: 740, y: 470 },
        { x: 740, y: 410 },
        { x: 740, y: 290 },
        { x: 740, y: 200 },
        { x: 740, y: 110 },
        { x: 830, y: 580 },
        { x: 830, y: 80 },
        { x: 1190, y: 80 },
        { x: 1010, y: 80 },
        { x: 920, y: 140 },
        { x: 1190, y: 260 },
        { x: 950, y: 260 },
        { x: 1190, y: 260 },
        { x: 1190, y: 350 },
        { x: 980, y: 350 },
        { x: 1010, y: 410 },
        { x: 1130, y: 440 },
        { x: 1190, y: 440 },
        { x: 1160, y: 500 },
        { x: 1010, y: 530 },
        { x: 920, y: 530 },
        { x: 890, y: 530 },
        { x: 1040, y: 590 },
        { x: 1130, y: 560 },
    ];

    // loop that iterates over each object in the trapsData array. For each object, the traps.create method is called to create a trap sprite at the specified x and y coordinates using the 'trap' image.
    trapsData.forEach(function (trap) {
        traps.create(trap.x, trap.y, 'trap').setDepth(1);
    });


}