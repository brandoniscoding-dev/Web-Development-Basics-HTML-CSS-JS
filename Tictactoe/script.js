const board = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let isGameOver = false;

/**
 * Checks for a winning combination on the game board.
 *
 * @returns {Array|null} - Returns the winning combination if found, otherwise returns null.
 *
 * @example
 * const winningCombination = checkWin();
 * if (winningCombination) {
 *     console.log(`Winning combination: ${winningCombination}`);
 * } else {
 *     console.log('No winning combination found');
 * }
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
 * Handles the click event on each game board cell.
 * Places the current player's symbol in the clicked cell, checks for a win or a draw,
 * and switches the current player.
 *
 * @param {Event} event - The click event object.
 */
board.forEach(cell => {
    cell.addEventListener('click', () => {
        // Check if the cell is empty and the game is not over
        if (!cell.textContent && !isGameOver) {
            // Place the current player's symbol in the clicked cell
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

            // Check for a win
            if (checkWin()) {
                // Set the game status to over
                isGameOver = true;
                // Display a winning alert after a slight delay
                setTimeout(() => alert(`${currentPlayer} a gagné !`), 200);
            } else if ([...board].every(cell => cell.textContent)) {
                // Set the game status to over
                isGameOver = true;
                // Display a draw alert after a slight delay
                setTimeout(() => alert("Match nul !"), 200);
            }

            // Switch the current player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

/**
 * Handles the restart button click event.
 * Resets the game board, removes player symbols and winner styles,
 * and sets the current player to 'X' and the game status to not over.
 */
restartButton.addEventListener('click', () => {
    // Iterate over each cell on the game board
    board.forEach(cell => {
        // Clear the cell text content
        cell.textContent = '';
        // Remove player symbols and winner styles
        cell.classList.remove('x', 'o', 'winner');
    });
    // Set the current player to 'X'
    currentPlayer = 'X';
    // Set the game status to not over
    isGameOver = false;
});
