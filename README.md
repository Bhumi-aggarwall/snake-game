# 🐍 Snake Game

A classic Snake Game built with HTML, CSS, and Vanilla JavaScript. The game features a countdown before gameplay, pause and resume controls, real-time score and timer tracking, and a high score saved in the browser.

## 🎮 Live Demo

[Play Snake Game](https://bhumi-aggarwall.github.io/snake-game/)

## ✨ Features

- 3-2-1 countdown before the game starts
- Pause and resume gameplay
- Live score, high score, and timer display
- High score saved using `localStorage`
- Game over screen displaying the final score and best score
- Collision detection for walls and the snake's own body
- Random food generation that prevents food from spawning on the snake

## 🕹️ Controls

| Key | Action |
|---|---|
| Arrow Up | Move up |
| Arrow Down | Move down |
| Arrow Left | Move left |
| Arrow Right | Move right |
| Space | Pause the game |
| Enter | Resume the game |

## 🛠️ Tech Stack

- **HTML5** – Game structure
- **CSS3** – Styling, custom properties, Flexbox, and Grid
- **JavaScript (ES6)** – Game logic, movement, collision detection, and timers

## 📂 Project Structure
snake-game/
├── index.html
├── snake.css
├── snake.js
└── README.md

🚀 Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Bhumi-aggarwall/snake-game.git
   ```

2. Navigate to the project folder:

   ```bash
   cd snake-game
   ```

3. Open `index.html` in your browser, or use the Live Server extension in VS Code.

## 🧠 Key Learnings

- Managing multiple `setInterval()` timers and clearing them correctly during pause, resume, restart, and game over
- Preventing duplicate game loops using state variables and flags
- Persisting high scores using `localStorage`
- Handling case-sensitive keys in browser storage
- Separating game state, movement, and rendering logic

## 🔮 Future Improvements

- Add touch controls for mobile devices
- Introduce multiple difficulty levels
- Implement a global leaderboard using Node.js, Express, and MongoDB

## 👩‍💻 Author

**Bhumi Aggarwal**

[GitHub Profile](https://github.com/Bhumi-aggarwall)
