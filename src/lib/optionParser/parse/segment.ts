import { takeWhile } from "../../arrayHelper";
import { trimStart } from "../../stringHelper";
import { OptionSegment, ParseOptions } from "..";

const flags = ["h", "debug"];
const separators = ["=", ":"];
const dash = "-";

const parseKey = (
  segment: string,
  options?: Partial<ParseOptions>
): [string | undefined, string | undefined] => {
  const isKey = segment.startsWith(dash) && segment.length > 1;

  if (!isKey) {
    return [undefined, segment];
  }

  const trimChars = [dash];
  if (options && options.keyPrefix) {
    trimChars.push(options.keyPrefix, ".");
  }

  const withoutPrefix = trimStart(segment, ...trimChars);

  const key = takeWhile([...withoutPrefix], x => !separators.includes(x)).join(
    ""
  );

  const value = withoutPrefix.substring(key.length);
  return [key, value === "" ? undefined : value];
};

const parseSegment = (
  current: string,
  prev?: OptionSegment,
  options?: Partial<ParseOptions>
): OptionSegment | undefined => {
  const [key, remainder] = parseKey(current, options);

  const currentKey = key || (prev && prev.key);

  if (currentKey === undefined) {
    return undefined;
  }

  const isFlag = flags.find(x => x === currentKey) !== undefined;

  let value = isFlag ? undefined : (prev && prev.value) || remainder;

  if (value && separators.includes(value[0])) {
    value = value.substring(1);
  }

  const segment: OptionSegment = {
    key: currentKey,
    isFlag,
    operand: "",
    value
  };

  return segment;
};

export default parseSegment;
