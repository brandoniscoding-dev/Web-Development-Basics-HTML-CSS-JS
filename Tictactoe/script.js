const board = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let isGameOver = false;
let turn = document.getElementById('turn');

/**
 * Checks for a winning combination on the game board.
 */
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.find(combination => {
        const [a, b, c] = combination;
        if (board[a].textContent &&
            board[a].textContent === board[b].textContent &&
            board[a].textContent === board[c].textContent) {
            board[a].classList.add('winner');
            board[b].classList.add('winner');
            board[c].classList.add('winner');
            return true;
        }
        return false;
    });
}

/**
 * Updates the turn indicator to display the current player's turn.
 */
function gameTurn() {
    if (currentPlayer === 'X') {
        turn.textContent = 'Turn of X';
        turn.style.color = '#28a745';
    } else {
        turn.textContent = 'Turn of O';
        turn.style.color = '#dc3545';
    }
}

/**
 * Handles the click event on each game board cell.
 */
board.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent && !isGameOver) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

            if (checkWin()) {
                isGameOver = true;
                setTimeout(() => alert(`${currentPlayer} a gagné !`), 200);
            } else if ([...board].every(cell => cell.textContent)) {
                isGameOver = true;
                setTimeout(() => alert("Match nul !"), 200);
            }

            // Switch the current player and update the turn display
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameTurn();  // Mise à jour du texte du tour après changement de joueur
        }
    });
});

/**
 * Handles the restart button click event.
 */
restartButton.addEventListener('click', () => {
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
    currentPlayer = 'X';
    isGameOver = false;
    gameTurn();  // Mise à jour du texte du tour au redémarrage du jeu
});

// Initial call to display the starting player
gameTurn();
