import { Host, Hosts } from "../../types/Hosts";
import { HostPort } from "../port/hostPort";

interface HostUseCaseInterface {
  getTargetHosts(): Promise<Hosts>;
}

export class HostUseCase implements HostUseCaseInterface {
  constructor(readonly driver: HostPort) {}

  async getTargetHosts() {
    const hosts = await this.driver.getTargetHosts();
    if (hosts === undefined) return [];
    return hosts.map((host) => new Host(host));
  }
}
