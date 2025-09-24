import {createEvent, createStore, sample} from "effector";
import {dataUpdated} from "../../features/balance-operations/model/balanceOperationsModel";
import type {Device} from "../../shared/lib/types/types";
import {refetchData} from "../../widgets/device-list/model/deviceListModel";

export const selectDevice = createEvent<Device>();

export const $selectedDevice = createStore<Device | null>(null).on(
  selectDevice,
  (_, payload) => payload
);

sample({
  clock: dataUpdated,
  target: refetchData,
});
