export const project = <T extends Record<string, any>>(
  item: T,
  projector: Partial<T>
): Partial<T> => {
  const definedKeys = Object.keys(projector);

  const projection = Object.keys(item).reduce<Record<string, any>>(
    (acc, curr) => {
      if (definedKeys.includes(curr)) {
        acc[curr] = item[curr];
      }

      return acc;
    },
    {}
  );

  return projection as Partial<T>;
};

export default {
  project
};
