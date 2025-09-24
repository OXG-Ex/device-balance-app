import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import {makeServer} from "./shared/lib/fake-api/server.ts";

makeServer();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
