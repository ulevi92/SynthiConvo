export const fetchIpRegistry = async () => {
  const key = import.meta.env.VITE_IPREGISTRY_API_KEY;

  const response = await fetch(`https://api.registryip.co/${key}`);

  response.json();

  return response.json();
};
