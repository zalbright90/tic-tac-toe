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

// Game Controller Module
    // Gebo Rune for player 1
    // Ingwaz Rune for player 2

    // Switch turns between players

    // Current player

    // Play turn

    // Check for win conditions

    // Check for tie conditions

    // Display game state




