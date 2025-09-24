export type Device = {
  created_at: string;
  id: string;
  name: string;
  places: Place[];
  updated_at: string;
};

export type Place = {
  balances: number;
  currency: string;
  deviceId: string;
  place: number;
};

export type UpdateBalanceParams = {
  deviceId: string;
  placeId: number;
  delta: number;
};
