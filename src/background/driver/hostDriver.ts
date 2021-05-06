import { browser } from "webextension-polyfill-ts";
import { HostPort } from "../port/hostPort";

export class HostDriver implements HostPort {
  async getTargetHosts() {
    const hostValues = await browser.storage.local.get("uamod-hosts");
    return hostValues["uamod-hosts"] as string[] | undefined;
  }
}
