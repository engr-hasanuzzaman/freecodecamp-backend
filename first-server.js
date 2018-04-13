const strftime = require('strftime')
const net = require('net')
const server = net.createServer(requestHandler);
const PORT_NUMBER = process.argv[2]
// console.log(strftime('%B %d, %Y %H:%M:%S'))
function printCurrentTime() {
  return (strftime('%Y-%m-%d %H:%M'));
}

function requestHandler(socket) {
  // printCurrentTime();
  socket.write(printCurrentTime());
  socket.end("\n");
}

server.listen(PORT_NUMBER, (data) => {
  console.log(" node server is running on port", PORT_NUMBER);
});
