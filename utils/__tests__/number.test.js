import { numberTest } from '../number';

test('throws when argument is not a string', () => {
  expect(() => numberTest(124)).not.toThrow();
  expect(() => numberTest('124')).toThrow();
});
