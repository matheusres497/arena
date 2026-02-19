const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const jsonCharstest = require('./json/charstest.json');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

app.use(express.json());
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'index'));
});

app.get('/jogar', (req, res) => {
  res.render('game', { jsonData: jsonCharstest });
});

app.get('/partida', (req, res) => {
  const time = JSON.parse(localStorage.getItem('time')); //1, 2, 3  
  const timePersonagens = time.map(id => jsonCharstest.characters.find(personagem => personagem.charid == parseInt(id)));
 
  const timeCPU = [4,5,6];
  const timePersonagensCPU = timeCPU.map(id => jsonCharstest.characters.find(personagem => personagem.charid == parseInt(id)));

  const partidaOffline = { timePersonagens, timePersonagensCPU };
  
  partidaOffline.timePersonagens = timePersonagens;
  partidaOffline.timePersonagensCPU = timePersonagensCPU; 

  res.render('matchoffline', {partidaOffline: partidaOffline});
});

app.post('/salvartime', (req, res) => {
    const formData = req.body;
    console.log("Time recebido:", formData);
    localStorage.setItem('time', JSON.stringify(formData));
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});



// const http = require('node:http');
// const fs = require('node:fs');
// const path = require('node:path');

// const hostname = '127.0.0.1';
// const port = process.env.PORT || 3000;

// const mimeTypes = {
//   '.html': 'text/html',
//   '.js': 'application/javascript',
//   '.css': 'text/css',
//   '.json': 'application/json',
//   '.png': 'image/png',
//   '.jpg': 'image/jpeg',
//   '.svg': 'image/svg+xml'
// };

// const server = http.createServer((req, res) => {
//   let reqUrl = req.url.split('?')[0];
//   if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html';

//   const filePath = path.join(__dirname, reqUrl);

//   fs.stat(filePath, (err, stats) => {
//     if (err || !stats.isFile()) {
//       res.statusCode = 404;
//       res.setHeader('Content-Type', 'text/plain; charset=utf-8');
//       res.end('Not found');
//       return;
//     }

//     const ext = path.extname(filePath).toLowerCase();
//     const contentType = mimeTypes[ext] || 'application/octet-stream';

//     res.statusCode = 200;
//     res.setHeader('Content-Type', contentType);

//     const stream = fs.createReadStream(filePath);
//     stream.on('error', () => {
//       res.statusCode = 500;
//       res.end('Server error');
//     });
//     stream.pipe(res);
//   });
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });