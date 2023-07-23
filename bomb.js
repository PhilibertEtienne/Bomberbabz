class Bomb {
  constructor(x,y){
      this.x = x;
      this.y = y;
      this.timer = 3;
  }

  drawBomb = () => {
    // Blockboom animation
    if (this.timer <= 0.2) {
      canvasContext.drawImage(boomFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
      let explosionRange = bomberman.range;
      let breakHorizontalPLus = false; 
      let breakHorizontalMoins = false; 
      let breakVerticalPlus = false; 
      let breakVerticalMoins = false; 

      // Explosion animation horizontal right
      for (let i = 1; i <= explosionRange; i++) {
        if (this.x + i < map[this.y].length) {
          if (map[this.y][this.x + i] == 1 || map[this.y][this.x + i] == 2 || map[this.y][this.x + i] == 7) {
            if (map[this.y][this.x + i] == 2){
              breakHorizontalPLus = true;
              break;
            }
            if (breakHorizontalPLus) {
              break;
            }
            else {
              if (map[this.y][this.x + i] == 1 || map[this.y][this.x + i] == 7){
              canvasContext.drawImage(blocBoomFrames, (this.x + i) * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
              breakHorizontalPLus = true;
              }
            }
          }
          else {
              canvasContext.drawImage(rangeDroite, (this.x + i) * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
          }
        }
      }
      // Explosion animation horizontal left
      for (let i = 1; i <= explosionRange; i++) {
        if (this.x - i < map[this.y].length) {
          if (map[this.y][this.x - i] == 1 || map[this.y][this.x - i] == 2 || map[this.y][this.x - i] == 7) {
            if (map[this.y][this.x - i] == 2){
              breakHorizontalMoins = true;
              break;
            }
            if (breakHorizontalMoins) {
              break;
            }
            else {
              if (map[this.y][this.x - i] == 1 || map[this.y][this.x + i] == 7){
              canvasContext.drawImage(blocBoomFrames, (this.x - i) * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
              breakHorizontalMoins = true;
              }
            }
          }
          else {
            canvasContext.drawImage(rangeGauche,(this.x - i)  * oneBlockSize, this.y* oneBlockSize, oneBlockSize, oneBlockSize);
        }
        }
      }
      // Explosion animation vertical up
      for (let j = 1; j <= explosionRange; j++) {
        if (this.y + j < map.length) {
          if (map[this.y + j][this.x] == 1 || map[this.y + j][this.x] == 2 || map[this.y + j][this.x] == 7) {
            if (map[this.y + j][this.x] == 2){
              breakVerticalPlus = true;
              break;
            }
            if (breakVerticalPlus) {
              break;
            }
            else {   
              if (map[this.y + j][this.x] == 1 || map[this.y][this.x + i] == 7){
              canvasContext.drawImage(blocBoomFrames, this.x * oneBlockSize, (this.y + j) * oneBlockSize, oneBlockSize, oneBlockSize);
              breakVerticalPlus = true;         
              }       
            } 
          }
          else {
            canvasContext.drawImage(rangeBas, this.x * oneBlockSize, (this.y + j) * oneBlockSize, oneBlockSize, oneBlockSize);
        }
        }
      }
      // Explosion animation vertical down
      for (let j = 1; j <= explosionRange; j++) {
        if (this.y - j >= 0) {
          if (map[this.y - j][this.x] == 1 || map[this.y - j][this.x] == 2 || map[this.y - j][this.x] == 7) {
              if (map[this.y - j][this.x] == 2) {
                  breakVerticalMoins = true;
                  break;
              }            else {   
              if (map[this.y - j][this.x] == 1 || map[this.y][this.x + i] == 7){
              canvasContext.drawImage(blocBoomFrames, this.x * oneBlockSize, (this.y - j) * oneBlockSize, oneBlockSize, oneBlockSize);
              breakVerticalMoins = true;         
              }       
            } 
          }
          else {
            canvasContext.drawImage(rangeHaut, this.x * oneBlockSize, (this.y - j) * oneBlockSize, oneBlockSize, oneBlockSize);
          }
        }
      }
    } else if (this.timer <= 3) {
      canvasContext.drawImage(bombePoseeFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
    } else if (this.timer<= 2){
      canvasContext.drawImage(bombe2tiersFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
    } else if (this.timer<= 1){
      canvasContext.drawImage(bombetiersFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
    } else {
      canvasContext.drawImage(bombePoseeFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
    }
  }

   explode(bomberman) {
    map[this.y][this.x] = 0;
    let explosionRange = bomberman.range;
    let breakExplosionHorizontalLeft = false
    let breakExplosionHorizontalRight = false
    let breakExplosionVerticalLeft = false
    let breakExplosionVerticalRightt = false

    // Explode horizontally
    for (let i = 1; i <= explosionRange; i++) {
      if (this.x + i < map[0].length && map[this.y][this.x + i] !== 2 ) {
        if (map[this.y][this.x + i] !== 7 && map[this.y][this.x+i] !== 8 && !breakExplosionHorizontalRight) {
          if (map[this.y][this.x + i] == 1) {
            if (Math.random() < 0.3  ){
              map[this.y][this.x + i] = Math.floor(Math.random() * 2) + 3
              breakExplosionHorizontalRight = true
              break
            } else {
              map[this.y][this.x + i] = 0
              breakExplosionHorizontalRight = true
              break
            }
          } else {  
            map[this.y][this.x + i] = 0
            }
        } else if (map[this.y][this.x + i] == 7){
          map[this.y][this.x + i] = 8
          break;
        } else {
          break; 
        }
      } else {
        break;
      }
    }
  
    for (let i = 1; i <= explosionRange; i++) {
      if (this.x - i >= 0 && map[this.y][this.x - i] !== 2 ) {
        if (map[this.y][this.x - i] !== 7 && map[this.y][this.x - i] !== 8){
          if (map[this.y][this.x - i] == 1) {
            if (Math.random() < 0.3 ){
            map[this.y][this.x - i] = Math.floor(Math.random() * 2) + 3
            break
          } else {
            map[this.y][this.x - i] = 0
            break
          }
        } else {
          map[this.y][this.x - i] = 0
        }
        } else if (map[this.y][this.x - i] == 7) {
            map[this.y][this.x + i] = 8
            break;
        } else {
          break; 
        }
      } else {
        break;
      }
    }
  
    // Explode vertically
    for (let j = 1; j <= explosionRange; j++) {
      if (this.y + j < map.length && map[this.y + j][this.x] !== 2 ) {
        if (map[this.y + j][this.x] !== 7 && map[this.y + j][this.x] !== 8){
          if ( map[this.y + j][this.x] ==1) {
            if (Math.random() < 0.3 ){
            map[this.y + j][this.x] = Math.floor(Math.random() * 2) + 3
            break
          } else {
            map[this.y + j][this.x] = 0
            break
          }
        } else {
          map[this.y + j][this.x] = 0
        }
      } else if (map[this.y + j][this.x] == 7){
          map[this.y + j][this.x] = 8
          break;
      } else {
          break; 
        }
      } else {
        break;
      }
    }
  
    for (let j = 1; j <= explosionRange; j++) {
      if (this.y - j >= 0 && map[this.y - j][this.x] !== 2 ) {
        if (map[this.y - j][this.x] !== 7 && map[this.y - j][this.x] !== 8){
          if (map[this.y - j][this.x] == 1) {
            if (Math.random() < 0.3){
            map[this.y - j][this.x] = Math.floor(Math.random() * 2) + 3
          break
        } else {
          map[this.y][this.x - i] = 0
          break
        }
        } else {
          map[this.y - j][this.x] = 0
        }
        } else if (map[this.y - j][this.x] == 7) {
          map[this.y - j][this.x] = 8
          break
        } else {
          break; 
        }
      } else {
        break;
      }
    }
  
    // Check if bomberman explodes vertically
    if (bomberman.x === this.x) {
      if (bomberman.y <= this.y) {
        for (let i = 0; i <= explosionRange; i++) {
          if (map[this.y - i][this.x] === 2 || map[this.y - i][this.x] === 1) {
            break;
          } else {
            if (this.y - i === bomberman.y) {
              clearInterval(gameInterval);
              gameRunning = false;
            }
          }
        }
      }
      if (bomberman.y >= this.y) {
        for (let i = 0; i <= explosionRange; i++) {
          if (map[this.y + i][this.x] === 2 || map[this.y + i][this.x] === 1) {
            break;
          } else {
            if (this.y + i === bomberman.y) {
              clearInterval(gameInterval);
              gameRunning = false;
            }
          }
        }
      }
    }

    // Check if bomberman explodes horizontally
    if (bomberman.y === this.y) {
      if (bomberman.x <= this.x) {
        for (let i = 0; i <= explosionRange; i++) {
          if (map[this.y][this.x - i] === 2 || map[this.y][this.x - i] === 1) {
            break;
          } else {
            if (this.x - i === bomberman.x) {
              clearInterval(gameInterval);
              gameRunning = false;
            }
          }
        }
      }
      if (bomberman.x >= this.x) {
        for (let i = 0; i <= explosionRange; i++) {
          if (map[this.y][this.x + i] === 2 || map[this.y][this.x + i] === 1) {
            break;
          } else {
            if (this.x + i === bomberman.x) {
              clearInterval(gameInterval);
               gameRunning = false;
            }
          }
        }
      }
    }    
    drawWalls()
 }
}
