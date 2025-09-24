import {createServer, Response} from "miragejs";

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = "a";

      // Мок-данные
      const devices = [
        {
          created_at: "2025-09-24T07:00:00Z",
          updated_at: "2025-09-24T07:30:00Z",
          id: "1",
          name: "Device Alpha",
          places: [
            {
              balances: 120.5,
              currency: "RUB",
              deviceId: "1",
              place: 1,
            },
            {
              balances: 75.0,
              currency: "RUB",
              deviceId: "1",
              place: 2,
            },
          ],
        },
        {
          created_at: "2025-09-23T10:00:00Z",
          updated_at: "2025-09-24T07:30:00Z",
          id: "2",
          name: "Device Beta",
          places: [
            {
              balances: 200.0,
              currency: "USD",
              deviceId: "2",
              place: 1,
            },
          ],
        },
      ];

      // GET /a/devices/
      this.get("/devices/", () => {
        return devices;
      });

      // GET /a/devices/:deviceId/
      this.get("/devices/:deviceId/", (_, request) => {
        const id = request.params.deviceId;
        const device = devices.find((d) => d.id === id);
        if (!device) {
          return new Response(
            400,
            {},
            {data: "Not found", err: "Device not found"}
          );
        }
        return device;
      });

      // POST /a/devices/:deviceId/place/:placeId/update
      this.post("/devices/:deviceId/place/:placeId/update", (_, request) => {
        const deviceId = request.params.deviceId;
        const placeId = Number(request.params.placeId);
        const {delta} = JSON.parse(request.requestBody);

        const device = devices.find((d) => d.id === deviceId);
        if (!device) {
          return new Response(
            400,
            {},
            {data: "Not found", err: "Device not found"}
          );
        }
        const place = device.places.find((p) => p.place === placeId);
        if (!place) {
          return new Response(
            400,
            {},
            {data: "Not found", err: "Place not found"}
          );
        }

        // Валидация суммы
        if (
          typeof delta !== "number" ||
          isNaN(delta) ||
          !/^-?\d+(\.\d{1,2})?$/.test(delta.toString())
        ) {
          return new Response(
            400,
            {},
            {data: "Некорректная сумма", err: "Invalid amount"}
          );
        }
        // Недостаточно средств
        if (delta < 0 && place.balances + delta < 0) {
          return new Response(
            400,
            {},
            {data: "Недостаточно средств", err: "Insufficient funds"}
          );
        }

        place.balances = +(place.balances + delta).toFixed(2);

        return {
          balances: place.balances,
          currency: place.currency,
          deviceId: device.id,
          place: place.place,
        };
      });

      // GET /time
      this.get("/time", () => {
        return Date.now();
      });
    },
  });
}
