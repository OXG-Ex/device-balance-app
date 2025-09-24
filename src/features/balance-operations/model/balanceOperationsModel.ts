// import {updatePlayerBalance} from "@/entities/player/model/player.model";
// import {createEffect} from "effector";

// export const operateBalanceFx = createEffect(
//   async ({deviceId, player, amount, type}) => {
//     if (isNaN(amount) || amount <= 0) throw new Error("Некорректная сумма");
//     if (!/^\d+(\.\d{1,2})?$/.test(amount.toString()))
//       throw new Error("Больше 2 знаков после запятой");
//     if (type === "withdraw" && amount > player.balance)
//       throw new Error("Недостаточно средств");
//     const newBalance =
//       type === "deposit" ? player.balance + amount : player.balance - amount;
//     return {deviceId, playerId: player.id, balance: newBalance};
//   }
// );

// operateBalanceFx.doneData.watch(({deviceId, playerId, balance}) => {
//   updatePlayerBalance({deviceId, playerId, balance});
// });
