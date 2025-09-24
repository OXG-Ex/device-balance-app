import {createEffect, createEvent, createStore} from "effector";

export const selectDevice = createEvent<string>();

export const selectedId = createStore<string | null>(null).on(
  selectDevice,
  (_, payload) => payload
);

export const fetchDevicesFx = createEffect(async () => {
  const res = await fetch("/a/devices/");
  if (!res.ok) throw new Error("Ошибка загрузки устройств");
  return await res.json();
});
