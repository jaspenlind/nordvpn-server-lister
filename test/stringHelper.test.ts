import { trimStart } from "../src/lib/stringHelper";

describe("stringHelper", () => {
  describe("trimStart", () => {
    it("can trim empty string", () => {
      expect(trimStart("")).toBe("");
    });

    it("can trim unwanted chars", () => {
      const unwantedChars = ["-", "filter", "."];

      const value = "-filter.key=5";

      expect(trimStart(value, ...unwantedChars)).toBe("key=5");
    });
  });
});
