import { useEffect, useReducer, useState } from "preact/hooks";
import { browser } from "webextension-polyfill-ts";
import { reducer } from "../reducer/hosts";
import { HostStrings } from "../types/Hosts";
import { config } from "../config";

export const useHosts = () => {
  const initialState: HostStrings = [];
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadFromStorage = () =>
    browser.storage.local
      .get(config.browser.storage.hosts)
      .then((h) => {
        const hosts = h[config.browser.storage.hosts] as
          | HostStrings
          | undefined;
        dispatch({ type: "LOAD", hosts: hosts ? hosts : [] });
      })
      .catch((e) => console.error(`failed to load. ${e}`));

  useEffect(() => {
    loadFromStorage();
  }, []);

  return [state, dispatch, loadFromStorage] as const;
};
