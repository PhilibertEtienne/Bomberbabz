// sprite initialization
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const bombermanFrames = document.getElementById("bomberman");
const softBlockFrames = document.getElementById("softBlock");
const hardBlockFrames = document.getElementById("hardBlock");
const objetBombFrames = document.getElementById("objetBombe");
const objetFlammeFrames = document.getElementById("objetFlamme");
const blocDurFrames = document.getElementById("blocDur");
const blocMouFrames = document.getElementById("blocMou");
const floorFrames = document.getElementById("floor");
const keurdroiteFrames = document.getElementById("keurdroite");
const keurgaucheFrames = document.getElementById("keurgauche");
const bombePoseeFrames = document.getElementById("bombePosee");
const bombetiersFrames = document.getElementById("bombetiers");
const bombe2tiersFrames = document.getElementById("bombe2tiers");
const boomFrames = document.getElementById("boom");
const blocBoomFrames = document.getElementById("blocBoom");
const gameOverFrames = document.getElementById("gameOver");
const winFrames = document.getElementById("win");
const winScreen = document.getElementById("winScreen");
const rangeBas = document.getElementById("rangeBas");
const rangeHaut = document.getElementById("rangeHaut");
const rangeDroite = document.getElementById("rangeDroite");
const rangeGauche = document.getElementById("rangeGauche");
const trophee = document.getElementById("trophee");
const tropheewow = document.getElementById("tropheewow");

let createRect = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};

//map and game initialization
let fps = 30;
let oneBlockSize = 40;
let opponent = true;
let bomberman;
let isWin = false;
let bombs = []; // Array to store active bombs
let gameRunning = true;
let gameTime = 120; // 120 seconds = 2 minutes
let gameTimerInterval; // Interval to update the timer

let map = [
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
function placeWinToken() {
  // Get random line index from map
  let minValue = 5;
  let randomLineIndex =
    Math.floor(Math.random() * (map.length - minValue + 1)) + minValue;
  let randomLine = map[randomLineIndex];

  // Get hardBlock index from the line
  let positionsWithHardBlock = [];
  for (let i = 0; i < randomLine.length; i++) {
    if (randomLine[i] === 1) {
      positionsWithHardBlock.push(i);
    }
  }

  // Change a random hardBlock to the win token (7)
  if (positionsWithHardBlock.length > 0) {
    let minValue = 6;
    let randomIndex = Math.floor(Math.random() * (positionsWithHardBlock.length - minValue + 1)) + minValue;
        let randomPositionIndex = positionsWithHardBlock[randomIndex];
    map[randomLineIndex][randomPositionIndex] = 7;
  }
}

placeWinToken();

console.log(map);
// Map drawing
let drawWalls = () => {
  if (gameRunning && !isWin) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 2) {
          // Draw hard block
          canvasContext.drawImage(
            blocDurFrames,
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize
          );
        } else if (map[i][j] === 1 || map[i][j] === 7) {
          // Draw soft block
          canvasContext.drawImage(
            blocMouFrames,
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize
          );
        } else if (map[i][j] === 0) {
          // Draw floor
          canvasContext.drawImage(
            floorFrames,
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize
          );
        } else if (map[i][j] === 3) {
          // Draw flame
          canvasContext.drawImage(
            objetFlammeFrames,
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize
          );
        } else if (map[i][j] === 4) {
          // Draw Bomb+
          canvasContext.drawImage(
            objetBombFrames,
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize
          );
        } else if (map[i][j] === 8) {
          // Draw winToken
          canvasContext.drawImage(
            tropheewow,
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize
          );
        }
      }
    }

    // Draw bombs
    for (let i = 0; i < bombs.length; i++) {
      const bomb = bombs[i];
      bomb.drawBomb();
    }
  } else if (isWin) {
    win();
  } else {
    resetGame();
  }
};

// COMMANDS CONFIGURATION

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_DOWN = 1;

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
      bomberman.direction = null;
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

// Timer initialization
function updateTimer() {
  gameTime -= 1 / fps; // Decrement the timer by 1 second
  
  if (gameTime <= 0) {
    gameRunning = false;
    clearInterval(gameTimerInterval);
    resetGame();
  }

  const minutes = Math.floor(gameTime / 60);
  const seconds = Math.floor(gameTime % 60); // Round the seconds to the nearest integer
  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;
  // Replace "timerDisplay" with the ID of your HTML element to display the timer.
  document.getElementById("timerDisplay").innerText = formattedTime;
}

// Start the timer interval when the game starts
gameTimerInterval = setInterval(updateTimer, 1000);

let update = () => {};

let draw = () => {
  if (!bomberman) {
    bomberman = new Bomberman(0, 0);
    if (opponent) {
      opponent = new Bomberman(13, 15);
    }
  }
  canvasContext.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
  drawWalls();
  bomberman.drawBomberman();
};

let gameLoop = () => {
  if (gameRunning) {
    update();
    updateBombs();
    updateTimer();

    if (gameTime <= 0) {
      gameRunning = false;
      clearInterval(gameTimerInterval);
      resetGame();
    }
  }
  draw();
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
let gameInterval = setInterval(gameLoop, 1000 / fps);

function win() {
  isWin = true;
  gameRunning = false;
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.drawImage(winScreen, 0, 0, canvas.width, canvas.height);
}

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
    placeWinToken();
    bomberman = new Bomberman(0, 0);
    bomberman.range = 1;
    bomberman.bombCount = 1;
    bombs = [];
    clearInterval(gameInterval);
    clearInterval(gameTimerInterval);
    gameTime = 120; // 120 seconds = 2 minutes
    gameInterval = setInterval(gameLoop, 1000 / fps);
    gameRunning = true;
  }, imageDisplayDuration);
}
