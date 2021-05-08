import { UserAgent } from "../UserAgent";

describe("UserAgent", () => {
  describe("empty", () => {
    it("returns empty UserAgent", () => {
      const actual = UserAgent.empty();
      expect(actual).toEqual(new UserAgent(""));
    });
  });
});
