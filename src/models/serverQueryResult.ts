import { Server, QueryResult } from "../types";

export { Server, QueryResult };

export const empty: QueryResult<Server> = {
  items: [],
  moreExists: false
};

export default {
  empty
};
