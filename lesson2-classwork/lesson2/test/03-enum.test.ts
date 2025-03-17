import { expect, it } from "vitest";

const enum Direction {
  Up ='Up',
  Down ='Down',
  Left ='Left',
  Right ='Right',
}

function move(direction: Direction) {
  return direction;
}

it("Should work with up", () => {
  const name = Direction.Up;

  expect(name).toEqual('Up');
});

it("Should work with down", () => {
  const name = Direction.Down;

  expect(name).toEqual('Down');
});