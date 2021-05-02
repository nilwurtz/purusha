export type Hosts = string[];

export type HostsAction =
  | {
      type: "ADD";
      value: string;
    }
  | {
      type: "DELETE";
      index: number;
    }
  | {
      type: "LOAD";
      hosts: Hosts;
    };
