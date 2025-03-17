import { expect, it } from "vitest";

enum Level {
  Novice = "Novice",
  Intermediate = "Intermediate",
  Pro = "Pro"
}

type Players = { [key in Level]: string[] }

const mapping: Players = {
  [Level.Novice]: ["Neo"],
  [Level.Pro]: ["John Wick"],
  [Level.Intermediate]: []
}

it("Should get the user id", () => {
  expect(mapping[Level.Novice]).toEqual(["Neo"]);
});
