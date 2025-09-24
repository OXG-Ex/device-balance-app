import {createEvent, createStore} from "effector";

export const selectDevice = createEvent<number>();

export const $selectedId = createStore<number | null>(null).on(
  selectDevice,
  (_, payload) => payload
);
