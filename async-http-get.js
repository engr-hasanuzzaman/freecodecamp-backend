const http = require('http')
const concat = require('concat-stream')

let dataHolders = []
let urls = process.argv.slice(2)

urls.forEach((url, index) => {
  httpGet(url, index, printData);
})

function httpGet(url, index, callback) {
  http.get(url, (resp) => {
    resp.setEncoding('utf8');
    resp.pipe(concat((data) => {
      dataHolders[index] = data;
      callback();
    }))
    resp.on('error', (error) => {
        return callback(error);
    })
  }).on('error', (error) => { console.error(error); })
}

function printData() {
  // console.log("printData has been called but data size is", dataHolders.length);
  if(dataHolders.length < urls.length)
    return;
  dataHolders.forEach((data) => {
    console.log(data);
  })
}
