import { expect, it } from "vitest";

interface User {
  id: number;
  firstName: string;
  lastName?: string;
  isAdmin: boolean;
}

// Ви можете змінювати лише цю функцію
// Використайте тернарний оператор
const getUserName = (user: User): string => {
  return user.firstName + (user.lastName ? ' ' + user.lastName : '');
};

const defaultUser: User = {
  id: 1,
  firstName: 'Mykhailo',
  isAdmin: true
};
const advancedUSer: User = {
  id: 1,
  firstName: 'Mykhailo',
  lastName: 'Kobernyk',
  isAdmin: true
};

it("Should get the user name", () => {
  expect(getUserName(defaultUser)).toEqual('Mykhailo');
  expect(getUserName(advancedUSer)).toEqual('Mykhailo Kobernyk');
});
