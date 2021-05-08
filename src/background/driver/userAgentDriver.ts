import { browser } from "webextension-polyfill-ts";
import { config } from "../../config";
import { UserAgentPort } from "../port/userAgentPort";

export class UserAgentDriver implements UserAgentPort {
  async getUserAgentString() {
    const userAgentString = await browser.storage.local.get(
      config.browser.storage.userAgent
    );
    return userAgentString[config.browser.storage.userAgent] as
      | string
      | undefined;
  }
}
