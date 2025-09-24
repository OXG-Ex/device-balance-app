// import {createEvent, createStore} from "effector";

// export const updatePlayerBalance = createEvent<{
//   deviceId: number;
//   playerId: number;
//   balance: number;
// }>();

// export const $players = createStore({}) // { [deviceId]: [players] }
//   .on(updatePlayerBalance, (state, {deviceId, playerId, balance}) => {
//     const devicePlayers = state[deviceId] || [];
//     return {
//       ...state,
//       [deviceId]: devicePlayers.map((p) =>
//         p.id === playerId ? {...p, balance} : p
//       ),
//     };
//   });

// export const playersModel = {
//   $players,
//   updatePlayerBalance,
// };
