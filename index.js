const http = require("node:http");
const { app } = require("./app");

const server = http.createServer(app);

server.listen(4000, () => {
  console.log("Server berjalan di port 4000");
});
