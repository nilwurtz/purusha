import { browser } from "webextension-polyfill-ts";
import { HostDriver } from "./driver/hostDriver";
import { webRequestOnBefore } from "./handler/webRequest";
import { HostUseCase } from "./useCase/hostUseCase";

const hostUseCase = new HostUseCase(new HostDriver());

const loadHosts = async () => {
  const hosts = await hostUseCase.getTargetHosts();
  return hosts.map((host) => host.value);
};

const execute = async () => {
  const hosts = await loadHosts();
  console.log(`[background] hosts loaded: ${hosts}`);
  browser.webRequest.onBeforeSendHeaders.addListener(
    webRequestOnBefore,
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
  );
};

execute();
