import { project } from "./partialProjector";

export const filter = <T extends Record<string, any>>(
  item: T,
  predicateFilter: Partial<T>
): boolean => {
  const projection = project(item, predicateFilter);

  return Object.keys(projection).reduce<boolean>((acc, curr) => {
    return acc && predicateFilter[curr] === projection[curr];
  }, true);
};

export default {
  filter
};
