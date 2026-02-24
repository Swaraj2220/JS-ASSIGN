const grid = document.getElementById("grid")
const scoreDisplay = document.getElementById("score")
const timeDisplay = document.getElementById("time")

let score = 0
let activeMole = -1
let timeLeft = 30
let moleTimer = null
let gameTimer = null

// setup grid
function createGrid() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div")
    cell.className = "hole"
    cell.dataset.index = i
    cell.onclick = () => hitMole(i, cell)
    grid.appendChild(cell)
  }
}

function showRandomMole() {
  clearMoles()

  const holes = grid.children
  const rand = Math.floor(Math.random() * holes.length)

  holes[rand].textContent = "🐹"
  activeMole = rand
}

function clearMoles() {
  [...grid.children].forEach(hole => (hole.textContent = ""))
}

function hitMole(index, element) {
  if (index !== activeMole) return

  score++
  scoreDisplay.textContent = score
  activeMole = -1
  element.textContent = ""
}

function resetGame() {
  score = 0
  timeLeft = 30
  scoreDisplay.textContent = score
  timeDisplay.textContent = timeLeft
}

function startGame() {
  resetGame()

  moleTimer = setInterval(showRandomMole, 700)

  gameTimer = setInterval(() => {
    timeLeft--
    timeDisplay.textContent = timeLeft

    if (timeLeft === 0) {
      stopGame()
    }
  }, 1000)
}

function stopGame() {
  clearInterval(moleTimer)
  clearInterval(gameTimer)
  alert("Game Over! Your score: " + score)
}

createGrid()