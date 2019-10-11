#!/usr/bin/env node
import optionParser, { ParserSettings } from "option-parser";
import request from "request-promise";
import { Server, QueryResult } from "../models/serverQueryResult";

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
  let response: string = await request(`https://api.nordvpn.com/server?limit=${REQUEST_LIMIT}`, {
    json: false
  });

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

  const settings: ParserSettings = { keyPrefix: "filter" };

  const options = optionParser.parse(args, settings);

  const result = options.filter(...servers.items);

  console.log(result);
};

export default { run };
