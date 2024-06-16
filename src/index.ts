const {app} = require("./app");
import http from 'http';
const port = 3000;
 
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API started at http://localhost:${port}`);
});