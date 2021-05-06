import { WebRequest } from "webextension-polyfill-ts";
import { OnBeforeSendHeadersCallBack } from "../../types/CallBack";
import { Hosts } from "../domain/Host";

export const createWebRequestCallBack = (
  hostStrings: string[]
): OnBeforeSendHeadersCallBack => {
  return (details: WebRequest.OnBeforeSendHeadersDetailsType) => {
    if (details.requestHeaders === undefined) return;

    const hosts = Hosts.of(hostStrings);
    if (hosts.isMatch(details.url) === true) {
      for (const header of details.requestHeaders) {
        if (header.name.toLowerCase() === "user-agent") {
          console.log(`User-agent:${header.value}`);
          break;
        }
      }
    }
    return { requestHeaders: details.requestHeaders };
  };
};
