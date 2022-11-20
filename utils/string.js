export function string(input) {
  if (typeof input !== string) {
    throw new Error('Pass text only ');
  }
  return input;
}
