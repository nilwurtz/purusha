import { browser } from "webextension-polyfill-ts";
import { OnBeforeSendHeadersCallBack } from "../types/CallBack";
import { HostDriver } from "./driver/hostDriver";
import { createWebRequestCallBack } from "./handler/webRequest";
import { HostUseCase } from "./useCase/hostUseCase";
import { config } from "../config";

const hostUseCase = new HostUseCase(new HostDriver());

const ready = () => {
  browser.runtime.onMessage.addListener(async (message, _) => {
    console.log(`[background] message: ${message}`);
    if (message === config.browser.message.reload) {
      await execute();
    }
  });
};

ready();

const loadHosts = async () => {
  const hosts = await hostUseCase.getTargetHosts();
  return hosts.list.map((host) => host.value);
};

let callback: OnBeforeSendHeadersCallBack;

const execute = async () => {
  if (
    callback &&
    browser.webRequest.onBeforeSendHeaders.hasListener(callback)
  ) {
    browser.webRequest.onBeforeSendHeaders.removeListener(callback);
  }
  const hosts = await loadHosts();
  console.log(`[background] hosts loaded: ${hosts}`);
  callback = createWebRequestCallBack(hosts);
  browser.webRequest.onBeforeSendHeaders.addListener(
    callback,
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
  );
};

execute();
