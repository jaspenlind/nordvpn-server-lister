import { Category, Coordinate, ServerFeatures } from ".";

export interface Server {
  id: number;
  ip_address: string;
  search_keywords: string[];
  categories: Category[];
  name: string;
  domain: string;
  price: number;
  flag: string;
  country: string;
  location: Coordinate;
  load: number;
  features: ServerFeatures;
}
