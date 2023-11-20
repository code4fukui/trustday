import { serveAPI } from "https://js.sabae.cc/wsutil.js";

serveAPI("/api/", async (param, req, path, conninfo) => {
  return { response: "OK", param };
});
