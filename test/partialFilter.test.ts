import { create, Server } from "../src/models/server";
import { filter } from "../src/lib/partialFilter";

describe("partialFilter", () => {
  describe("filter", () => {
    it("should be true when item matches filter", () => {
      const itemFilter: Partial<Server> = {
        name: "name"
      };

      const item = create({ name: "name", country: "Sweden" });

      expect(filter(item, itemFilter)).toBe(true);
    });

    it("should be false when some properties matches filter", () => {
      const itemFilter: Partial<Server> = {
        name: "name",
        country: "Norway"
      };

      const item = create({ name: "name", country: "Sweden" });

      expect(filter(item, itemFilter)).toBe(false);
    });

    it("should be false when no properties matches filter", () => {
      const itemFilter: Partial<Server> = {
        name: "name",
        country: "Norway"
      };

      const item = create({ name: "other name", country: "other country" });

      expect(filter(item, itemFilter)).toBe(false);
    });

    it("should be true when filter is empty", () => {
      const itemFilter: Partial<Server> = {};

      const item = create({ name: "name" });

      expect(filter(item, itemFilter)).toBe(true);
    });
  });
});
