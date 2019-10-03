#!/usr/bin/env node
import request from "request-promise";
import { Server, QueryResult } from "../models/serverQueryResult";
import optionParser, { ParseOptions } from "./optionParser";
import partialFilter from "./partialFilter";

const REQUEST_LIMIT = 16384;

const handleHelp = (args: string[]) => {
  if (args.filter(x => x === "-h").length > 0) {
    console.log(`
usage: node ${args[1]} [parameters]

 Examples:
   -filter.flag=\\"SE\\" -filter.load\\>24         Lists servers in Sweden with a load greater than 24
   -output=ip_address -output=country           Outputs server ip address & country as json
   -output=ip_address -raw                      Outputs server ip address as raw text
   -h                                           Shows this help message  
`);
    process.exit(0);
  }
};

const getServers = async (): Promise<QueryResult<Server>> => {
  let moreExists = false;
  let response: string = await request(
    `https://api.nordvpn.com/server?limit=${REQUEST_LIMIT}`,
    {
      json: false
    }
  );

  if (response && response.startsWith("[") && !response.endsWith("]")) {
    response = response.substring(0, response.lastIndexOf("{") - 1);
    moreExists = true;
  }

  const servers: Server[] = JSON.parse(response);

  const result: QueryResult<Server> = {
    items: servers,
    moreExists
  };

  return Promise.resolve(result);
};

const run = async (args: string[]) => {
  handleHelp(args);

  const servers = await getServers();

  const options: ParseOptions = { keyPrefix: "filter" };

  const filter = optionParser.parse(args, options).asPartial<Server>();

  const result = servers.items.filter(x => partialFilter.filter(filter, x));

  console.log(result.length);
};

export default { run };
