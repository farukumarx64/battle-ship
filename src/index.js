import GameBoard from "./modules/game-board";
import Ship from "./modules/ship";
import { ComputerPlayer } from "./modules/player";
import renderGameBoards from "./modules/render-game";

// ... (Previous code for Ship, GameBoard, Player, ComputerPlayer, and initial setup)

// Initialize game objects and render the initial game boards
const playerGameBoard = new GameBoard();
const computerPlayer = new ComputerPlayer();
const enemyGameBoard = new GameBoard();

const playerBoard = document.getElementById("player-board");
const enemyBoard = document.getElementById("enemy-board");
const attackButton = document.getElementById("attack-button");
const startButton = document.getElementById("start-button");

let isGameStarted = false;

// Function to render the game boards with ships
function renderInitialBoards() {
  renderGameBoards(playerBoard, enemyBoard, playerGameBoard, enemyGameBoard);

  // Add event listeners to player's board for ship placement (drag and drop)
  playerBoard.addEventListener("dragstart", handleDragStart);
  playerBoard.addEventListener("dragover", handleDragOver);
  playerBoard.addEventListener("dragenter", handleDragEnter);
  playerBoard.addEventListener("dragleave", handleDragLeave);
  playerBoard.addEventListener("drop", handleDrop);
  playerBoard.addEventListener("dragend", handleDragEnd);
}

// Variables to keep track of the currently dragged ship
let draggedShip = null;
let draggedShipX = null;
let draggedShipY = null;
let isHorizontal = true; // Default orientation is horizontal

// Function to handle the start of the drag operation
function handleDragStart(event) {
  const cell = event.target;
  if (cell.classList.contains("ship")) {
    draggedShip = cell;
    draggedShipX = parseInt(cell.dataset.x);
    draggedShipY = parseInt(cell.dataset.y);
    isHorizontal = cell.classList.contains("horizontal");
    cell.classList.add("dragging");
    event.dataTransfer.setData("text", ""); // Required for some browsers to allow drag and drop
  }
}

// Function to handle dragging over valid drop zones
function handleDragOver(event) {
  event.preventDefault();
  const cell = event.target;
  if (isValidDropZone(cell)) {
    cell.classList.add("hovered");
  }
}

// Function to handle entering a valid drop zone
function handleDragEnter(event) {
  const cell = event.target;
  if (isValidDropZone(cell)) {
    cell.classList.add("hovered");
  }
}

// Function to handle leaving a valid drop zone
function handleDragLeave(event) {
  event.target.classList.remove("hovered");
}

// Function to handle the drop operation
function handleDrop(event) {
  const cell = event.target;
  if (isValidDropZone(cell)) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    playerGameboard.placeShip(draggedShip.dataset.length, x, y, isHorizontal);
    renderGameBoards(playerBoard, enemyBoard, playerGameboard, enemyGameboard);
  }
  event.target.classList.remove("hovered");
}

// Function to handle the end of the drag operation
function handleDragEnd(event) {
  if (draggedShip) {
    draggedShip.classList.remove("dragging");
    draggedShip = null;
    draggedShipX = null;
    draggedShipY = null;
    isHorizontal = true; // Reset orientation to horizontal
  }
}

// Function to check if a cell is a valid drop zone for ship placement
function isValidDropZone(cell) {
  if (cell.classList.contains("empty")) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    return playerGameboard.canPlaceShip(
      draggedShip.dataset.length,
      x,
      y,
      isHorizontal
    );
  }
  return false;
}

// Initialize game with ships placement
startButton.addEventListener("click", () => {
  if (!isGameStarted) {
    playerGameBoard.placeShip(new Ship(5), 0, 0, true); // Example ship placement
    playerGameBoard.placeShip(new Ship(4), 2, 2, false); // Example ship placement
    // Add more ship placements as needed

    renderInitialBoards();
    startButton.disabled = true;
    attackButton.disabled = false;
    isGameStarted = true;
  }
});

// Function to handle player's attack
function handlePlayerAttack(x, y) {
  if (isGameStarted && !playerGameBoard.allShipsSunk()) {
    if (playerGameBoard.receiveAttack(x, y)) {
      console.log(`Player hit at (${x}, ${y})!`);
    } else {
      console.log(`Player missed at (${x}, ${y}).`);
    }
    renderGameBoards(playerBoard, enemyBoard, playerGameBoard, enemyGameBoard);

    // Check if the game has ended
    if (playerGameBoard.allShipsSunk()) {
      console.log("Player wins!");
      attackButton.disabled = true;
    } else {
      // Computer player's turn
      setTimeout(() => {
        computerPlayer.makeRandomAttack(playerGameBoard);
        renderGameBoards(
          playerBoard,
          enemyBoard,
          playerGameBoard,
          enemyGameBoard
        );

        // Check if the game has ended
        if (playerGameBoard.allShipsSunk()) {
          console.log("Computer wins!");
          attackButton.disabled = true;
        }
      }, 1000); // Delay computer player's move for 1 second (simulating AI processing)
    }
  }
}

// Handle click event on the Attack button
attackButton.addEventListener("click", () => {
  if (isGameStarted && !playerGameBoard.allShipsSunk()) {
    const x = parseInt(prompt("Enter X coordinate (0-9):"));
    const y = parseInt(prompt("Enter Y coordinate (0-9):"));
    handlePlayerAttack(x, y);
  }
});
