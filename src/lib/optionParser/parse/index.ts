import { OptionSegment, ParseOptions } from "..";
import parseSegment from "./segment";

export const parse = (
  args: string[],
  options?: Partial<ParseOptions>
): Array<[string, string | undefined]> => {
  const mappedArgs: Array<[string, string | undefined]> = [];

  let prevSegment: OptionSegment | undefined;
  args.forEach(arg => {
    const segment = parseSegment(arg, prevSegment, options);
    if (segment && prevSegment && segment.key === prevSegment.key) {
      mappedArgs.pop();
    }
    if (segment) {
      mappedArgs.push([segment.key, segment.value]);
    }

    prevSegment = segment;

    if (segment && (segment.isFlag || (segment.key && segment.value))) {
      prevSegment = undefined;
    }
  });

  return mappedArgs;
};

export default parse;
