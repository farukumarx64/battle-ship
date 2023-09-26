import { ComputerPlayer } from "../modules/player";

describe("ComputerPlayer", () => {
  let computerPlayer;

  beforeEach(() => {
    computerPlayer = new ComputerPlayer();
  });

  it("should have the correct name", () => {
    expect(computerPlayer.name).toBe("Computer");
  });

  it("should make a random legal attack and log the attack message", () => {
    const enemyGameBoard = {
      receiveAttack: jest.fn(() => true),
    };
    const consoleLogSpy = jest.spyOn(console, "log");

    computerPlayer.makeRandomAttack(enemyGameBoard);

    expect(enemyGameBoard.receiveAttack).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Computer attacked at \(\d, \d\)\./)
    );
  });
});
