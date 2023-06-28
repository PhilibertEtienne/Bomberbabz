class Bomberman {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.bombCount = 1;
        this.range = 1;
        this.life = 0;
        this.direction = DIRECTION_RIGHT;
    }


    drawBomberman() {
        canvasContext.fillStyle = playerColor;
        canvasContext.fillRect(
          this.x * oneBlockSize,
          this.y * oneBlockSize,
          oneBlockSize,
          oneBlockSize
        );
      }
      
    
      move() {
        let moveAble = [0, 5, 6, 7];
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
      
      takeObject(){
        switch (map[this.y][this.x]){
          case 5:           // take flame
          map[this.y][this.x] = 0;
          this.range += 1;
          break;

          case 6:           // take roller
          map[this.y][this.x] = 0;
          //speedtodo
          break;

          case 7:           // take bomb
          map[this.y][this.x] = 0;
          this.bombCount += 1;
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
}