export function getPortion(arr, id) {
  let prev, cur, next;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      prev = arr[i - 1];
      cur = arr[i];
      next = arr[i + 1];
    }
  }
  return { prev, cur, next };
}

export function findElementById(arr, id) {
  return arr.find((gif) => gif.id == id);
}

export function getFirst(arr) {
  return arr[0];
}

export function getLast(arr) {
  return arr[arr.length - 1];
}
