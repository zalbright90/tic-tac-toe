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
    const player1 = Player("Player 1", "ᚷ"); // Gebo Rune for player 1
    const player2 = Player("Player 2", "ᛝ"); // Ingwaz Rune for player 2
    let currentPlayer = player1;
    
    // Switch turns between players
    const switchTurn = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };

    // Current player
    const getCurrentPlayer = () => currentPlayer;

    // Play turn
    const playTurn = (index) => {
        if (Gameboard.placeMarker(index, currentPlayer.marker)) {
            if (checkWin()) {
                document.getElementById('message').textContent = `Sigurvegari! (Winner!) ${currentPlayer.name}`;
            } else if (checkTie()) {
                document.getElementById('message').textContent = "JAFNTEFLI! (It's a tie game!)";
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
    };
})(Gameboard);

// Function to render the game board to the DOM
function renderBoard() {
    const board = Gameboard.getBoard();
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Initial render of the game board
renderBoard();

// Event listeners for player moves
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        GameController.playTurn(index);
    });
});