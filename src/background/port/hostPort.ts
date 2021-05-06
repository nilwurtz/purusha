export interface HostPort {
  getTargetHosts(): Promise<string[] | undefined>;
}
