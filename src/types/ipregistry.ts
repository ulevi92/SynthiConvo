export type GetIpRegistry = {
  ip: string;
  type: "IPv4" | "IPv6";
  security: {
    is_abuser: false;
    is_attacker: false;
    is_bogon: false;
    is_cloud_provider: false;
    is_proxy: false;
    is_relay: false;
    is_tor: false;
    is_tor_exit: false;
    is_vpn: false;
    is_anonymous: false;
    is_threat: false;
  };
};

export type IpRegistrySecurityKey = keyof GetIpRegistry["security"];
