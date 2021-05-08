import { WebRequest } from "webextension-polyfill-ts";
import { createWebRequestCallBack } from "../webRequest";

describe("webRequest", () => {
  describe("#createWebRequestCallBack", () => {
    it("override user-agent string", () => {
      const details = {
        url: "https://hoge.com",
        requestHeaders: [
          {
            name: "User-Agent",
            value: "",
          },
        ],
      } as WebRequest.OnBeforeSendHeadersDetailsType;

      const callback = createWebRequestCallBack(
        ["hoge.com", "bb"],
        "user-agent"
      );
      const actual = callback(details);
      expect(actual).toEqual({
        requestHeaders: [
          {
            name: "User-Agent",
            value: "user-agent",
          },
        ],
      });
    });
    it("if host not matches, do not override user-agent string", () => {
      const details = {
        url: "https://hoge.com",
        requestHeaders: [
          {
            name: "User-Agent",
            value: "",
          },
        ],
      } as WebRequest.OnBeforeSendHeadersDetailsType;

      const callback = createWebRequestCallBack(["aa", "bb"], "user-agent");
      const actual = callback(details);
      expect(actual).toEqual({
        requestHeaders: [
          {
            name: "User-Agent",
            value: "",
          },
        ],
      });
    });
    it("if not contains user-agent, do not override user-agent string", () => {
      const details = {
        url: "https://hoge.com",
        requestHeaders: [
          {
            name: "Content-Type",
            value: "text/html",
          },
        ],
      } as WebRequest.OnBeforeSendHeadersDetailsType;

      const callback = createWebRequestCallBack(["aa", "bb"], "user-agent");
      const actual = callback(details);
      expect(actual).toEqual({
        requestHeaders: [
          {
            name: "Content-Type",
            value: "text/html",
          },
        ],
      });
    });
    it("if empty headers, return undefined", () => {
      const details = {
        url: "https://hoge.com",
      } as WebRequest.OnBeforeSendHeadersDetailsType;

      const callback = createWebRequestCallBack(["aa", "bb"], "user-agent");
      const actual = callback(details);
      expect(actual).toEqual(undefined);
    });
  });
});
