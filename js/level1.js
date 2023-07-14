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
    this.load.image('player', '../assets/images/player.png');
    this.load.image('wall', '../assets/images/wall.png');
    this.load.image('goal', '../assets/images/player.png');
  }
  
  let player;
  let walls;
  let goal;
  
  function create() {
    player = this.physics.add.sprite(50, 50, 'player');
    player.setCollideWorldBounds(true);
  
    walls = this.physics.add.staticGroup();
    createMaze();
  
    goal = this.physics.add.sprite(750, 550, 'goal');
  
    this.physics.add.collider(player, walls);
  
    this.physics.add.overlap(player, goal, function() {
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
    var wallsData = [
      { x: 200, y: 100 },
      { x: 300, y: 100 },
      { x: 400, y: 100 },
      { x: 500, y: 100 },
      { x: 600, y: 100 },
      { x: 100, y: 200 },
      { x: 100, y: 300 },
      { x: 100, y: 400 },
      { x: 100, y: 500 },
      { x: 200, y: 500 },
      { x: 300, y: 500 },
      { x: 400, y: 500 },
      { x: 500, y: 500 },
      { x: 600, y: 500 },
      { x: 600, y: 200 },
      { x: 600, y: 300 },
      { x: 600, y: 400 },
      { x: 700, y: 100 },
      { x: 700, y: 200 },
      { x: 700, y: 300 },
      { x: 700, y: 400 },
      { x: 700, y: 500 }
    ];
  
    wallsData.forEach(function(wall) {
      walls.create(wall.x, wall.y, 'wall');
    });
  }