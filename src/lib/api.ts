import request from "request-promise";
import { Server, QueryResult } from "../types";

const REQUEST_LIMIT = 16384;

export const fetch = async (): Promise<QueryResult<Server>> => {
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
