import GameBoard from "../modules/game-board";
import Ship from "../modules/ship";

describe('GameBoard', () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  it('should initialize an empty 10x10 grid', () => {
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board.every((row) => row.length === 10)).toBe(true);
  });

  it('should initialize with no missed attacks', () => {
    expect(gameBoard.missedAttacks.length).toBe(0);
  });

  it('should initialize with no ships', () => {
    expect(gameBoard.ships.length).toBe(0);
  });

  it('should place a ship horizontally', () => {
    const ship = new Ship(3);
    expect(gameBoard.placeShip(ship, 0, 0, true)).toBe(true);
    expect(gameBoard.board[0][0]).toBe(ship);
    expect(gameBoard.board[0][1]).toBe(ship);
    expect(gameBoard.board[0][2]).toBe(ship);
    expect(gameBoard.ships.length).toBe(1);
  });

  it('should place a ship vertically', () => {
    const ship = new Ship(3);
    expect(gameBoard.placeShip(ship, 1, 1, false)).toBe(true);
    expect(gameBoard.board[1][1]).toBe(ship);
    expect(gameBoard.board[2][1]).toBe(ship);
    expect(gameBoard.board[3][1]).toBe(ship);
    expect(gameBoard.ships.length).toBe(1);
  });

  it('should not place a ship out of bounds horizontally', () => {
    const ship = new Ship(4);
    expect(gameBoard.placeShip(ship, 7, 0, true)).toBe(false);
    expect(gameBoard.ships.length).toBe(0);
  });

  it('should not place a ship out of bounds vertically', () => {
    const ship = new Ship(4);
    expect(gameBoard.placeShip(ship, 0, 7, false)).toBe(false);
    expect(gameBoard.ships.length).toBe(0);
  });

  // Add more test cases as needed
});
