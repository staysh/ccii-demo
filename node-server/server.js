const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const dgram = require('node:dgram');
const udpserver = dgram.createSocket('udp4');
const PORT = 8000;

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const STATIC_PATH = process.cwd();

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith('/')) paths.push('index.html');
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + '/404.html';
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

http.createServer(async (req, res) => {
  //if(path.extname(req.url) === '')
  if(req.method === 'POST')
  {
    var body = ''
    req.on('data', function(data) {
      body += data;
      console.log('Partial body: ' + body)
    })
    req.on('end', function() {
      console.log('Body: ' + body)
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end('post received')
    })
  } 
  else if(req.method === 'GET')
  {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { 'Content-Type': mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  }
}).listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);

/*
 * udp server
 * receives udp messages on localhost port 41234
 */

udpserver.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  udpserver.close();
});

udpserver.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

udpserver.on('listening', () => {
  const address = udpserver.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udpserver.bind(41234, '127.0.0.1');