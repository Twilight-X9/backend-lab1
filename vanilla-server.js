const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Hello');
});

server.listen(PORT, () => {
  console.log(`Vanilla HTTP server running on http://localhost:${PORT}`);
});
