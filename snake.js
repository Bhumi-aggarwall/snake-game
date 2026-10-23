let board = document.querySelector(".board");
let scoreElement = document.querySelector("#score");
let startBtn = document.querySelector(".start-btn");
let modal = document.querySelector(".modal");
const countdown = document.querySelector("#countdown");
const main = document.querySelector("main");
let restart = document.querySelector(".restart");
let restartButton = document.querySelector("#restart-btn");
let BestHighScore = document.querySelector("#high-score");
let timeElement = document.querySelector("#time");

let height = 50;
let width = 50;

let cols = Math.floor(board.clientWidth / width);
let rows = Math.floor(board.clientHeight / height);

let highscore = Number(localStorage.getItem("highscore")) || 0;
BestHighScore.textContent = highscore;
let score = 0;
let time = `00:00`;
let blocks = [];
let snake = [
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 1, y: 4 },
];

let timerintervalId = null;

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

let direction = "down";
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

let intervalId;
let gameRunning = false;
let paused = false;
let count = 3;

function startTimer() {
  clearInterval(timerintervalId);
  timerintervalId = setInterval(() => {
    let [min, sec] = time.split(":").map(Number);
    if (sec == 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }
    time = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    timeElement.textContent = time;
  }, 1000);
}

function placeFood(head) {
  do {
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
  } while (
    snake.some((s) => s.x === food.x && s.y === food.y) ||
    (head && head.x === food.x && head.y === food.y)
  );
}

function gameOver() {
  clearInterval(intervalId);
  clearInterval(timerintervalId);
  gameRunning = false;
  document.querySelector("#final-score").textContent = score;
  document.querySelector("#final-best").textContent = highscore;
  restart.classList.add("active");
}

function render() {
  let head = null;
  blocks[`${food.x}-${food.y}`].classList.add("food");
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    gameOver();
    return;
  }
  if (snake.slice(0, -1).some((s) => s.x === head.x && s.y === head.y)) {
    gameOver();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    placeFood(head);
    snake.push(snake[snake.length - +1]);
    updateScore();
  }

  snake.forEach((s) => {
    blocks[`${s.x}-${s.y}`].classList.remove("snake");
  });
  snake.unshift(head);
  snake.pop();
  snake.forEach((s) => {
    blocks[`${s.x}-${s.y}`].classList.add("snake");
  });
}

snake.forEach((snake) => {
  blocks[`${snake.x}-${snake.y}`].classList.add("snake");
});
blocks[`${food.x}-${food.y}`].classList.add("food");

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  modal.style.display = "none";
  main.classList.add("countdown-blur");
  countdown.style.display = "flex";
  countdown.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(countdownInterval);
      countdown.style.display = "none";
      main.classList.remove("countdown-blur");
      intervalId = setInterval(() => {
        render();
      }, 300);
      startTimer();
      gameRunning = true;
      return;
    }
    countdown.textContent = count;
  }, 1000);
});

addEventListener("keydown", (event) => {
  if (!gameRunning || paused) return;

  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  }
  if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
  if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  }
  if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

addEventListener("keydown", (event) => {
  if (!gameRunning) return;
  if (event.key === " " && !paused) {
    event.preventDefault();
    clearInterval(intervalId);
    clearInterval(timerintervalId);
    document.querySelector(".pause").classList.add("active");
    paused = true;
  } else if (event.key === "Enter" && paused) {
    // FIX: only works when paused, so intervals never stack
    document.querySelector(".pause").classList.remove("active");
    intervalId = setInterval(() => {
      render();
    }, 300);
    startTimer();
    paused = false;
  }
});

restartButton.addEventListener("click", () => {
  restart.classList.remove("active");
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((s) => {
    blocks[`${s.x}-${s.y}`].classList.remove("snake");
  });
  direction = "down";
  snake = [
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 1, y: 4 },
  ];
  placeFood(null);

  score = 0;
  scoreElement.textContent = score;
  time = "00:00";
  timeElement.textContent = time;

  paused = false;
  gameRunning = true;
  intervalId = setInterval(() => {
    render();
  }, 300);
  startTimer();
});

function updateScore() {
  score += 1;
  scoreElement.textContent = `${score}`;

  if (highscore < score) {
    highscore = score;
    localStorage.setItem("highscore", highscore);
    BestHighScore.textContent = highscore;
  }
}
