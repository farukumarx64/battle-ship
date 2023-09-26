export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = Array(length).fill(false); // Initialize hits array with 'false' values
    this.sunk = false;
  }

  // Function to mark a ship as hit at a specific position
  hit(position) {
    if (position >= 0 && position < this.length) {
      this.hits[position] = true;
      this.checkSunk();
      return true; // Indicates a successful hit
    }
    return false; // Invalid position
  }

  // Function to check if the ship is sunk
  checkSunk() {
    if (this.hits.every((hit) => hit)) {
      this.sunk = true;
    }
  }
}
