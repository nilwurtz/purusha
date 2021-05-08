import { WebRequest } from "webextension-polyfill-ts";
import { OnBeforeSendHeadersCallBack } from "../../types/CallBack";
import { Hosts } from "../domain/Host";

export const createWebRequestCallBack = (
  hostStrings: string[],
  userAgentString: string
): OnBeforeSendHeadersCallBack => {
  return (details: WebRequest.OnBeforeSendHeadersDetailsType) => {
    if (details.requestHeaders === undefined) return;

    const hosts = Hosts.of(hostStrings);
    if (hosts.isMatch(details.url) === true) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === "User-Agent") {
          details.requestHeaders[i].value = userAgentString;
          break;
        }
      }
    }
    return { requestHeaders: details.requestHeaders };
  };
};
