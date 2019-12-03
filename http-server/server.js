const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

function display(req, res, location) {
  return fs.readFile(`${location}`, (err, data) => res.end(data));
}

const server = http.createServer((req, res) => {
  const urlParts = url.parse(req.url);
  switch (urlParts.pathname) {
    case "/":
      display(req, res, "dist/index.html");
      break;
    case urlParts.pathname.includes(".js") ? urlParts.pathname : "":
      display(req, res, `dist/${urlParts.pathname}`);
      break;
    default:
      display(req, res, "dist/index.html");
      break;
  }
});

server.listen(4200, () => console.info("HTTP server is up"));
