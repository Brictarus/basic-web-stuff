export function isPositiveInteger(num) {
  return Number.isSafeInteger(num) && num >= 0;
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export function shuffleArray(a) {
    let j, x;
    for (let i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
}