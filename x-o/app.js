const cells = document.querySelectorAll('.parent-div div')

let currentPlayer = 'x'
const moves = {
    x: [],
    o: []
}

const winningMoves = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

// initialize clicks
cells.forEach((cell, i) => {
    cell.addEventListener('click', () => handleMove(cell, i + 1))
})

function handleMove(cell, position) {
    if (cell.textContent) return   // stop overwrite

    cell.textContent = currentPlayer
    moves[currentPlayer].push(position)

    if (checkWinner(currentPlayer)) return

    switchTurn()
}

function switchTurn() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
}

function checkWinner(player) {
    const playerMoves = moves[player]

    for (let pattern of winningMoves) {
        if (pattern.every(num => playerMoves.includes(num))) {
            alert(player === 'x' ? "Player 1 wins" : "Player 2 wins")
            return true
        }
    }

    if (moves.x.length + moves.o.length === 9) {
        alert("Draw")
        return true
    }

    return false
}