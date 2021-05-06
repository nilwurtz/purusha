import { useEffect, useReducer, useState } from "preact/hooks";
import { browser } from "webextension-polyfill-ts";
import { reducer } from "../reducer/hosts";
import { HostStrings } from "../types/Hosts";
import { config } from "../config";

export const useHosts = () => {
  const initialState: HostStrings = [];
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadFromStorage = () =>
    browser.storage.local
      .get(config.browser.storage.hosts)
      .then((h) => {
        const hosts = h[config.browser.storage.hosts] as
          | HostStrings
          | undefined;
        dispatch({ type: "LOAD", hosts: hosts ? hosts : [] });
        setIsFirstLoaded(true);
      })
      .catch((e) => console.error(`failed to load. ${e}`));

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (isFirstLoaded === false) return;
    browser.storage.local
      .set({ [config.browser.storage.hosts]: state })
      .then(() =>
        browser.runtime.sendMessage(undefined, config.browser.message.reload)
      )
      .then(() => console.log(`save success ${state}`))
      .catch(() => console.error(`save failed ${state}`));
  }, [state]);

  return [state, dispatch, loadFromStorage] as const;
};
