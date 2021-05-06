import { browser } from "webextension-polyfill-ts";
import { HostDriver } from "./driver/hostDriver";
import { createWebRequestCallBack } from "./handler/webRequest";
import { HostUseCase } from "./useCase/hostUseCase";

const hostUseCase = new HostUseCase(new HostDriver());

const loadHosts = async () => {
  const hosts = await hostUseCase.getTargetHosts();
  return hosts.list.map((host) => host.value);
};

const execute = async () => {
  const hosts = await loadHosts();
  console.log(`[background] hosts loaded: ${hosts}`);
  const webRequestOnBefore = createWebRequestCallBack(hosts);
  browser.webRequest.onBeforeSendHeaders.addListener(
    webRequestOnBefore,
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
  );
};

execute();
