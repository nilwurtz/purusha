import { browser } from "webextension-polyfill-ts";
import { OnBeforeSendHeadersCallBack } from "../types/CallBack";
import { HostDriver } from "./driver/hostDriver";
import { createWebRequestCallBack } from "./handler/webRequest";
import { HostUseCase } from "./useCase/hostUseCase";
import { config } from "../config";
import { UserAgentUseCase } from "./useCase/userAgentUseCase";
import { UserAgentDriver } from "./driver/userAgentDriver";

const hostUseCase = new HostUseCase(new HostDriver());
const userAgentUseCase = new UserAgentUseCase(new UserAgentDriver());
let callback: OnBeforeSendHeadersCallBack;

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

const loadUserAgentString = async () => {
  const userAgent = await userAgentUseCase.getUserAgent();
  return userAgent.value;
};

const execute = async () => {
  if (callback) {
    console.log(`[background]: remove listener`);
    browser.webRequest.onBeforeSendHeaders.removeListener(callback);
  }
  const hosts = await loadHosts();
  const userAgent = await loadUserAgentString();

  callback = createWebRequestCallBack(hosts, userAgent);

  browser.webRequest.onBeforeSendHeaders.addListener(
    callback,
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
  );
};

execute();
