// board creation
var board;
var boardWidth = 360;
var boardHeight = 610;
var context;

// bird place and dimensions
var birdWidth = 34; //a ratio of the image
var birdHeight = 24;
var birdX = boardWidth / 8;
var birdY = boardHeight / 2;
var birdImg;

var bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

//Generating the pipes
var pipeArray = [];
var pipeWidth = 64; // the ratio of the pipe image
var pipeHeight = 512;
var pipeX = boardWidth;
var pipeY = 0;
var topPipeImg;
var bottomPipeImg;

//game physics motion and gravity
var velocityX = -2;
var velocityY = 0;
var gravity = 0.4;
var gameOver = false;
var score = 0;
// Drawing on canvas
window.onload = function loading() {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // Drawing the bird
  birdImg = new Image();
  birdImg.src = "images/birdnew.jpg";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  // pipe images loading
  topPipeImg = new Image();
  topPipeImg.src = "images/toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "images/bottompipe.png";

  //call back function update
  requestAnimationFrame(update);
  setInterval(placePipes, 1800);
  document.addEventListener("keydown", moveBird);
};

function update() {
  //to clear the screen
  requestAnimationFrame(update);
  //stops the updating on the canvas like freezing the screen
  if (gameOver) {
    return;
  }
  //clear the previous frames to not ovveride on it
  context.clearRect(0, 0, board.width, board.height);

  velocityY += gravity;
  //limiting the altitude of the bird which is zero
  bird.y = Math.max(bird.y + velocityY, 0);

  // bird drawing in each frame updating it's place
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    gameOver = true;
  }

  // pipes drwaing
  for (var i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    //function to check if the bird passed the whole pipe and increase the score
    if (!pipe.passed && bird.x > pipe.x + pipe.width / 2) {
      score += 0.5;
      pipe.passed = true;
    }
    if (collision(bird, pipe)) {
      gameOver = true;
    }
  }

  //clear passed pipes from the array to save memory space
  while (pipeArray.length > 0 && pipeArray[0].x < 0 - pipeWidth) {
    pipeArray.shift();
  }

  // score count
  context.fillStyle = "white";
  context.font = "2rem sans-serif";
  context.fillText("Score: " + score, 10, 45);

  if (gameOver) {
    context.fillStyle = "black";
    context.fillText("GAME OVER", boardWidth / 4.5, boardHeight / 2);
    context.fillText("Your Score is: " + score, 70, 360);
    context.font = "1.6rem sans-serif";
    context.fillText('Press "R" to restart', 80, 200);
  }
}

// function to create the pipes
function placePipes() {
  // to stop creating of pipes thanks for the return statment
  if (gameOver) {
    return;
  }

  var randompipeY =
    pipeY - pipeHeight / 4 - Math.floor(Math.random() * (pipeHeight / 2));
  var oppeningSpace = board.height / 4;
  //create top pipe object
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randompipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(topPipe);

  var bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    //randompipeY ranges from 1 quarter to 3 quarters of the pipe height startes from -128px to -384px(total height is 512px)
    //pipeheight is 512px to calculate from the end of the top pipe
    //oppening space is the space left void to make the bird pass through which is(640/4=160px)
    y: randompipeY + pipeHeight + oppeningSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  //condition for jumping bird
  if (
    e.code == "Space" ||
    e.code == "ArrowUp" ||
    e.code == "KeyX" ||
    e.code == "KeyR"
  ) {
    velocityY = -6;

    //condition to reset the game
    if (gameOver) {
      pipeArray = [];
      score = 0;
      bird.y = birdY;
      gameOver = false;
    }
  }
}

function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
