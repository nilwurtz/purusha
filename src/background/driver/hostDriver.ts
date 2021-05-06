import { browser } from "webextension-polyfill-ts";
import { HostPort } from "../port/hostPort";
import { config } from "../../config";

export class HostDriver implements HostPort {
  async getTargetHosts() {
    const hostValues = await browser.storage.local.get(
      config.browser.storage.hosts
    );
    return hostValues[config.browser.storage.hosts] as string[] | undefined;
  }
}
