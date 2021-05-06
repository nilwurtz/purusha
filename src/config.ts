export const config = {
  name: "User-Agent Mod",
  shortName: "uamod",
  browser: {
    message: { reload: "uamod-reload" },
    storage: { hosts: "uamod-hosts", userAgent: "uamod-useragent" },
  },
} as const;
