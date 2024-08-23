// Gameboard Module
const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""]; // Empty 3x3 gameboard
    
    const getBoard = () => board;

    const placeMarker = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, placeMarker, resetBoard };
})();

// Player Module
const Player = (name, marker) => {
    return { name, marker };
};

// Game Controller Module
const GameController = (function(Gameboard) {
    let player1, player2;
    let currentPlayer;
    let gameOver = false;
    
    // Initialize game
    const startGame = (player1Name, player2Name) => {
        player1 = Player(player1Name || "Player 1", "\u16B7"); // Gebo Rune selection 
        player2 = Player(player2Name || "Player 2", "\u16DD"); // Ingwaz Rune selection
        currentPlayer = player1;
        gameOver = false;
        Gameboard.resetBoard();
        renderBoard();
        document.getElementById('message').textContent = `${currentPlayer.name}'s turn!`;
        document.getElementById('game-results').textContent = '';
    };

    // Switch turns between players
    const switchTurn = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };

    // Current player
    const getCurrentPlayer = () => currentPlayer;

    // Play turn
    const playTurn = (index) => {
        if (gameOver) return;

        if (Gameboard.placeMarker(index, currentPlayer.marker)) {
            renderBoard();
            if (checkWin()) {
                document.getElementById('game-results').textContent = `Sigurvegari! (Winner!) ${currentPlayer.name}!`;
                gameOver = true;
            } else if (checkTie()) {
                document.getElementById('game-results').textContent = "JAFNTEFLI! (It's a tie game!)";
                gameOver = true;
            } else {
                switchTurn();
                document.getElementById('message').textContent = `${getCurrentPlayer().name}'s turn!`;
            }
        } else {
            document.getElementById('message').textContent = "Invalid move. Try again.";
        }
    };

    // Check for win conditions
    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer.marker)
        });
    };

    // Check for tie conditions
    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    // Display game state
    return {
        getCurrentPlayer,
        playTurn,
        startGame
    };
})(Gameboard);

// Function to render the game board to the DOM
function renderBoard() {
    document.querySelectorAll('.cell').forEach((cell, index) => {
        cell.textContent = Gameboard.getBoard()[index];
        if (Gameboard.getBoard()[index] !== '') {
            cell.classList.add('taken');
        } else {
            cell.classList.remove('taken');
        }
    });
}

// Event listeners for player moves
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        GameController.playTurn(index);
    });
});

// Start/Restart game
document.getElementById('start-game').addEventListener('click', function() {
    const player1Name = document.getElementById('player1-name').value;
    const player2Name = document.getElementById('player2-name').value;
    GameController.startGame(player1Name, player2Name);
});

// Initial render of the game board
renderBoard();