const config = {
    type: Phaser.AUTO,
       width: '100%',
      height: '100%',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0},
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
    this.load.image('player', '../assets/images/player_level1.png');
    this.load.image('wall', '../assets/images/wall_level1.png');
    this.load.image('goal', '../assets/images/player_level1.png');
  }
  
  let player;
  let walls;
  let goal;
  
  function create() {
    player = this.physics.add.sprite(40, 40, 'player');
    player.setCollideWorldBounds(true);
  
    walls = this.physics.add.staticGroup();
    createMaze();
  
    goal = this.physics.add.sprite(700, 580, 'goal');
  
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
      // top
      // { x: 100, y: 40 },
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
      // 
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
      { x: 160, y: 160 },
      { x: 400, y: 400 },
      { x: 340, y: 400 },
      { x: 280, y: 400 },
      { x: 280, y: 460 },
      { x: 400, y: 520 },
      { x: 460, y: 400 },
      { x: 520, y: 280 },
      { x: 580, y: 280 },
      { x: 580, y: 100 },
      { x: 580, y: 160 },
      { x: 640, y: 280 },
      { x: 700, y: 280 },
      { x: 520, y: 400 },
      { x: 520, y: 340 },
      { x: 100, y: 460 },
      { x: 160, y: 460 },
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
      { x: 820, y: 160 },
      { x: 820, y: 160 },
      { x: 880, y: 160 },
      { x: 940, y: 160 },
      { x: 1000, y: 160 },
      { x: 1060, y: 160 },
      { x: 1120, y: 160 },
      { x: 1180, y: 280 },
      { x: 1120, y: 280 },
      { x: 1060, y: 280 },
      { x: 940, y: 280 },
      { x: 880, y: 280 },
      { x: 820, y: 280 },
      { x: 820, y: 460 },
      { x: 880, y: 400 },
      { x: 940, y: 400 },
      { x: 1000, y: 400 },
      { x: 1060, y: 400 },
      { x: 1120, y: 400 },
      { x: 1120, y: 460 },
      { x: 1000, y: 520 },
      { x: 760, y: 460 },
      
      
    ];
  
    wallsData.forEach(function(wall) {
      walls.create(wall.x, wall.y, 'wall');
    });
  }