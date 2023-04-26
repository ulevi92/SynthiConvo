type IpRegistrySecurity = {
  is_vpm: boolean;
  is_anonymous: boolean;
  is_proxy: boolean;
  is_relay: boolean;
  is_cloud_provider: boolean;
  is_tor: boolean;
  is_tor_exit: boolean;
};

type IpRegistryCountry = {
  country: {
    code: string;
    name: string;
  };
};

type IpRegistryUserAgaent = {
  header: string;
  name: string;
};

export type IpRegistry = {
  ip: string;
  security: IpRegistrySecurity;

  location: {
    country: IpRegistryCountry;
  };

  user_agent: IpRegistryUserAgaent;
};
export type InitialState = {
  userIp: IpRegistry | null;
};
