import {createEffect, createEvent, createStore, sample} from "effector";
import type {Place, UpdateBalanceParams} from "../../../shared/lib/types/types";

export const updateBalance = createEvent<
  Exclude<UpdateBalanceParams, {delta: number}> & {type: "withdraw" | "deposit"}
>();
export const setInputAmount = createEvent<string>();
export const closeModal = createEvent();
export const openModal = createEvent();
export const dataUpdated = createEvent();
export const setError = createEvent<string>();
export const resetError = createEvent();

export const $error = createStore("")
  .on(setError, (_, payload) => payload)
  .reset([resetError, closeModal]);

export const updateBalanceFx = createEffect<UpdateBalanceParams, Place, Error>(
  async ({deviceId, placeId, delta}) => {
    const response = await fetch(
      `/a/devices/${deviceId}/place/${placeId}/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({delta}),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.err || "Unknown error");
    }

    return response.json();
  }
);

export const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

export const $inputAmount = createStore<string>("")
  .on(setInputAmount, (_, payload) => {
    /*
        - Заменяем запятую на точку, чтобы пользователь мог вводить и так, и так.
        - Удаляем все лишние символы.
        - Оставляем только одну точку.
        - Ограничиваем дробную часть до двух знаков.
        - Убираем ведущие нули.
        - Не даём ввести отрицательные значения.
        - Из очевидных проблем, если не применить вышеперечисленное - пользователь смоджет ввести некорректное значение, что приведёт либо к ошибкам на бэке, либо к ошибкам при обработке на фронте
     */

    // Заменяем запятую на точку
    let val = payload.replace(",", ".");

    // Удаляем все символы, кроме цифр и одной точки
    val = val.replace(/[^0-9.]/g, "");

    // Оставляем только одну точку
    const parts = val.split(".");
    if (parts.length > 2) {
      val = parts[0] + "." + parts.slice(1).join("");
    }

    // Ограничиваем до двух знаков после точки
    if (val.includes(".")) {
      const [intPart, decPart] = val.split(".");
      val = intPart + "." + decPart.slice(0, 2);
    }

    // Убираем ведущие нули (кроме "0." и "0")
    if (/^0[0-9]+/.test(val)) {
      val = val.replace(/^0+/, "");
      if (val === "") val = "0";
    }

    // Не даём ввести отрицательные значения
    if (val.startsWith("-")) {
      val = val.replace("-", "");
    }

    return val;
  })
  .reset(closeModal);

sample({
  clock: updateBalance,
  source: $inputAmount,
  fn: (src, {deviceId, placeId, type}): UpdateBalanceParams => {
    const amount = Number(src);
    let delta = amount;

    if (type === "withdraw") {
      delta = 0 - amount;
    }

    return {
      delta,
      deviceId,
      placeId,
    };
  },
  target: updateBalanceFx,
});

sample({
  clock: updateBalanceFx.doneData,
  target: [closeModal, resetError, dataUpdated],
});

sample({
  clock: updateBalanceFx.failData,
  fn: (clk) => clk.message,
  target: setError,
});
