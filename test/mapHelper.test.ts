import { any, lastKey, toObject } from "../src/lib/mapHelper";
import { Server } from "../src/types";

describe("mapHelper", () => {
  describe("any", () => {
    it("should be true when map has items", () => {
      const map = new Map<string, string>([["item", "value"]]);

      expect(any(map)).toBe(true);
    });

    it("should be false when map is empty", () => {
      const map = new Map<string, string>();

      expect(any(map)).toBe(false);
    });
  });

  describe("lastKey", () => {
    it("should return last key in map", () => {
      const map = new Map<string, string>([
        ["firstkey", "firstval"],
        ["lastkey", "lastval"]
      ]);

      expect(lastKey(map)).toBe("lastkey");
    });

    it("should be undefined for empty map", () => {
      const map = new Map<string, string>();

      expect(lastKey(map)).toBeUndefined();
    });
  });

  describe("toObject", () => {
    it("can convert map to object", () => {
      const map = new Map<string, string>([
        ["name", "server1"],
        ["flag", "SE"]
      ]);

      const server: Partial<Server> = toObject(map);

      expect(server.name).toBe("server1");
      expect(server.flag).toBe("SE");
    });
  });
});
