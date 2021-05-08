import { UserAgent } from "../../domain/UserAgent";
import { UserAgentPort } from "../../port/userAgentPort";
import { UserAgentUseCase } from "../userAgentUseCase";

describe("UserAgentUseCase", () => {
  describe("#getUserAgent", () => {
    it("returns UserAgent", async () => {
      const driver = {} as UserAgentPort;
      const getUserAgentString = jest.fn();
      getUserAgentString.mockResolvedValue("user-agent string");
      driver.getUserAgentString = getUserAgentString;

      const target = new UserAgentUseCase(driver);
      const actual = await target.getUserAgent();

      expect(actual).toEqual(new UserAgent("user-agent string"));
    });

    it("if returns undefined, returns empty UserAgent", async () => {
      const driver = {} as UserAgentPort;
      const getUserAgentString = jest.fn();
      getUserAgentString.mockResolvedValue(undefined);
      driver.getUserAgentString = getUserAgentString;

      const target = new UserAgentUseCase(driver);
      const actual = await target.getUserAgent();

      expect(actual).toEqual(new UserAgent(""));
    });
  });
});
