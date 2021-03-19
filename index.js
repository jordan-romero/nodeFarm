const fs = require('fs');
const http = require('http');
const url = require('url');

//// FILES ////

// // Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. /nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// // Non-Blocking, asynchronous way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('Your file has been written');
//       });
//     });
//   });
// });

///SERVER///
const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathname = req.url;

  const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

  if (pathname === '/' || pathname === '/overview') {
    res.end('This is the overview');
  } else if (pathname === '/product') {
    res.end('Hello from the product!');
  } else if (pathname === '/api') {
    res.writeHead(404, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not Found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('The server has been started');
});
