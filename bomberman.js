class Bomberman {
  constructor (x, y) {
      this.x = x;
      this.y = y;
      this.bombCount = 1;
      this.range = 1;
      this.life = 1;
      this.direction = DIRECTION_RIGHT;
      this.previousHorizontalDirection = DIRECTION_RIGHT;
  }

  drawBomberman() {
      if (gameRunning) {
          if (this.direction == DIRECTION_RIGHT) {
              canvasContext.drawImage(keurdroiteFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
              this.previousHorizontalDirection = this.direction;
          }  
          if (this.direction == DIRECTION_LEFT) {
              canvasContext.drawImage(keurgaucheFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
              this.previousHorizontalDirection = this.direction;
          } else {
              if (this.previousHorizontalDirection == DIRECTION_RIGHT) {
                  canvasContext.drawImage(keurdroiteFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
              }
              if (this.previousHorizontalDirection == DIRECTION_LEFT) {
                  canvasContext.drawImage(keurgaucheFrames, this.x * oneBlockSize, this.y * oneBlockSize, oneBlockSize, oneBlockSize);
              }
          }
      }
  }

  move() {
      let moveAble = [0, 3, 4, 8];
      switch (this.direction) {
          case DIRECTION_RIGHT:
              if (this.x + 1 < map[0].length && moveAble.includes(map[this.y][this.x + 1])) {
                  this.x += 1;
                  this.takeObject();
              }            
              break;
          case DIRECTION_UP:
              if (this.y - 1 >= 0 && moveAble.includes(map[this.y - 1][this.x])) {
                  this.y -= 1;
                  this.takeObject();
              }
              break;
          case DIRECTION_LEFT:
              if (this.x - 1 >= 0 && moveAble.includes(map[this.y][this.x - 1])) {
                  this.x -= 1;
                  this.takeObject();
              }
              break;
          case DIRECTION_DOWN:
              if (this.y + 1 < map.length && moveAble.includes(map[this.y + 1][this.x])) {
                  this.y += 1;
                  this.takeObject();
              }
              break;
      }
  }
    
  takeObject() {
      switch (map[this.y][this.x]) {
          case 3: // take flame
              map[this.y][this.x] = 0;
              this.range += 1;
              break;
          case 4: // take bomb
              map[this.y][this.x] = 0;
              this.bombCount += 1;
              break;
          case 8: // Wins
              win()
              break;
      }
  }

  placeBomb() {
      if (this.bombCount > 0) {
          const bomb = new Bomb(this.x, this.y);
          bombs.push(bomb);
          this.bombCount -= 1;
      }
  }

  getProperties() {
    return this.range + this.bombCount
  }
}
