import { useEffect, useReducer } from "preact/hooks";
import { browser } from "webextension-polyfill-ts";
import { reducer } from "../reducer/hosts";
import { Hosts } from "../types/Hosts";

export const useHosts = () => {
  const initialState: Hosts = [];
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadFromStorage = () =>
    browser.storage.local
      .get("uamod-hosts")
      .then((h) => {
        const hosts = h["uamod-hosts"] as Hosts;
        dispatch({ type: "LOAD", hosts });
      })
      .catch((e) => console.error(`failed to load. ${e}`));

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    browser.storage.local
      .set({
        items: state,
      })
      .then(() => console.log(`save success ${state}`))
      .catch(() => console.error(`save failed ${state}`));
  }, [state]);

  return [state, dispatch, loadFromStorage] as const;
};
