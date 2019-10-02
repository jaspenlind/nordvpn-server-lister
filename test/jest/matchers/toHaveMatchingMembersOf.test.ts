import { SyncExpectationResult } from "expect/build/types";

import matcher from "./toHaveMatchingMembersOf";

describe("toHaveMatchingMembersOf", () => {
  const invoke = (
    received: number | object,
    expected: number | object
  ): SyncExpectationResult =>
    matcher.toHaveMatchingMembersOf(
      received,
      expected
    ) as SyncExpectationResult;

  describe("when objects are equal", () => {
    it("should fail for primitives", () => {
      expect(invoke(1, 1).pass).toBe(false);
    });

    it("should pass for objects", () => {
      const obj = (name: string) => ({ name });

      expect(invoke(obj("1"), obj("1")).pass).toBe(true);
    });

    it("should pass for objects with functions", () => {
      const obj = (name: string) => ({ getName: () => name, name });

      expect(invoke(obj("1"), obj("1")).pass).toBe(true);
    });
  });

  describe("when objects are not equal", () => {
    it("should fail for primitives", () => {
      expect(invoke(1, 2).pass).toBe(false);
    });

    it("should fail for objects", () => {
      const obj = (name: string) => ({ name });

      expect(invoke(obj("1"), obj("2")).pass).toBe(false);
    });

    it("should fail for objects with functions", () => {
      const obj = (name: string) => ({ getName: () => name, name });

      expect(invoke(obj("1"), obj("2")).pass).toBe(false);
    });
  });
});
