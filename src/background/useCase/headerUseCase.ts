import { WebRequest } from "webextension-polyfill-ts";

interface HeaderUseCaseInterFace {
  isOriginMatches(
    details: WebRequest.OnBeforeSendHeadersDetailsType,
    hosts: string[]
  ): boolean;
}

export class HeaderUseCase implements HeaderUseCaseInterFace {
  isOriginMatches(
    details: WebRequest.OnBeforeSendHeadersDetailsType,
    hosts: string[]
  ) {
    hosts.map((host) => {
      const pattern = new RegExp(host);
      return pattern.test(details.url);
    });
    return true;
  }
}
