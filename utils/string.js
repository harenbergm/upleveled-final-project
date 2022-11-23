export function stringTest(input) {
  if (typeof input !== string) {
    throw new Error('Pass text only ');
  }
  return input;
}
