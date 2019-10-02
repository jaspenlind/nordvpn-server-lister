#!/usr/bin/env node
import { OptionSegment, OptionParser, ParseOptions } from "../../types";
import { parse as parseOptions } from "./parse";
import { toObject } from "../mapHelper";

export enum OptionOperand {
  Equals
}

export { OptionSegment, OptionParser, ParseOptions };

const parse = (
  args: string[],
  options?: Partial<ParseOptions>
): OptionParser => {
  const map = new Map<string, string | undefined>(parseOptions(args, options));

  const parser: OptionParser = Object.assign(map, {
    asPartial: () => toObject(map),
    unwrap: () => args
  });

  return parser;
};

export default { parse };
