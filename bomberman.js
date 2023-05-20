class Bomberman {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.bombCount = 1;
    }

    draw() {
        canvasContext.fillStyle = playerColor;
        canvasContext.fillRect(
          this.x * oneBlockSize,
          this.y * oneBlockSize,
          oneBlockSize,
          oneBlockSize
        );
      }
      
    
    move() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
            if (this.x + 1 < map[0].length && map[this.y][this.x + 1] === 0) {
                this.x += 1;
            }
            break;
            case DIRECTION_UP:
            if (this.y - 1 >= 0 && map[this.y - 1][this.x] === 0) {
                this.y -= 1;
            }
            break;
            case DIRECTION_LEFT:
            if (this.x - 1 >= 0 && map[this.y][this.x - 1] === 0) {
                this.x -= 1;
            }
            break;
            case DIRECTION_DOWN:
            if (this.y + 1 < map.length && map[this.y + 1][this.x] === 0) {
                this.y += 1;
            }
            break;
        }
    }

    placeBomb() {
        if (this.bombCount > 0) {
          const bomb = new Bomb(this.x, this.y);
          bombs.push(bomb);
          bomb.draw;
          this.bombCount -= 1;
        }
      }
}