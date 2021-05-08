export class UserAgent {
  constructor(readonly value: string) {}
  static empty(): UserAgent {
    return new UserAgent("");
  }
}
