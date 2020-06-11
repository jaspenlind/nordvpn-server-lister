import { Server } from "../types";
import features from "./serverFeatures";
import coordinate from "./coordinate";

export { Server };

export const empty: Server = {
  categories: [],
  country: "",
  domain: "",
  features: features.empty,
  flag: "",
  id: 0,
  // eslint-disable-next-line
  ip_address: "",
  load: 0,
  location: coordinate.empty,
  name: "empty",
  price: 0,
  // eslint-disable-next-line
  search_keywords: []
};

export const create = (fields?: Partial<Server>): Server => ({
  ...empty,
  ...fields
});

export default {
  create,
  empty
};
