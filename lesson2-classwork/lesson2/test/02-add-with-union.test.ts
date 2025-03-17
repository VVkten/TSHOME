import { expect, it } from "vitest";

function addWithUnion(
  arg1: string | number,
  arg2: string | number
) {
  if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2;
  }
  return String(arg1) + String(arg2);
}


it("Should add the two numbers together", () => {
  expect(addWithUnion(10, 2)).toEqual(12);
  expect(addWithUnion('Hello ', 'World')).toEqual('Hello World');
  expect(addWithUnion('Hello ', 12)).toEqual('Hello 12');
});
