const canvasContext = canvas.getContext("2d");

const images = [
  { id: 'bomberman', src: 'Images/bomberman.png' },
  { id: 'softBlock', src: 'Images/softBlock.png' },
  { id: 'bombePosee', src: 'Images/bombe-posee.png' },
  { id: 'boom', src: 'Images/boom.png' },
  { id: 'floor', src: 'Images/case-vide-fond.png' },
  { id: 'keurdroite', src: 'Images/keurdroite.png' },
  { id: 'keurgauche', src: 'Images/keurgauche.png' },
  { id: 'objetBombe', src: 'Images/objet-bombe.png' },
  { id: 'objetFlamme', src: 'Images/objet-flamme.png' },
  { id: 'blocDur', src: 'Images/bloc-dur.png' },
  { id: 'blocMou', src: 'Images/bloc-mou.png' },
  { id: 'blocboomFrames', src: 'Images/bloc-boom.jpg' }
];

  const imagePromises = images.map((imageInfo) => {
    const img = new Image();
    img.src = imageInfo.src;
  
    return new Promise((resolve) => {
      img.onload = () => {
        // Image loaded successfully
        resolve({ id: imageInfo.id, img });
      };
    });
  });
  Promise.all(imagePromises)
  .then((loadedImages) => {
    // All images have been loaded successfully
    const loadedImagesMap = Object.fromEntries(loadedImages.map(({ id, img }) => [id, img]));

    // Now you can use the loaded images as needed (e.g., drawing on the canvas)
    const bombermanFrames = loadedImagesMap.bomberman;
    const softBlockFrames = loadedImagesMap.softBlock;
    const bombePoseeFrames = loadedImagesMap.bombePosee;
    const boomFrames = loadedImagesMap.boom;
    const caseVideFond = loadedImagesMap.floor;
    const keurdroite = loadedImagesMap.keurdroite;
    const keurgauche = loadedImagesMap.keurgauche;
    const objetBombe = loadedImagesMap.objetBombe;
    const objetFlamme = loadedImagesMap.objetFlamme;
    const blocDur = loadedImagesMap.blocDur;
    const blocMou = loadedImagesMap.blocMou;
    const blocBoomFrames = loadedImagesMap.blocboomFrames;

    // Call other functions that depend on loaded images or start your game loop
  
    let drawWalls = () => {
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
          if (map[i][j] === 2) {
            // Draw hard block
            canvasContext.drawImage(blocDur, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
          } else if (map[i][j] === 1) {
            // Draw soft block
            canvasContext.drawImage(blocMou, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
          } else if (map[i][j] === 0) {
            // Draw floor
            canvasContext.drawImage(caseVideFond, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
          }
           else if (map[i][j] === 5) {
            // Draw flame
            canvasContext.drawImage(objetFlamme, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
          }
            else if (map[i][j] === 6) {
            // Draw Bomb+
            canvasContext.drawImage(objetBombe, j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
          }
           else if (map[i][j] === 7) {
            // Draw Speed
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

    // Call other functions that depend on loaded images or start your game loop
    let gameLoop =() => {
      update()
      updateBombs();
      draw()
    }
    gameLoop();
  })
  .catch((error) => {
    // Handle error while loading images
    console.error('Error loading images:', error);
  });

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
  let bombs = []; // Array to store active bombs

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
        event.preventDefault();
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
  

