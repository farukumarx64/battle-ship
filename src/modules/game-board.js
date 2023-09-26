export default class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null)); // Initialize a 10x10 grid
    this.missedAttacks = [];
    this.ships = [];
  }

  // Function to place a ship at specific coordinates
  placeShip(ship, x, y, isHorizontal) {
    if (this.canPlaceShip(ship, x, y, isHorizontal)) {
      if (isHorizontal) {
        for (let i = x; i < x + ship.length; i++) {
          this.board[y][i] = ship;
        }
      } else {
        for (let i = y; i < y + ship.length; i++) {
          this.board[i][x] = ship;
        }
      }
      this.ships.push(ship);
      return true; // Ship placement successful
    }
    return false; // Cannot place ship at the specified coordinates
  }

  // Function to check if a ship can be placed at specific coordinates
  canPlaceShip(ship, x, y, isHorizontal) {
    if (x < 0 || y < 0 || x >= 10 || y >= 10) {
      return false; // Coordinates are out of bounds
    }

    if (isHorizontal) {
      if (x + ship.length > 10) {
        return false; // Ship would go out of bounds horizontally
      }

      for (let i = x; i < x + ship.length; i++) {
        if (this.board[y][i] !== null) {
          return false; // Another ship is already placed there
        }
      }
    } else {
      if (y + ship.length > 10) {
        return false; // Ship would go out of bounds vertically
      }

      for (let i = y; i < y + ship.length; i++) {
        if (this.board[i][x] !== null) {
          return false; // Another ship is already placed there
        }
      }
    }

    return true; // Ship can be placed at the specified coordinates
  }

  // Function to receive an attack at specific coordinates
  receiveAttack(x, y) {
    if (x < 0 || y < 0 || x >= 10 || y >= 10) {
      return false; // Invalid coordinates
    }

    if (this.board[y][x] === null) {
      this.missedAttacks.push({ x, y });
      return false; // Attack missed
    }

    const ship = this.board[y][x];
    const position = (isHorizontal) => (isHorizontal ? x - ship.x : y - ship.y);
    const isHorizontal = (ship) => ship.x !== undefined;

    const hitPosition = isHorizontal(ship) ? position(true) : position(false);
    ship.hit(hitPosition); // Mark the ship as hit at the appropriate position
    return true; // Attack hit
  }

  // Function to check if all ships on the board have been sunk
  allShipsSunk() {
    return this.ships.every((ship) => ship.sunk);
  }
}
