
export interface ServerPrice {
  daily: number;
  monthly: number;
}

export interface ServerLocation {
  id: string;
  name: string;
  prices: ServerPrice;
}

export const SERVER_LOCATIONS: Record<string, ServerLocation> = {
  singapore: {
    id: "sg",
    name: "Singapore",
    prices: {
      daily: 340,
      monthly: 10000
    }
  },
  indonesia: {
    id: "id",
    name: "Indonesia",
    prices: {
      daily: 400,
      monthly: 12000
    }
  }
};
