const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations]]
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Update the cell with the player's move
function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-cell');
    if (gameState[cellIndex] !== '' || !gameActive) return;

    // Place the player's move
    gameState[cellIndex] = currentPlayer;
    e.target.innerText = currentPlayer;
    e.target.classList.add('cell-clicked');

    // Check for winner
    if (checkWinner()) {
        gameActive = false;
        statusDisplay.innerText = `${currentPlayer} Wins!`;
        highlightWinningCells();
    } else if (gameState.every(cell => cell !== '')) {
        gameActive = false;
        statusDisplay.innerText = 'It\'s a Draw!';
    } else {
        // Switch to the next player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check if there is a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer;
    });
}

// Highlight the winning cells
function highlightWinningCells() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer) {
            cells[a].classList.add('win-animation');
            cells[b].classList.add('win-animation');
            cells[c].classList.add('win-animation');
        }
    }
}

// Reset the game
function resetGame() {
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('win-animation');
    });
    statusDisplay.innerText = '';
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
