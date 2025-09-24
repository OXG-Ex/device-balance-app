import {createEvent, createStore, sample} from "effector";
import {balanceOperationsModel} from "../../features";
import type {Device} from "../../shared/lib/types/types";
import {deviceListModel} from "../../widgets";

export const selectDevice = createEvent<Device>();

export const $selectedDevice = createStore<Device | null>(null).on(
  selectDevice,
  (_, payload) => payload
);

sample({
  clock: balanceOperationsModel.dataUpdated,
  target: deviceListModel.refetchData,
});
