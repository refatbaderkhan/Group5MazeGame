// creating config object with properties
const config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  backgroundColor: '#F8F0E3',
  //setting physic engine to 'arcade', a built in Phaser engine
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  //scene object, containing preload, create and update
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};



//new Phase Game
const game = new Phaser.Game(config);



//scene 1/3 : loading the game assets
function preload() {
  this.load.image('player', '/assets/images/player_level1.png');
  this.load.image('wall', '/assets/images/wall_level1.png');
  this.load.image('goal', '/assets/images/goal_level1.png');
  this.load.image('trap', '/assets/images/hole_level1.png');
  this.load.audio('scream', '/assets/audio/scream.mp3');
  this.load.audio('music_level1', '/assets/audio/music_level1.mp3');
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
  score_span.innerText = `score ${score}`

  // if timeout or bumped into cactus hide next level button
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
  localStorage.setItem('score', score)
  var modal_btn = document.getElementsByClassName('level2-to-3');

    // reset and next level button listeners
  modal_btn.addEventListener(function () {
    overlay.classList.remove('overlay-slide-right')
  });
}


//initating variables
let player;
let walls;
let goal;
let traps;
let timer;
let timerText;
let gameText;

//scene 2/3 : setting up game objects and initial state after preload
function create() {
  //play background music
  const music = this.sound.add('music_level1', { loop: false });
  music.play();
  //assiging 'player' loaded sprite to player variable ana setting position 
  player = this.physics.add.sprite(40, 40, 'player');
  //limiting the player to the window boarders
  player.setCollideWorldBounds(true);
  //creating walls static group
  walls = this.physics.add.staticGroup();
  //creating traps static group
  traps = this.physics.add.staticGroup();
  //setting up timer method
  timer = this.time.addEvent({
    delay: 60000,
    callback: endGameTime,
    callbackScope: this
  });
  //adding timer text
  timerText = this.add.text(this.cameras.main.width / 2, 10, 'Time: 30', {
    fontFamily: 'Arial',
    fontSize: 24,
    color: '#000000',
    backgroundColor: '#F5F5DC',
    fontWeight: 'bold'
  }).setOrigin(0.5, 0);
  //putting timer on top
  timerText.setDepth(1);
  //calling createMaze function written below
  createMaze();
  //adding gametext instructions 
  gameText = this.add.text(this.cameras.main.width / 2, 625, 'Guide your kitty to get some food ** Hurry up and be on time! otherwise your cat will starve :( ** Watch out for the cactus! kitty hates them ** Press ESC anytime to quit the game', {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#F5F5DC',
    fontWeight: 'bold'
  }).setOrigin(0.5, 0);
  //assiging 'goal' loaded sprite to goal variable and setting position 
  goal = this.physics.add.sprite(700, 580, 'goal');
  //limiting 'player' from running into 'walls'
  this.physics.add.collider(player, walls);
  //calling losing function when 'player' overlap 'trap', and finishing the level with game.destroy
  this.physics.add.overlap(player, traps, endGameTrap, null, this);
  //calling winning function when 'player' overlap 'goal', and finishing the level with game.destroy
  this.physics.add.overlap(player, goal, function () {
    unhideModal(false, -1, 100);
    game.destroy();
  }, null, this);
  //assigining keyboard controls built-in Phaser
  cursors = this.input.keyboard.createCursorKeys();
  //assigining ESC button to quit 
  quit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
}

//scene 3/3: automatically called with every frame update, updating the game logic
function update() {
  //setting condition to .up, .down, .left, and .right arrows when .isDown, .setVelocity on X or Y axis to change player position
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

  //calling endGameQuit function when escape button is pressed
  if (Phaser.Input.Keyboard.JustDown(quit)) {
    endGameQuit();
  }

  //remaining time calculation with rounding to show only seconds
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
  window.location = "index.html"
  game.destroy();
}

