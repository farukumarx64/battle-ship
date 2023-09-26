// Function to render the game boards
export default function renderGameBoards(
  playerBoard,
  enemyBoard,
  playerGameBoard,
  enemyGameBoard
) {
  // Clear existing boards
  playerBoard.innerHTML = "";
  enemyBoard.innerHTML = "";

  // Render player's board (replace with your own rendering logic)
  playerGameBoard.board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (cell !== null) {
        cellElement.classList.add("ship");
      }
      playerBoard.appendChild(cellElement);
    });
  });

  // Render enemy's board (replace with your own rendering logic)
  enemyGameBoard.board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (cell === null) {
        cellElement.classList.add("empty");
      } else if (cell.sunk) {
        cellElement.classList.add("sunk");
      } else {
        cellElement.classList.add("ship");
      }
      enemyBoard.appendChild(cellElement);
    });
  });
}

// Function to handle player's attack
function handlePlayerAttack(player, enemyGameBoard, x, y) {
  if (isGameStarted && !playerGameBoard.allShipsSunk()) {
    if (enemyGameBoard.receiveAttack(x, y)) {
      console.log(`${player.name} hit at (${x}, ${y})!`);
    } else {
      console.log(`${player.name} missed at (${x}, ${y}).`);
    }
    renderGameBoards(playerBoard, enemyBoard, playerGameBoard, enemyGameBoard);

    // Check if the game has ended
    if (enemyGameBoard.allShipsSunk()) {
      console.log(`${player.name} wins!`);
      attackButton.disabled = true;
    } else {
      // Computer player's turn
      setTimeout(() => {
        computerPlayer.makeRandomAttack(playerGameBoard);
        renderGameBoards(playerBoard, enemyBoard, playerGameBoard, enemyGameBoard);

        // Check if the game has ended
        if (playerGameBoard.allShipsSunk()) {
          console.log(`${computerPlayer.name} wins!`);
          attackButton.disabled = true;
        }
      }, 1000); // Delay computer player's move for 1 second (simulating AI processing)
    }
  }
}
