const { app: appConfig } = require("./src/configs/app.config");
const { port } = appConfig;
const app = require("./src/app");

const server = app.listen(port, () => {
  console.log(`User service starts with port ${port}`);
});

// ctrl + c: close server
process.on("SIGINT", () => {
  server.close(() => console.log("Exit server"));
});
