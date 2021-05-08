export interface UserAgentPort {
  getUserAgentString(): Promise<string | undefined>;
}
