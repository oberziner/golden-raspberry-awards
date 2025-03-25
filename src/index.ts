import { buildApp } from "./server/start";

const port = 3000;

buildApp().then((app) =>
  app.listen(port, () =>
    console.log(`[server]: Server is running at http://localhost:${port}`),
  ),
);
