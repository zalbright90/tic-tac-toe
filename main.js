// Gameboard Module
const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""]; // Empty 3x3 gameboard
    
    const getBoard = () => board;

    const placeMarker = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
    };
})();

// Player Module
const Player = (name, marker) => {
    return { name, marker };
};

// Game Controller Module
const GameController = (function() {
    const player1 = Player("Player 1", "ᚷ"); // Gebo Rune for player 1
    const player2 = Player("Player 2", "ᛝ"); // Ingwaz Rune for player 2
    let currentPlayer = player1;
});

    // Switch turns between players

    // Current player

    // Play turn

    // Check for win conditions

    // Check for tie conditions

    // Display game state




