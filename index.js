const express = require('express');
const {port} = require('./config.json');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
app.use(express.static('./public'))
const server = require('http').createServer(app)

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: './public'})
});

app.get('/prox', (req, res) => {
  res.redirect('https://pr.'+req.hostname+'/prox?url='+req.query.url)
})

server.listen(process.env.PORT || port, () => {
  console.log('server started');
});