import { useEffect, useState } from "preact/hooks";
import { browser } from "webextension-polyfill-ts";

export const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    browser.storage.local
      .get("uamod-useragent")
      .then((h) => h["uamod-useragent"] as string | undefined)
      .then((value) => setUserAgent(value ? value : ""))
      .catch((e) => console.error(`failed to load user-agent string ${e}`));
  }, []);

  useEffect(() => {
    browser.storage.local
      .set({ "uamod-useragent": userAgent })
      .then(() => browser.runtime.sendMessage(undefined, "uamod-reload"))
      .then(() => console.log(`user-agent string updated: ${userAgent}`))
      .catch((e) => console.error(`failed to save user-agent string ${e}`));
  }, [userAgent]);

  return [userAgent, setUserAgent] as const;
};
