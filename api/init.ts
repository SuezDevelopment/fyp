import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import router from "./routes.ts";
// Importing some console colors
import {
    bold,
    yellow,
} from "https://deno.land/std@0.140.0/fmt/colors.ts";
  

const port = 3000;
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, serverType }) => {
    console.log(
      bold("Start listening on ") + yellow(`${hostname}:${port}`),
    );
    console.log(bold("  using HTTP server: " + yellow(serverType)));
});
  
await app.listen({ hostname: "127.0.0.1", port: port });
console.log(bold("Finished."));