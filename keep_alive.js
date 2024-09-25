import http from 'http';

const server = http.createServer((req, res) => {
  res.write('I am alive');
  res.end();
});

server.listen(3000);

export default server;
