import "dotenv/config";

import { app } from "./app.js";

const port = Number(process.env.PORT ?? 4000);
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
