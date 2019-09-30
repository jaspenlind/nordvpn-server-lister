export default interface QueryResult<T> {
  items: T[];
  moreExists: boolean;
}
