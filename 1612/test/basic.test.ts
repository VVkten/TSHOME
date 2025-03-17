import { expect, test } from 'vitest';
import { Student } from '../src/basic.js';

test('Student getFullName returns correct full name', () => {
  const student = new Student();
  student.firstName = 'Niks';
  student.lastName = 'M';

  expect(student.getFullName()).toBe('Niks M');
});

test('Student getFullName returns "Пропуск" if firstName or lastName is empty', () => {
  const student = new Student();

  student.firstName = '';
  student.lastName = 'M';
  expect(student.getFullName()).toBe('Пропуск');

  student.firstName = 'Niks';
  student.lastName = '';
  expect(student.getFullName()).toBe('Пропуск');
});

test('Grade is limited by @Max and @Min decorators', () => {
  const student = new Student();

  expect(student.grade).toBe(12);

  expect(student.grade).toBe(0);

  student.grade = 7;
  expect(student.grade).toBe(7);
});