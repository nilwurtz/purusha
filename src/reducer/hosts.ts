import { Hosts, HostsAction } from "../types/Hosts";

export const reducer = (state: Hosts, action: HostsAction): Hosts => {
  switch (action.type) {
    case "ADD": {
      return [...state, action.value];
    }
    case "EDIT": {
      return state.map((host, index) =>
        index === action.index ? action.value : host
      );
    }
    case "DELETE": {
      return state.filter((_, index) => index !== action.index);
    }
    case "LOAD": {
      return action.hosts;
    }
    default: {
      throw new Error("invalid action type.");
    }
  }
};
