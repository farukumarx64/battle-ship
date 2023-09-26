// Import the Ship class (adjust the path as needed)
import Ship from "../modules/ship";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    // Create a new Ship instance before each test
    ship = new Ship(3); // Example ship with length 3
  });

  it("should have the correct length", () => {
    expect(ship.length).toBe(3);
  });

  it("should initialize hits array with false values", () => {
    expect(ship.hits).toEqual([false, false, false]);
  });

  it("should not be sunk initially", () => {
    expect(ship.sunk).toBe(false);
  });

  it("should mark a hit position correctly", () => {
    ship.hit(1); // Mark position 1 as a hit
    expect(ship.hits).toEqual([false, true, false]);
  });

  it("should return true for a valid hit position", () => {
    expect(ship.hit(2)).toBe(true);
  });

  it("should return false for an invalid hit position", () => {
    expect(ship.hit(-1)).toBe(false);
    expect(ship.hit(3)).toBe(false);
  });

  it("should be sunk when all positions are hit", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.sunk).toBe(true);
  });
});
