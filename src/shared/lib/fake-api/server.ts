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
          id: 1,
          name: "Device Alpha",
          places: [
            {
              balances: 120.5,
              currency: "RUB",
              device_id: 1,
              place: 1,
            },
            {
              balances: 75.0,
              currency: "RUB",
              device_id: 1,
              place: 2,
            },
          ],
        },
        {
          created_at: "2025-09-23T10:00:00Z",
          updated_at: "2025-09-24T07:30:00Z",
          id: 2,
          name: "Device Beta",
          places: [
            {
              balances: 200.0,
              currency: "USD",
              device_id: 2,
              place: 1,
            },
          ],
        },
      ];

      // GET /a/devices/
      this.get("/devices/", () => {
        return devices;
      });

      // GET /a/devices/:device_id/
      this.get("/devices/:device_id/", (_, request) => {
        const id = Number(request.params.device_id);
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

      // POST /a/devices/:device_id/place/:place_id/update
      this.post("/devices/:device_id/place/:place_id/update", (_, request) => {
        const device_id = Number(request.params.device_id);
        const place_id = Number(request.params.place_id);
        const {delta} = JSON.parse(request.requestBody);

        const device = devices.find((d) => d.id === device_id);
        if (!device) {
          return new Response(
            400,
            {},
            {data: "Not found", err: "Device not found"}
          );
        }
        const place = device.places.find((p) => p.place === place_id);
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
          device_id: device.id,
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