//setting createMaze function
function createMaze() {
  //setting wallsData array, with walls coordinates on X and Y axis
  var wallsData = [
    // top
    { x: 160, y: 40 },
    { x: 220, y: 40 },
    { x: 280, y: 40 },
    { x: 340, y: 40 },
    { x: 400, y: 40 },
    { x: 460, y: 40 },
    { x: 520, y: 40 },
    { x: 580, y: 40 },
    { x: 640, y: 40 },
    { x: 700, y: 40 },
    { x: 760, y: 40 },
    { x: 820, y: 40 },
    { x: 880, y: 40 },
    { x: 940, y: 40 },
    { x: 1000, y: 40 },
    { x: 1060, y: 40 },
    { x: 1120, y: 40 },
    { x: 1180, y: 40 },
    { x: 1240, y: 40 },
    // left
    { x: 40, y: 100 },
    { x: 40, y: 160 },
    { x: 40, y: 220 },
    { x: 40, y: 280 },
    { x: 40, y: 340 },
    { x: 40, y: 400 },
    { x: 40, y: 460 },
    { x: 40, y: 520 },
    { x: 40, y: 580 },
    // bottom
    { x: 100, y: 580 },
    { x: 160, y: 580 },
    { x: 220, y: 580 },
    { x: 280, y: 580 },
    { x: 340, y: 580 },
    { x: 400, y: 580 },
    { x: 460, y: 580 },
    { x: 520, y: 580 },
    { x: 580, y: 580 },
    { x: 640, y: 580 },
    { x: 760, y: 580 },
    { x: 820, y: 580 },
    { x: 880, y: 580 },
    { x: 940, y: 580 },
    { x: 1000, y: 580 },
    { x: 1060, y: 580 },
    { x: 1120, y: 580 },
    { x: 1180, y: 580 },
    // right
    { x: 1240, y: 100 },
    { x: 1240, y: 160 },
    { x: 1240, y: 220 },
    { x: 1240, y: 280 },
    { x: 1240, y: 340 },
    { x: 1240, y: 400 },
    { x: 1240, y: 460 },
    { x: 1240, y: 520 },
    { x: 1240, y: 580 },
    // barriers
    { x: 400, y: 100 },
    { x: 400, y: 160 },
    { x: 400, y: 220 },
    { x: 400, y: 280 },
    { x: 340, y: 280 },
    { x: 280, y: 280 },
    { x: 220, y: 280 },
    { x: 220, y: 220 },
    { x: 220, y: 160 },
    { x: 400, y: 400 },
    { x: 340, y: 400 },
    { x: 280, y: 400 },
    { x: 280, y: 460 },
    { x: 460, y: 400 },
    { x: 520, y: 280 },
    { x: 580, y: 280 },
    { x: 580, y: 100 },
    { x: 640, y: 280 },
    { x: 700, y: 280 },
    { x: 520, y: 400 },
    { x: 520, y: 340 },
    { x: 100, y: 460 },
    { x: 640, y: 520 },
    { x: 640, y: 460 },
    { x: 700, y: 460 },
    { x: 760, y: 280 },
    { x: 760, y: 340 },
    { x: 760, y: 400 },
    { x: 640, y: 400 },
    { x: 760, y: 400 },
    { x: 700, y: 220 },
    { x: 700, y: 160 },
    { x: 760, y: 160 },
    { x: 880, y: 160 },
    { x: 940, y: 160 },
    { x: 1000, y: 160 },
    { x: 1060, y: 160 },
    { x: 1180, y: 280 },
    { x: 1120, y: 280 },
    { x: 1060, y: 280 },
    { x: 940, y: 280 },
    { x: 880, y: 280 },
    { x: 820, y: 280 },
    { x: 880, y: 400 },
    { x: 940, y: 400 },
    { x: 1000, y: 400 },
    { x: 1060, y: 400 },
    { x: 1120, y: 400 },
    { x: 760, y: 460 },
  ];
  // loop that iterates over each object in the wallsData array. For each object, the walls.create method is called to create a wall sprite at the specified x and y coordinates using the 'wall' image.
  wallsData.forEach(function (wall) {
    walls.create(wall.x, wall.y, 'wall');
  });
  //setting trapsData array, with traps coordinates on X and Y axis
  var trapsData = [
    { x: 400, y: 520 },
    { x: 1000, y: 520 },
    { x: 160, y: 160 },
    { x: 160, y: 460 },
    { x: 820, y: 160 },
    { x: 580, y: 160 },
    { x: 1120, y: 160 },
    { x: 1120, y: 460 },
    { x: 820, y: 460 },
  ];
  // loop that iterates over each object in the trapsData array. For each object, the traps.create method is called to create a trap sprite at the specified x and y coordinates using the 'trap' image.
  trapsData.forEach(function (trap) {
    traps.create(trap.x, trap.y, 'trap');
  });
}