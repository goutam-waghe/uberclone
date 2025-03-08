const app = require("./app.js");
const PORT = process.env.PORT || 3000;
const http = require("http");
const server = http.createServer(app);

server.listen(PORT, function () {
  console.log(`server is running on ${PORT}`);
});
