import { fetch } from "../src";

describe("api", () => {
  describe("fetch", () => {
    it("can fetch servers", async () => {
      const result = await fetch();

      expect(result.items.length).toBeGreaterThan(0);
    });
  });
});
