const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 10;
const gridWidth = canvas.width / cellSize;
const gridHeight = canvas.height / cellSize;
const frameRate = 100;

let grid = createGrid();
let birthRules = [3];
let survivalRules = [2, 3];

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const stepBtn = document.getElementById("stepBtn");
const clearBtn = document.getElementById("clearBtn");

const generationsCounter = document.getElementById("generationsCounter");
const aliveCounter = document.getElementById("aliveCounter");
const everLivedCounter = document.getElementById("everLivedCounter");
const diedCounter = document.getElementById("diedCounter");
const infectedCounter = document.getElementById("infectedCounter");
const recoveredCounter = document.getElementById("recoveredCounter");
const permadeadCounter = document.getElementById("permadeadCounter");

let generations = 0;
let everLived = 0;
let died = 0;
let infected= 0;
let permadead=0;
let recovered= 0;

let isRunning = false;
let interval;

function createGrid() {
  const grid = [];
  for (let y = 0; y < gridHeight; y++) {
    grid[y] = [];
    for (let x = 0; x < gridWidth; x++) {
      grid[y][x] = {
        alive: 0,
        age: 0,
        infected: 0,
        permadead: 0,
        recovered: 0
      };
    }
  }
  return grid;
}

function countNeighbors(x, y) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight) {
        count += grid[ny][nx].alive;
      }
    }
  }
  return count;
}

function getColor(age) {
  const blue = Math.min(255, Math.floor((age * 255) / 70));
  return `rgb(0, 0, ${blue})`;
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(128, 128, 128, 0.5)";
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const cell = grid[y][x];
      if (cell.alive) {
        if (cell.infected) {
          const gradient = ctx.createRadialGradient(
            x * cellSize + cellSize / 2,
            y * cellSize + cellSize / 2,
            0,
            x * cellSize + cellSize / 2,
            y * cellSize + cellSize / 2,
            cellSize / 2
          );
          gradient.addColorStop(0, "red");
          gradient.addColorStop(1, "black");
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = getColor(cell.age);
        }
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function updateGrid() {
  const nextGrid = createGrid();
  let alive = 0;

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const neighbors = countNeighbors(x, y);
      const cell = grid[y][x];
      if (cell.alive) {
        if (survivalRules.includes(neighbors)) {
          nextGrid[y][x].alive = 1;
          nextGrid[y][x].age = cell.age + 1;
          alive++;
        } else {
          nextGrid[y][x].alive = 0;
          nextGrid[y][x].age = 0;
          died++;
        }
      } else {
        if (birthRules.includes(neighbors)) {
          nextGrid[y][x].alive = 1;
          nextGrid[y][x].age = 1;
          alive++;
          everLived++;
        }
      }

      if (generations === 200) {
        const randX = Math.floor(Math.random() * gridWidth);
        const randY = Math.floor(Math.random() * gridHeight);
        grid[randY][randX].infected = 1;
      }

      let infected = 0;
      let recovered = 0;
      let permadead = 0;

      if (cell.infected) {
        infected++;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight) {
              if (!grid[ny][nx].infected && grid[ny][nx].alive) {
                nextGrid[ny][nx].infected = 1;
              }
            }
          }
        }

        if (Math.random() < 0.1) {
          nextGrid[y][x].infected = 0;
          nextGrid[y][x].recovered = 1;
          recovered++;
        } else if (Math.random() < 0.05) {
          nextGrid[y][x].alive = 0;
          nextGrid[y][x].infected = 0;
          nextGrid[y][x].permadead = 1;
          permadead++;
        }
      } else if (cell.recovered) {
        recovered++;
      } else if (cell.permadead) {
        permadead++;
      }

      nextGrid[y][x].infected = cell.infected;
      nextGrid[y][x].recovered = cell.recovered;
      nextGrid[y][x].permadead = cell.permadead;
    }
  }

  grid = nextGrid;
  generations++;

  generationsCounter.textContent = generations;
  aliveCounter.textContent = alive;
  everLivedCounter.textContent = everLived;
  diedCounter.textContent = died;
  infectedCounter.textContent = infected;
  recoveredCounter.textContent = recovered;
  permadeadCounter.textContent = permadead;
}

function clearCanvas() {
  grid = createGrid();
  generations = 0;
  everLived = 0;
  died = 0;
  drawGrid();

  generationsCounter.textContent = generations;
  aliveCounter.textContent = 0;
  everLivedCounter.textContent = everLived;
  diedCounter.textContent = died;
  infectedCounter.textContent = 0;
  recoveredCounter.textContent = 0;
  permadeadCounter.textContent = 0;
}

function startSimulation() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      updateGrid();
      drawGrid();
    }, frameRate);
  }
}

function pauseSimulation() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
  }
}

function stopSimulation() {
  pauseSimulation();
  clearCanvas();
}

function stepSimulation() {
  if (!isRunning) {
    updateGrid();
    drawGrid();
  }
}

startBtn.addEventListener("click", startSimulation);
pauseBtn.addEventListener("click", pauseSimulation);
stopBtn.addEventListener("click", stopSimulation);
stepBtn.addEventListener("click", stepSimulation);
clearBtn.addEventListener("click", clearCanvas);

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize);

  grid[y][x].alive = !grid[y][x].alive;
  grid[y][x].age = grid[y][x].alive ? 1 : 0;

  if (grid[y][x].alive) {
    everLived++;
  }

  drawGrid();
});

drawGrid();
