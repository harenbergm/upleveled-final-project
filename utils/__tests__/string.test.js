import { stringTest } from '../string';

test('throws when argument is not a string', () => {
  expect(() => stringTest(123).toThrow());
  expect(() => stringTest('123').not.toThrow());
});
