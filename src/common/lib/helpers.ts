export function isUniformArray<T>(array: T[]): boolean {
  return array.every((value, _, array) => value === array[0]);
}
