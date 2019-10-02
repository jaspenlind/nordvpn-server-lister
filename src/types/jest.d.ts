/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    /**
     * @summary
     * Same functionallity as the `toMatchObject` matcher but works around the limitation
     * that objects with functions cannot be compared.
     * 
     * See https://github.com/facebook/jest/issues/8475
     * 
     * @example
     * 
     * expect(obj).toHaveMatchingMembersOf(expected);
     * 
     * @param expected The expected result
     */
    toHaveMatchingMembersOf(expected: any): R;
  }
}
