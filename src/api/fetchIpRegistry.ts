import { GetIpRegistry } from "../types/ipregistry";

const key = import.meta.env.VITE_IP_REGISTRY_API_KEY;

export const getClientIp = (): Promise<GetIpRegistry> =>
  fetch(`https://api.ipregistry.co/?key=${key}`).then((res) => res.json());
