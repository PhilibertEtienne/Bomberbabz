 // sprite initialization
 const canvas = document.getElementById("canvas");
  const canvasContext = canvas.getContext("2d");
  const bombermanFrames = document.getElementById("bomberman")
  const softBlockFrames = document.getElementById("softBlock")
  const hardBlockFrames = document.getElementById("hardBlock")
  const objetBombFrames = document.getElementById("objetBombe")
  const objetFlammeFrames = document.getElementById("objetFlamme")
  const blocDurFrames = document.getElementById("blocDur")
  const blocMouFrames = document.getElementById("blocMou")
  const floorFrames = document.getElementById("floor")
  const keurdroiteFrames = document.getElementById("keurdroite")
  const keurgaucheFrames = document.getElementById("keurgauche")
  const bombePoseeFrames = document.getElementById("bombePosee")
  const boomFrames = document.getElementById("boom")
  const blocBoomFrames = document.getElementById("blocBoom")
  const gameOverFrames = document.getElementById("gameOver")

  let createRect = (x,y,width,height,color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x,y,width,height)
  }

  //map and game initialization
  let fps = 30;
  let oneBlockSize = 40;
  let bomberman
  let bombs = []; // Array to store active bombs
  let gameRunning = true;


  const DIRECTION_RIGHT = 4;
  const DIRECTION_UP = 3;
  const DIRECTION_LEFT = 2;
  const DIRECTION_DOWN = 1;


  let map = [ 
      [0,0,1,0,1,1,0,0,0,1,1,1,1,0,0],
      [0,2,1,2,1,2,1,2,1,2,1,2,1,2,0],
      [1,1,1,1,0,1,1,1,1,1,1,0,0,1,1],
      [1,2,1,2,0,2,1,2,1,2,1,2,1,2,1],
      [1,1,1,1,1,1,0,0,0,1,1,1,1,0,0],
      [1,2,1,2,1,2,1,2,1,2,0,2,1,2,1],
      [1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
      [0,2,1,2,1,2,1,2,1,2,1,2,1,2,0],
      [0,0,1,0,1,1,1,1,1,1,1,1,1,0,0],
]


// Map drawing
let drawWalls = () => {
  if (gameRunning){
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 2) {
        // Draw hard block
        canvasContext.drawImage(blocDurFrames, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
      } else if (map[i][j] === 1) {
        // Draw soft block
        canvasContext.drawImage(blocMouFrames, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
      } else if (map[i][j] === 0) {
        // Draw floor
        canvasContext.drawImage(floorFrames, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
      }
       else if (map[i][j] === 3) {
        // Draw flame
        canvasContext.drawImage(objetFlammeFrames, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
      }
        else if (map[i][j] === 4) {
        // Draw Bomb+
        canvasContext.drawImage(objetBombFrames, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
      }
    }
    }
  
  // Draw bombs
  for (let i = 0; i < bombs.length; i++) {
    const bomb = bombs[i];
    bomb.drawBomb();
  }
}
else {
  resetGame();
}
};



// COMMANDS CONFIGURATION
  function handleKeyDown(event) {
    const key = event.key;
  
    switch (key) {
      case "ArrowUp":
        bomberman.direction = DIRECTION_UP;
        break;
      case "ArrowDown":
        bomberman.direction = DIRECTION_DOWN;
        break;
      case "ArrowLeft":
        bomberman.direction = DIRECTION_LEFT;
        break;
      case "ArrowRight":
        bomberman.direction = DIRECTION_RIGHT;
        break;
      case " ":
        bomberman.placeBomb();
        break;
      default:
        return;
    }
    
    // Call the move function to update the Bomberman's position
    bomberman.move();
    // Call the draw function to update the display
    draw();
  }

  document.addEventListener("keydown", handleKeyDown);

  let gameLoop = () => {
    if (gameRunning) {
      update();
      updateBombs();
    }
    draw();
  }
  


    let gameOver = () => {
      if ((bomberman.life == 0)){
//todo
      }
    }
  let update =()=>{
    //todo
  }

  let draw = () => {
    if (!bomberman) {
      bomberman = new Bomberman(0,0);
    }
    canvasContext.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    // createRect(0, 0, canvas.width, canvas.height, "black");
    drawWalls();
    bomberman.drawBomberman();
  };
  


  function updateBombs() {
    for (let i = 0; i < bombs.length; i++) {
      const bomb = bombs[i];
      bomb.timer -= 1 / fps;
  
      if (bomb.timer <= 0) {
        bomb.explode(bomberman);
        bombs.splice(i, 1);
        i--;
        // Restore bomb count
        bomberman.bombCount += 1;
      }
    }
  }
    let gameInterval = setInterval(gameLoop,1000/fps)

     function resetGame() {
        let imageDisplayDuration = 2000;
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(gameOverFrames, 0, 0, canvas.width, canvas.height);
        setTimeout(() => {
        map = [
          [0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
          [0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0],
          [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
          [1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
          [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
          [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1],
          [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
          [0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0],
          [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        ];
        bomberman = new Bomberman(0, 0);
        bomberman.range = 1;
        bomberman.bombCount = 1;
        bombs = [];
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 1000 / fps);
        gameRunning = true;
      }, imageDisplayDuration);
    }