export function number(input) {
  if (typeof input !== number) {
    throw new Error('Pass numbers only');
  }
  return input;
}
