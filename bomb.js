class Bomb {
  constructor(x,y){
      this.x = x;
      this.y = y;
      this.timer = 3;
  }

  drawBomb = () => {
      canvasContext.drawImage(bombePoseeFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
    };
    
    explode(bomberman) {
      map[this.y][this.x] = 0;
    
      let explosionRange = bomberman.range;
    
      // Explode horizontally
      for (let i = 1; i <= explosionRange; i++) {
        if (this.x + i < map[0].length && map[this.y][this.x + i] !== 2 && map[this.y][this.x + i]!== 0) {
          map[this.y][this.x + i] = 0;
          if (Math.random() < 0.3) {
            map[this.y][this.x + i] = Math.floor(Math.random() * 3) + 5;
          }
        } else {
          break;
        }
      }
    
      for (let i = 1; i <= explosionRange; i++) {
        if (this.x - i >= 0 && map[this.y][this.x - i] !== 2 && map[this.y][this.x - i]!== 0) {
          map[this.y][this.x - i] = 0;
          if (Math.random() < 0.3) {
            map[this.y][this.x - i] = Math.floor(Math.random() * 3) + 5;
          }
        } else {
          break;
        }
      }
    
      // Explode vertically
      for (let j = 1; j <= explosionRange; j++) {
        if (this.y + j < map.length && map[this.y + j][this.x] !== 2 && map[this.y + j][this.x]!== 0) {
          map[this.y + j][this.x] = 0;
          if (Math.random() < 0.3) {
            map[this.y + j][this.x] = Math.floor(Math.random() * 3) + 5;
          }
        } else {
          break;
        }
      }
    
      for (let j = 1; j <= explosionRange; j++) {
        if (this.y - j >= 0 && map[this.y - j][this.x] !== 2 && map[this.y - j][this.x]!== 0) {
          map[this.y - j][this.x] = 0;
          if (Math.random() < 0.3) {
            map[this.y - j][this.x] = Math.floor(Math.random() * 3) + 5;
          }
        } else {
          break;
        }
      }
    
      // Check if bomberman explodes
      if (
        (bomberman.x >= this.x - explosionRange && bomberman.x <= this.x + explosionRange && bomberman.y === this.y) ||
        (bomberman.y >= this.y - explosionRange && bomberman.y <= this.y + explosionRange && bomberman.x === this.x)
      ) {
        clearInterval(gameInterval);
        resetGame();
      }
    
      // Redraw the walls and bombs after an explosion
      drawWalls();
    }}