#!/usr/bin/env node
import argsAny from "args-any";
import { project } from "args-any/dist/src/lib/partialProjector";
import { fetch } from "./api";
import { Server, QueryResult } from "../models/serverQueryResult";

const handleHelp = (args: string[]) => {
  if (args.filter(x => x === "-h").length > 0) {
    console.log(`
usage: node ${args[1]} [parameters]

 Examples:
   -filter.flag=SE -filter.load>24         Lists servers in Sweden with a load greater than 24
   -output=ip_address -output=country           Outputs server ip address & country as json
   -output=ip_address -raw                      Outputs server ip address as raw text
   -h                                           Shows this help message
`);
    process.exit(0);
  }
};

const filter = (servers: QueryResult<Server>, args: string[]) => {
  const filterOptions = argsAny.parse(args, { keyPrefix: "filter", flags: [] });

  return filterOptions.filter(...servers.items);
};

const print = (servers: Server[], args: string[]) => {
  const outputOptions = argsAny.parse(args, { keyPrefix: "output" });

  if (outputOptions.size > 0) {
    const outputFilter = outputOptions.asPartial<Server>();

    console.log(servers.map(x => project(x, outputFilter)));
  } else {
    console.log(servers);
  }
};

const run = async (args: string[]) => {
  handleHelp(args);

  const result = await fetch().then(response => filter(response, args));

  print(result, args);
};

export default { run };
