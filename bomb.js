class Bomb {
  constructor(x,y){
      this.x = x;
      this.y = y;
      this.timer = 3;
  }

  drawBomb = () => {
    // Animation boom
    if (this.timer <= 0.2) {
      canvasContext.drawImage(boomFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
      let explosionRange = bomberman.range;
      let breakHorizontalPLus = false; 
      let breakHorizontalMoins = false; 
      let breakVerticalPlus = false; 
      let breakVerticalMoins = false; 

      // Animation explosion block horizontal +
      for (let i = 1; i <= explosionRange; i++) {
        if (this.x + i < map[this.y].length) {
          if (map[this.y][this.x + i] == 1 || map[this.y][this.x + i] == 2 ) {
            if (map[this.y][this.x + i] == 2){
              breakHorizontalPLus = true;
              break;
            }
            if (breakHorizontalPLus) {
              break;
            }
            else {
              if (map[this.y][this.x + i] == 1){
              canvasContext.drawImage(blocBoomFrames, (this.x + i) * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
              breakHorizontalPLus = true;
              }
            }
          }
        }
      }
      // Animation explosion block horizontal -
      for (let i = 1; i <= explosionRange; i++) {
        if (this.x - i < map[this.y].length) {
          if (map[this.y][this.x - i] == 1 || map[this.y][this.x - i] == 2 ) {
            if (map[this.y][this.x - i] == 2){
              breakHorizontalMoins = true;
              break;
            }
            if (breakHorizontalMoins) {
              break;
            }
            else {
              if (map[this.y][this.x - i] == 1){
              canvasContext.drawImage(blocBoomFrames, (this.x - i) * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
              breakHorizontalMoins = true;
              }
            }
          }
        }
      }
      // Animation explosion block vertical +
      for (let j = 1; j <= explosionRange; j++) {
        if (this.y + j < map.length) {
          if (map[this.y + j][this.x] == 1 || map[this.y + j][this.x] == 2 ) {
            if (map[this.y + j][this.x] == 2){
              breakVerticalPlus = true;
              break;
            }
            if (breakVerticalPlus) {
              break;
            }
            else {   
              if (map[this.y + j][this.x] == 1){
              canvasContext.drawImage(blocBoomFrames, this.x * oneBlockSize, (this.y + j) * oneBlockSize, oneBlockSize, oneBlockSize);
              breakVerticalPlus = true;         
              }       
            } 
          }
        }
      }
      // Animation explosion block vertical -
      for (let j = 1; j <= explosionRange; j++) {
        if (this.y - j >= 0) {
          if (map[this.y - j][this.x] == 1 || map[this.y - j][this.x] == 2) {
              if (map[this.y - j][this.x] == 2) {
                  breakVerticalMoins = true;
                  break;
              }            else {   
              if (map[this.y - j][this.x] == 1){
              canvasContext.drawImage(blocBoomFrames, this.x * oneBlockSize, (this.y - j) * oneBlockSize, oneBlockSize, oneBlockSize);
              breakVerticalMoins = true;         
              }       
            } 
          }
        }
      }
      // // Animation explosion block vertical -
      // for (let j = 1; j <= explosionRange; j++) {
      //   if (this.y - j < map.length) {
      //     if (map[this.y - j][this.x] == 1 || map[this.y - j][this.x] == 2 ) {
      //       if (map[this.y - j][this.x] == 2){
      //         breakVerticalMoins = true;
      //         break;
      //       }
      //       if (breakVerticalMoins) {
      //         break;
      //       }
      //       else {   
      //         if (map[this.y - j][this.x] == 1){
      //         canvasContext.drawImage(blocBoomFrames, this.x * oneBlockSize, (this.y - j) * oneBlockSize, oneBlockSize, oneBlockSize);
      //         breakVerticalMoins = true;         
      //         }       
      //       } 
      //     }
      //   }
      // }
    }
    else {
      canvasContext.drawImage(bombePoseeFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
    }
  }

  explode(bomberman) {
    map[this.y][this.x] = 0;
  
    let explosionRange = bomberman.range;
  
    // Explode horizontally
    for (let i = 1; i <= explosionRange; i++) {
      if (this.x + i < map[0].length && map[this.y][this.x + i] !== 2 && map[this.y][this.x + i] !== 0) {
        map[this.y][this.x + i] = 0;
        if (Math.random() < 0.3) {
          map[this.y][this.x + i] = Math.floor(Math.random() * 2) + 3;
        } else {
          break; // stop iteration if a block is exploded
        }
      } else {
        break;
      }
    }
  
    for (let i = 1; i <= explosionRange; i++) {
      if (this.x - i >= 0 && map[this.y][this.x - i] !== 2 && map[this.y][this.x - i] !== 0) {
        map[this.y][this.x - i] = 0;
        if (Math.random() < 0.3) {
          map[this.y][this.x - i] = Math.floor(Math.random() * 2) + 3;
        } else {
          break; // stop iteration if a block is exploded
        }
      } else {
        break;
      }
    }
  
    // Explode vertically
    for (let j = 1; j <= explosionRange; j++) {
      if (this.y + j < map.length && map[this.y + j][this.x] !== 2 && map[this.y + j][this.x] !== 0) {
        map[this.y + j][this.x] = 0;
        if (Math.random() < 0.3) {
          map[this.y + j][this.x] = Math.floor(Math.random() * 2) + 3;
        } else {
          break; // stop iteration if a block is exploded
        }
      } else {
        break;
      }
    }
  
    for (let j = 1; j <= explosionRange; j++) {
      if (this.y - j >= 0 && map[this.y - j][this.x] !== 2 && map[this.y - j][this.x] !== 0) {
        map[this.y - j][this.x] = 0;
        if (Math.random() < 0.3) {
          map[this.y - j][this.x] = Math.floor(Math.random() * 2) + 3;
        } else {
          break; // stop iteration if a block is exploded
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