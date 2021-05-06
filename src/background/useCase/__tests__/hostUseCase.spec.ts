import { HostPort } from "../../port/hostPort";
import { Host } from "../../../types/Hosts";
import { HostUseCase } from "../hostUseCase";

describe("hostUseCase", () => {
  describe("#getTargetHosts", () => {
    it("returns Hosts", async () => {
      const driver = {} as HostPort;
      const getTargetHosts = jest.fn();
      getTargetHosts.mockResolvedValue(["https://hoge.com"]);
      driver.getTargetHosts = getTargetHosts;
      const target = new HostUseCase(driver);

      const actual = await target.getTargetHosts();
      expect(actual).toEqual([new Host("https://hoge.com")]);
    });
    it("if returns undefined from driver, returns empty array", async () => {
      const driver = {} as HostPort;
      const getTargetHosts = jest.fn();
      getTargetHosts.mockResolvedValue(undefined);
      driver.getTargetHosts = getTargetHosts;
      const target = new HostUseCase(driver);

      const actual = await target.getTargetHosts();
      expect(actual).toEqual([]);
    });
  });
});
