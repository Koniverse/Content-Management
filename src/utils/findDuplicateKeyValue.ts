export function findDuplicateKeyValue(array: any[], key: string) {
  const seenValues = new Set();
  for (const item of array) {
    if (seenValues.has(item[key])) {
      return item[key];
    }
    seenValues.add(item[key]);
  }
  return null;
}
