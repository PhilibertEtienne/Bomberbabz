class Bomb {
  constructor(x,y){
      this.x = x;
      this.y = y;
      this.timer = 3;
  }

  drawBomb = () => {
      // Set the color to black
      canvasContext.fillStyle = "black";
      
      // Fill the rectangle with black color at the bomb's position
      canvasContext.fillRect(
        this.x * oneBlockSize,
        this.y * oneBlockSize,
        oneBlockSize,
        oneBlockSize
      );  
    };
    

    explode(bomberman) {
      map[this.y][this.x] = 0; // Set the bomb position to empty/floor
    
      let explosionRange = bomberman.range; // Define the range of the explosion
    
      // Iterate over the cells in the explosion range
      for (let i = -explosionRange; i <= explosionRange; i++) {
        // Explode horizontally
          if (this.x + i >= 0 && this.x + i < map[0].length) {
            if (map[this.y][this.x + i] === 1) {
                map[this.y][this.x + i] = 0;
              if (Math.random()<0.3){
                map[this.y][this.x + i] = 0
              }
            }
          }
        
        // Explode vertically
        if (this.y + i >= 0 && this.y + i < map.length) {
          if (map[this.y + i][this.x] === 1) {
            map[this.y + i][this.x] = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
          }
        }
      }
        // Check if bomberman explodes

        if ((this.x + explosionRange >= bomberman.x && this.y === bomberman.y)||(this.x - explosionRange >= this.x && this.y === bomberman.y)) {
          clearInterval(gameInterval); 
          resetGame(); 
        }

        if ((this.y + explosionRange >= bomberman.y && this.x === bomberman.x)||(this.y - explosionRange >= this.y && this.x === bomberman.x)) {
          clearInterval(gameInterval); 
          resetGame(); 
      }    
      // Redraw the walls and bombs after an explosion
      drawWalls();
    }
  }