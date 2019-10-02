import { any, isEmpty, last, takeWhile } from "../src/lib/arrayHelper";

describe("arrayHelper", () => {
  describe("any", () => {
    it("should be true when array is not empty", () => {
      expect(any(["item"])).toBe(true);
    });

    it("should be false when array is empty", () => {
      expect(any([])).toBe(false);
    });
  });

  describe("isEmpty", () => {
    it("should be true when array is empty", () => {
      expect(isEmpty([])).toBe(true);
    });

    it("should be false when array is not empty", () => {
      expect(isEmpty(["item"])).toBe(false);
    });
  });

  describe("last", () => {
    it("should be last item of array", () => {
      const lastItem = "last";

      expect(last(["first", "second", lastItem])).toBe(lastItem);
    });

    it("should be undefined when array is empty", () => {
      expect(last([])).toBeUndefined();
    });
  });

  describe("takeWhile", () => {
    it("can handle empty arrays", () => {
      expect(takeWhile([], () => true)).toHaveLength(0);
      expect(takeWhile([], () => false)).toHaveLength(0);
    });

    it("should return all items when predicate matches each", () => {
      const items = ["one", "two", "three"];

      expect(takeWhile(items, () => true)).toHaveMatchingMembersOf(items);
    });

    it("should exclude items after item not matching predicate", () => {
      const items = [
        { name: "item1" },
        { name: "item2" },
        { name: "item3" },
        { name: "other" },
        { name: "item4" }
      ];
      const result = takeWhile(items, x => x.name.startsWith("item"));

      expect(result).toHaveLength(3);

      const [item1, item2, item3] = result;

      expect(item1.name).toBe("item1");
      expect(item2.name).toBe("item2");
      expect(item3.name).toBe("item3");
    });
  });
});
