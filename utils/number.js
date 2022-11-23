export function numberTest(input) {
  if (typeof input !== 'number') {
    throw new Error('Pass numbers only');
  }
  return input;
}
