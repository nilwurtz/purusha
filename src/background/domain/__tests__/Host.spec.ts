import { Host, Hosts } from "../Host";

describe("Host", () => {
  describe("#isMatch", () => {
    it("if matches, return true", () => {
      const host = new Host("https://hoge.*");
      const target = `https://hogehoge.com$`;
      expect(host.isMatch(target)).toBe(true);
    });
    it("if not matches, return false", () => {
      const host = new Host("http://hoge.*");
      const target = `https://hogehoge.com$`;
      expect(host.isMatch(target)).toBe(false);
    });
  });
});

describe("Hosts", () => {
  describe("#of", () => {
    it("create Hosts from strings", () => {
      const actual = Hosts.of(["https://hoge.com", "http://hoge.com"]);
      expect(actual).toEqual(
        new Hosts([new Host("https://hoge.com"), new Host("http://hoge.com")])
      );
    });
    it("create Hosts from empty array", () => {
      const actual = Hosts.of([]);
      expect(actual).toEqual(new Hosts([]));
    });
  });

  describe("#empty", () => {
    it("create empty Hosts", () => {
      const actual = Hosts.empty();
      expect(actual).toEqual(new Hosts([]));
    });
  });

  describe("#isMatch", () => {
    it("create Hosts from strings", () => {
      const hosts = new Hosts([
        new Host(`https://.*\.com`),
        new Host("http://hoge.com"),
      ]);
      const actual = hosts.isMatch("http://hoge.com");
      expect(actual).toBe(true);
    });
    it("create Hosts from strings", () => {
      const hosts = new Hosts([
        new Host(`https://.*\.com`),
        new Host("http://hoge.com"),
      ]);
      const actual = hosts.isMatch("http://hoge.jp");
      expect(actual).toBe(false);
    });
  });
});
