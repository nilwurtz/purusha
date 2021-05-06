import { useEffect, useReducer, useState } from "preact/hooks";
import { browser } from "webextension-polyfill-ts";
import { reducer } from "../reducer/hosts";
import { Hosts, HostStrings } from "../types/Hosts";

export const useHosts = () => {
  const initialState: HostStrings = [];
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadFromStorage = () =>
    browser.storage.local
      .get("uamod-hosts")
      .then((h) => {
        const hosts = h["uamod-hosts"] as HostStrings | undefined;
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
      .set({ "uamod-hosts": state })
      .then(() => console.log(`save success ${state}`))
      .catch(() => console.error(`save failed ${state}`));
  }, [state]);

  return [state, dispatch, loadFromStorage] as const;
};
