#!/usr/bin/env node
import argsAny, { Option } from "args-any";
import { project } from "args-any/dist/src/lib/partialProjector";
import { fetch } from "./api";
import { Server, QueryResult } from "../models/serverQueryResult";

const handleHelp = (args: string[]) => {
  if (args.filter(x => x === "-h").length > 0) {
    console.log(`
usage: vpn-servers [parameters]
    [-filter.<property> eq|lt|gt|le|ge|ne <value>]...   Filter result
    [-output=<property>]...                             Proprerties to show in result
    [-h]                                                Shows this help message

 Example:
   -filter.flag=SE -filter.load gt 24 -output=name      Lists servers whith flag=SE and load greater than 24
`);
    process.exit(0);
  }
};

const filter = (servers: QueryResult<Server>, args: string[]) => {
  const filterOptions = argsAny.parse(args, { keyPrefix: "filter", flags: [] });

  return Promise.resolve(filterOptions.filter(...servers.items));
};

const print = (servers: Server[], args: string[]) => {
  if (servers.length === 0) {
    console.log("Empty result");
    return;
  }

  const outputOptions = argsAny.parse(args, {
    filter: (option: Option) => option.key === "output",
    valueAsKey: true
  });

  if (outputOptions.size > 0) {
    let outputFilter = outputOptions.asPartial<Server>();

    const test = project(servers[0], outputFilter);

    if (Object.keys(test).length === 0) {
      outputFilter = { name: "name" };
    }

    console.log(servers.map(x => project(x, outputFilter)));
  } else {
    console.log(servers);
  }
};

const sortResult = (servers: Server[]) => {
  if (servers.length === 0) {
    return servers;
  }

  return servers.sort((first, second) => first.load - second.load);
};

const run = async (args: string[]) => {
  handleHelp(args);

  const result = await fetch()
    .then(response => filter(response, args))
    .then(filtered => sortResult(filtered));

  print(result, args);
};

export default { run };
