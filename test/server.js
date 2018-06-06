var http = require('http');  
var fs = require('fs');  
var url = require('url');  
var path = require('path');

var mine = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};

var port = process.argv[2] || '8080';

http.createServer(function(request,response) {
  var pathname= url.parse(request.url).pathname;
  if (pathname.charAt(pathname.length - 1) == "/") {
    pathname += "index.html";
  }
  console.log("Request for "+ pathname + "  received.");
  
  var ext = path.extname(pathname);
  ext = ext ? ext.slice(1) : 'unknown';
  console.log("ext: "+ ext + "  received.");

  fs.readFile(pathname.substr(1),function(err, data) {
    if(err) {
      console.log(err);
      response.writeHead(404, {'Content-Type': 'text/html'});
    } else {
      var contentType = mine[ext] || "text/plain";
      response.writeHead(200, contentType);
      response.write(data.toString());
    }
    response.end();
  });
}).listen(port);

console.log('Server running at http://localhost:' + port + '/');
