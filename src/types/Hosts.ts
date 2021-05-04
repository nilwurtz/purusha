export type Hosts = string[];

export type HostsAction =
  | {
      type: "ADD";
      value: string;
    }
  | {
      type: "EDIT";
      value: string;
      index: number;
    }
  | {
      type: "DELETE";
      index: number;
    }
  | {
      type: "LOAD";
      hosts: Hosts;
    };
