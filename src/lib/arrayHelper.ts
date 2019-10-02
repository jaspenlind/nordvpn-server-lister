#!/usr/bin/env node
export const any = (array: ArrayLike<any>) => array.length > 0;

export const isEmpty = (array: ArrayLike<any>) => !any(array);

export const last = <T>(array: ArrayLike<T>): T => array[array.length - 1];

export const takeWhile = <T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] => {
  const items: T[] = [];

  for (const item of array) {
    if (!predicate(item)) {
      break;
    }

    items.push(item);
  }

  return items;
};
