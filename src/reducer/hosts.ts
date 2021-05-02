type Hosts = string[];

type Action =
  | {
      type: "ADD";
      value: string;
    }
  | {
      type: "DELETE";
      index: number;
    };

export const reducer = (state: Hosts, action: Action): Hosts => {
  switch (action.type) {
    case "ADD": {
      return [...state, action.value];
    }
    case "DELETE": {
      return state.filter((_, index) => index !== action.index);
    }
  }
};
