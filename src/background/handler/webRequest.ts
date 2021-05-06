import { WebRequest } from "webextension-polyfill-ts";

type OnBeforeSendHeadersCallBack = (
  details: WebRequest.OnBeforeSendHeadersDetailsType
) => void | WebRequest.BlockingResponseOrPromise;

export const webRequestOnBefore: OnBeforeSendHeadersCallBack = (details) => {
  if (details.requestHeaders !== undefined) {
    for (const header of details.requestHeaders) {
      if (header.name.toLowerCase() === "user-agent") {
        console.log(`User-agent:${header.value}`);
        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  }
};
