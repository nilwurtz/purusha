export class Host {
  constructor(readonly value: string) {}
}

export type Hosts = Host[];

export type HostStrings = string[];

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
      hosts: HostStrings;
    };
