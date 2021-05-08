import { UserAgent } from "../domain/UserAgent";
import { UserAgentPort } from "../port/userAgentPort";

interface UserAgentUseCaseInterface {
  getUserAgent(): Promise<UserAgent>;
}

export class UserAgentUseCase implements UserAgentUseCaseInterface {
  constructor(readonly driver: UserAgentPort) {}

  async getUserAgent() {
    const userAgentString = await this.driver.getUserAgentString();
    return new UserAgent(userAgentString !== undefined ? userAgentString : "");
  }
}
