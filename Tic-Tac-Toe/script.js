// Chargement des fichiers audio
const clickSound = new Audio('sounds/click.mp3');
const winSound = new Audio('sounds/win.mp3');
const tieSound = new Audio('sounds/tie.mp3');

const board = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let isGameOver = false;
let turn = document.getElementById('turn');

// Fonction pour jouer le son de clic sur chaque case
function playClickSound() {
    clickSound.play();
}

// Fonction pour jouer le son de victoire ou de match nul
function playEndSound(isTie) {
    if (isTie) {
        tieSound.play();
    } else {
        winSound.play();
    }
}

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

function gameTurn() {
    if (currentPlayer === 'X') {
        turn.textContent = 'Turn of X';
        turn.style.color = '#28a745';
    } else {
        turn.textContent = 'Turn of O';
        turn.style.color = '#dc3545';
    }
}

// Ajout de l'événement de clic pour chaque cellule du plateau
board.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent && !isGameOver) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
            
            // Joue le son de clic
            playClickSound();

            if (checkWin()) {
                isGameOver = true;
                playEndSound(false);  // Son de victoire
                setTimeout(() => alert(`${currentPlayer} a gagné !`), 200);
            } else if ([...board].every(cell => cell.textContent)) {
                isGameOver = true;
                playEndSound(true);  // Son de match nul
                setTimeout(() => alert("Match nul !"), 200);
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameTurn();
        }
    });
});

restartButton.addEventListener('click', () => {
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
    currentPlayer = 'X';
    isGameOver = false;
    gameTurn();
});

gameTurn();
