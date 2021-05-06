export class Host {
  constructor(readonly value: string) {}

  isMatch(target: string) {
    return new RegExp(this.value).test(target);
  }
}

export class Hosts {
  constructor(readonly list: Host[]) {}

  static of(hostStrings: string[]) {
    return new Hosts(hostStrings.map((host) => new Host(host)));
  }

  static empty() {
    return new Hosts([]);
  }

  isMatch(target: string) {
    for (const host of this.list) {
      if (host.isMatch(target)) return true;
    }
    return false;
  }
}
