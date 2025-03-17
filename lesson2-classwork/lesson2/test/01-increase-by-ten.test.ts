import { expect, it } from "vitest";

// TODO: fix this function by removing 4 characters
export const increaseByTen = (a: number) => {
  let result = 10;
  if (a) {
    result = a + 10;
  }
  return result;
};

it("Should add the two numbers together", () => {
  expect(increaseByTen(2)).toEqual(12);
  expect(increaseByTen(10)).toEqual(20);
});
