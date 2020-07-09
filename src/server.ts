import {
  Application,
} from "../deps.ts";

import routes from "./routes.ts";
import { staticFilesMiddleware } from "./app/middlewares/staticFilesMiddleware.ts";

const app = new Application();

app.use(routes.routes());
app.use(routes.allowedMethods());
app.use(staticFilesMiddleware);

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Server running on ${secure ? "https" : "http"}://${hostname ||
      "localhost"}:${port}`,
  );
});

app.addEventListener("error", (e) => console.log(e.error));

await app.listen({ port: 3333 });
