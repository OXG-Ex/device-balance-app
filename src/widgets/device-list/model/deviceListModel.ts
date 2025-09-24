import {createEffect, createStore, sample} from "effector";
import {createGate} from "effector-react";
import type {Device} from "../../../shared/lib/types/types";

export const DevicesListGate = createGate();

export const $devices = createStore<Device[]>([]);

export const fetchDevicesFx = createEffect(async () => {
  const res = await fetch("/a/devices/");
  if (!res.ok) throw new Error("Ошибка загрузки устройств");
  return await res.json();
});

sample({
  clock: DevicesListGate.open,
  target: fetchDevicesFx,
});

sample({
  clock: fetchDevicesFx.doneData,
  target: $devices,
});
