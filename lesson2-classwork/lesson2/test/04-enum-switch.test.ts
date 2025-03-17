import { expect, it } from "vitest";

const enum Direction {
  Up ='Up',
  Down ='Down',
  Left ='Left',
  Right ='Right',
}

function processDirection(direction: Direction): string {
  switch (direction) {
    case Direction.Up:
      return 'Up';
    case Direction.Down:
      return 'Down';
    case Direction.Left:
      return 'Left';
    case Direction.Right:  
      return 'Right';
    default:
      return 'Unknown direction'; 
  }
}

it("Should work with up", () => {
  const name = processDirection(Direction.Up);

  expect(name).toEqual('Up');
});

it("Should work with down", () => {
  const name = processDirection(Direction.Down);

  expect(name).toEqual('Down');
});

it("Should work with left", () => {
  const name = processDirection(Direction.Left);

  expect(name).toEqual('Left');
});

it("Should work with right", () => {
  const name = processDirection(Direction.Right);

  expect(name).toEqual('Right');
});