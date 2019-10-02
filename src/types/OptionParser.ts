export default interface OptionParser
  extends ReadonlyMap<string, string | undefined> {
  asPartial: <T>() => Partial<T>;
  unwrap: () => string[];
}
