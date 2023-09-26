import { Player } from "../modules/player";

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player('Player 1');
  });

  it('should have the correct name', () => {
    expect(player.name).toBe('Player 1');
  });

  it('should make an attack and log a hit message', () => {
    const enemyGameBoard = {
      receiveAttack: jest.fn(() => true),
    };
    const x = 2;
    const y = 3;
    const consoleLogSpy = jest.spyOn(console, 'log');

    player.makeAttack(enemyGameBoard, x, y);

    expect(enemyGameBoard.receiveAttack).toHaveBeenCalledWith(x, y);
    expect(consoleLogSpy).toHaveBeenCalledWith('Player 1 hit at (2, 3)!');
  });

  it('should make an attack and log a miss message', () => {
    const enemyGameBoard = {
      receiveAttack: jest.fn(() => false),
    };
    const x = 5;
    const y = 6;
    const consoleLogSpy = jest.spyOn(console, 'log');

    player.makeAttack(enemyGameBoard, x, y);

    expect(enemyGameBoard.receiveAttack).toHaveBeenCalledWith(x, y);
    expect(consoleLogSpy).toHaveBeenCalledWith('Player 1 missed at (5, 6).');
  });
});
