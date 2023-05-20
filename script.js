  const canvas = document.getElementById("canvas");
  const canvasContext = canvas.getContext("2d");
  const bombermanFrames = document.getElementById("bomberman")
  const softBlockFrames = document.getElementById("softBlock")
  const hardBlockFrames = document.getElementById("hardBlock")

  let createRect = (x,y,width,height,color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x,y,width,height)
  }

  let fps = 30;
  let oneBlockSize = 40;
  let hardBlockColor = "#342DCA";
  let floorColor = '#40e355';
  let softBlockColor = '#8a6a37'
  let playerColor ='#03a9fc'
  let flameColor ='#e0020d'
  let moreBombColor ='#2f2f91'
  let moreSpeedColor ='#f7df23'
  let bomberman

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

let drawWalls = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 2) {
        // Draw hard block
        canvasContext.drawImage(hardBlockFrames, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
      } else if (map[i][j] === 1) {
        // Draw soft block
        canvasContext.drawImage(softBlockFrames, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
      } else if (map[i][j] === 0) {
        // Draw floor
        createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, floorColor);
      }
       else if (map[i][j] === 5) {
        // Draw floor
        createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, flameColor);
      }
        else if (map[i][j] === 6) {
        // Draw floor
        createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, moreBombColor);
      }
       else if (map[i][j] === 7) {
        // Draw floor
        createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, moreSpeedColor);
      }
    }
  }
  // Draw bombs
  for (let i = 0; i < bombs.length; i++) {
    const bomb = bombs[i];
    bomb.drawBomb();
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
        return; // Ignore other keys
    }
  
    // Call the move function to update the Bomberman's position
    bomberman.move();
    // Call the draw function to update the display
    draw();
  }
  
    // Call the draw function to update the display

  document.addEventListener("keydown", handleKeyDown);

  let gameLoop =() => {
    update()
    updateBombs();
    draw()
  }

  let update =()=>{
    //todo
  }

  let draw = () => {
    if (!bomberman) {
      bomberman = new Bomberman(0,0);
    }
    canvasContext.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    createRect(0, 0, canvas.width, canvas.height, "black");
    drawWalls();
    bomberman.drawBomberman();
  };
  


  let gameInterval = setInterval(gameLoop,1000/fps)
  
  let bombs = []; // Array to store active bombs

  function updateBombs() {
    for (let i = 0; i < bombs.length; i++) {
      const bomb = bombs[i];
      bomb.timer -= 1 / fps;
  
      if (bomb.timer <= 0) {
        bomb.explode();
        bombs.splice(i, 1);
        i--;
      // Restore bomb count
      bomberman.bombCount += 1;

        }
      }
    }
