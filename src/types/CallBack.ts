import { WebRequest } from "webextension-polyfill-ts";

export type OnBeforeSendHeadersCallBack = (
  details: WebRequest.OnBeforeSendHeadersDetailsType
) => void | WebRequest.BlockingResponseOrPromise;
