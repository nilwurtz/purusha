import { useEffect, useState } from "preact/hooks";
import { browser } from "webextension-polyfill-ts";
import { config } from "../config";

export const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    browser.storage.local
      .get(config.browser.storage.userAgent)
      .then((h) => h[config.browser.storage.userAgent] as string | undefined)
      .then((value) => setUserAgent(value ? value : ""))
      .catch((e) => console.error(`failed to load user-agent string ${e}`));
  }, []);

  return [userAgent, setUserAgent] as const;
};
