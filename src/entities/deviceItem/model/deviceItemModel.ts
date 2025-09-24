import {createEffect, createStore} from "effector";

export const fetchDevicesFx = createEffect(async () => {
  return mockDevices;
});

export const $devices = createStore([]).on(
  fetchDevicesFx.doneData,
  (_, devices) => devices
);

export const devicesModel = {
  devices: $devices,
  fetchDevicesFx,
};
