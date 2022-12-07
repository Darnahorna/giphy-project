export function getPortion(arr, id) {
  let previous, cur, next;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      previous = arr[i - 1];
      cur = arr[i];
      next = arr[i + 1];
    }
  }

  return { previous, cur, next };
}

export function findElementById(arr, id) {
  return arr.find((gif) => gif.id == id);
}
