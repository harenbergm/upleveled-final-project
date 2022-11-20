import { string } from '../string';

test('if input type is string', () => {
  expect(string('input').toBe(string));
});

test('throws when argument is not a string', () => {
  expect(() => string(123).toThrow());
  expect(() => string('123').not.toThrow());
});
