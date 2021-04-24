import { browser } from "webextension-polyfill-ts";

const execute = async () => {
  browser.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      if (details.requestHeaders !== undefined) {
        for (const header of details.requestHeaders) {
          if (header.name === "User-Agent") {
            console.log(`User-agent:${header.value}`)
            break;
          }
        }
        return { requestHeaders: details.requestHeaders };
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
  );
};

execute();
