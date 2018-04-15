const server = require('http').createServer(handleRequest);
const url = require('url');
const PORT = process.argv[2];

if(!PORT){
    return console.log("please provide starting port number");
}

function handleRequest(req, res){
 res.writeHead(200, { 'content-type': 'application/json' }); // response as json data
 let reqPath = url.parse(req.url).pathname;
 let query = url.parse(req.url, true).query;
 let isoDate = query.iso;
 let dateTime;
 switch (reqPath) {
     case '/api/parsetime':
         dateTime = new Date(isoDate);
         let responseData = {
           "houre": dateTime.getHours(),
            "minute": dateTime.getMinutes(),
            "second": dateTime.getSeconds()
         };
         res.end(JSON.stringify(responseData));
         break;
     case '/api/unixtime':
        dateTime = new Date(isoDate);
        let resData = { "unixtime": dateTime.getTime() };
        res.end(JSON.stringify(resData));
        break;    
     default:
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end("{ 'error': 'no route found'}");
        break;
 }  
}

server.listen(PORT, () => {
    console.log("server start on port ", PORT);
});