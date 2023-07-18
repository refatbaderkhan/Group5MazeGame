let maze = document.querySelector(".maze3");
let ctx = maze.getContext("2d");
let generationComplete = false;
let current;
let goal;
let overlay = document.getElementById('overlay');
let score_span = document.getElementById('score-span');
let total_score = parseInt(localStorage.getItem('score'));
let main_btn = document.getElementById('main_btn');

class Maze {
  constructor(size, rows, columns) {
    this.size = size;
    this.columns = columns;
    this.rows = rows;
    this.grid = [];
    this.stack = [];
  }
  setup() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        let cell = new Cell(r, c, this.grid, this.size);
        row.push(cell);
      }
      this.grid.push(row);
    }
    current = this.grid[0][0];
    this.grid[this.rows - 1][this.columns - 1].goal = true;
  }
  draw() {
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = "rgb(248, 240, 227)";
    current.visited = true;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c].show(this.size, this.rows, this.columns);
      }
    }
    let next = current.checkNeighbours();
    if (next) {
      next.visited = true;
      this.stack.push(current);
      current.highlight(this.columns);
      current.removeWalls(current, next);
      current = next;
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop();
      current = cell;
      current.highlight(this.columns);
    }
    if (this.stack.length === 0) {
      generationComplete = true;
      return;
    }

    window.requestAnimationFrame(() => {
      this.draw();
    });
  }
}

class Cell {
  constructor(rowNum, colNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
    this.goal = false;
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
  }

  checkNeighbours() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];

    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    if (neighbours.length !== 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return undefined;
    }
  }

  drawTopWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }

  drawRightWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawBottomWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawLeftWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }

  highlight(columns) {
    let x = (this.colNum * this.parentSize) / columns;
    let y = (this.rowNum * this.parentSize) / columns;
    ctx.drawImage(catImage, x + 1, y + 1, this.parentSize / columns - 2, this.parentSize / columns - 2);
  }

  removeWalls(cell1, cell2) {
    let x = cell1.colNum - cell2.colNum;
    if (x === 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x === -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }
    let y = cell1.rowNum - cell2.rowNum;
    if (y === 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y === -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }

  show(size, rows, columns) {
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;
    ctx.strokeStyle = "rgba(255, 99, 71, 0.5)";
    ctx.fillStyle = "rgb(248, 240, 227)";
    ctx.lineWidth = 2;
    if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
    if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
    if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
    if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
    if (this.visited) {
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
    if (this.goal) {
      ctx.drawImage(catImage, x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
  }
}
let newMaze;
window.addEventListener("load", generateMaze);
document.addEventListener("keydown", move);

let catImage;
window.addEventListener('load', () => {
  catImage = new Image();
  catImage.src = '../assets/images/player_level1.png';
  catImage.onload = generateMaze;
});

function generateMaze(e) {
  e.preventDefault();

  newMaze = new Maze(600, 25, 25);
  newMaze.setup();
  newMaze.draw();
}

function move(e) {
  if (!generationComplete) return;
  let key = e.key;
  let row = current.rowNum;
  let col = current.colNum;

  switch (key) {
    case "ArrowUp":
      if (!current.walls.topWall) {
        let next = newMaze.grid[row - 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {
          overlay.classList.add('overlay-slide-right');
          let total_score = 300 + parseInt(localStorage.getItem('score'));
          localStorage.setItem('score', total_score);
          score_span.innerText = `Score ${total_score}`;
        }
      }
      break;

    case "ArrowRight":
      if (!current.walls.rightWall) {
        let next = newMaze.grid[row][col + 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {
          overlay.classList.add('overlay-slide-right');
          let total_score = 300 + parseInt(localStorage.getItem('score'));
          localStorage.setItem('score', total_score);
          score_span.innerText = `Score ${total_score}`;
        }      
      }
      break;

    case "ArrowDown":
      if (!current.walls.bottomWall) {
        let next = newMaze.grid[row + 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {
          overlay.classList.add('overlay-slide-right');
          let total_score = 300 + parseInt(localStorage.getItem('score'));
          localStorage.setItem('score', total_score);
          score_span.innerText = `Score ${total_score}`;
        }      
      }
      break;

    case "ArrowLeft":
      if (!current.walls.leftWall) {
        let next = newMaze.grid[row][col - 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {
          overlay.classList.add('overlay-slide-right');
          let total_score = 300 + parseInt(localStorage.getItem('score'));
          localStorage.setItem('score', total_score);
          score_span.innerText = `Score ${total_score}`;
        }      
      }
      break;
  }
}
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    localStorage.setItem('score',0);
    window.location.href = "../index.html" ; 
  }
});

main_btn.addEventListener('click', function(){
  localStorage.setItem('score', 0);
})