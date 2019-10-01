import { lastKey, toObject } from "./mapHelper";
import { any, last } from "./arrayHelper";

const flags = ["h", "debug"];
const separators = ["=", ":"];
const dash = "-";

export interface ParseOptions {
  keyPrefix: string;
}

const parseOptionKey = (
  current: string,
  options?: Partial<ParseOptions>
): string | null => {
  const prefix = (options && options.keyPrefix) || "";
  if (!current.startsWith(dash) || current.length < 2) {
    return null;
  }

  const index = current[1] === dash ? 2 : 1;

  const option = current.substring(index);

  return prefix.length > 0 && option.startsWith(prefix)
    ? option.substring(prefix.length + 1)
    : option;
};

export default class OptionParser
  implements ReadonlyMap<string, string | undefined> {
  forEach(
    callbackfn: (
      value: string | undefined,
      key: string,
      map: ReadonlyMap<string, string | undefined>
    ) => void,
    thisArg?: any
  ): void {
    return this.map.forEach(callbackfn, thisArg);
  }

  get(key: string): string | undefined {
    return this.map.get(key);
  }

  has(key: string): boolean {
    return this.map.has(key);
  }

  public get size(): number {
    return this.map.size;
  }

  [Symbol.iterator](): IterableIterator<[string, string | undefined]> {
    return this.map[Symbol.iterator]();
  }

  entries(): IterableIterator<[string, string | undefined]> {
    return this.map.entries();
  }

  keys(): IterableIterator<string> {
    return this.map.keys();
  }

  values(): IterableIterator<string | undefined> {
    return this.map.values();
  }

  private map: ReadonlyMap<string, string | undefined>;

  asPartial<T>(): Partial<T> {
    return toObject(this.map);
  }

  private args: string[];

  unwrap(): string[] {
    return this.args;
  }

  static parse = (
    args: string[],
    options?: Partial<ParseOptions>
  ): OptionParser => {
    const mappedArgs = args.reduce<Array<[string, string | undefined]>>(
      (acc, curr) => {
        const key = parseOptionKey(curr, options);
        if (key !== null) {
          acc.push([key, undefined]);
        } else if (any(acc)) {
          const prevItem = last(acc);
          const isFlag = flags.find(x => x === prevItem[0]) !== undefined;
          if (!isFlag && prevItem[1] === undefined) {
            prevItem[1] = curr;
          }
        }
        return acc;
      },
      []
    );
    return new OptionParser(mappedArgs, args);
  };

  private constructor(
    entries: Array<[string, string | undefined]>,
    args: string[]
  ) {
    this.map = new Map<string, string | undefined>(entries);

    this.args = args;
  }
}
