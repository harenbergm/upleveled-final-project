import { number } from '../number';

test('if input type is a number', () => {
  expect(string(1).toBe(number));
});

test('throws when argument is not a string', () => {
  expect(() => string(123).not.toThrow());
  expect(() => string('123').toThrow());
});
