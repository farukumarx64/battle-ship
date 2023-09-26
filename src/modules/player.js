class Player {
  constructor(name) {
    this.name = name;
  }

  // Function for a human player to make an attack on the enemy's gameboard
  makeAttack(enemyGameBoard, x, y) {
    if (enemyGameBoard.receiveAttack(x, y)) {
      console.log(`${this.name} hit at (${x}, ${y})!`);
    } else {
      console.log(`${this.name} missed at (${x}, ${y}).`);
    }
  }
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class ComputerPlayer extends Player {
  constructor() {
    super("Computer");
  }

  // Function for the computer player to make a random legal attack on the enemy's gameboard
  makeRandomAttack(enemyGameBoard) {
    let x, y;

    do {
      x = getRandomInt(0, 9);
      y = getRandomInt(0, 9);
    } while (!enemyGameBoard.receiveAttack(x, y));

    console.log(`${this.name} attacked at (${x}, ${y}).`);
  }
}

export { Player, ComputerPlayer };
