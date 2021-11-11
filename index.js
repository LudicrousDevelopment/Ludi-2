const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const {port, prefix, alloyprefix} = require('./config.json');

atob = str => new Buffer.from(str, 'base64').toString('utf-8')

btoa = str => new Buffer.from(str, 'utf-8').toString('base64')

const Alloy = new (require('./proxy/alloy/index.js'))(alloyprefix)
const Palladium = new (require('./palladium/lib/server/index.js'))({
  encode: 'xor',
  ssl: 'true',
  prefix: prefix,
})
const Corrosion = new (require('./lib/server/index.js'))({
  codec: 'xor',
  forceHttps: true,
  prefix: '/service/',
})

app.use(bodyParser.json())
app.use(express.static('./public', {extensions: ['html']}))
const server = require('http').createServer(app)

app.all('*', (req, res) => {
  req.headers.useragent === 'googlebot' && r.writeHead(403).end();
  req.pathname = req.url.split('#')[0].split('?')[0];
  req.query = {};
  req.url.split('#')[0].split('?').slice(1).join('?').split('&').forEach(query => req.query[query.split('=')[0]] = query.split('=').slice(1).join('='));
  if (req.url.startsWith(prefix + "gateway")) {
    if (!req.query.url.startsWith('http')) {
      req.query.url = 'https://google.com/search?q='+req.query.url
    }
    new URL(req.query.url) ? res.redirect(prefix + btoa(req.query.url)) : (atob(req.query.url) ? res.redirect(prefix + btoa(req.query.url)) : res.end("URL Parse Error"))
  } else if (req.url.startsWith(prefix)) {return Palladium.request(req, res)} else if (req.url.startsWith(alloyprefix)) {
    return Alloy.http(req, res)
  } else if (req.query.url && (req.pathname == '/prox' || req.pathname == '/prox/' || req.pathname == '/session' || req.pathname == '/session/')) {
    var url = atob(req.query.url);

    if (url.startsWith('https://') || url.startsWith('http://')) url = url;
    else if (url.startsWith('//')) url = 'http:' + url;
    else url = 'http://' + url;

    return (res.writeHead(301, { location: alloyprefix + Alloy.proxifyRequestURL(url) }), res.end(''));
  } else if (req.url.startsWith(Corrosion.prefix)) {return Corrosion.request(req, res)} else {
    res.redirect('/')
  }
})

var https = require('http').Server(app)

https.on('request', (req, res) => {
  if (req.url.startsWith(Corrosion.prefix)) return Corrosion.request(req, res)
}).on('upgrade', (req, socket, head) => Corrosion.upgrade(req, socket, head))

Palladium.ws(https);
Palladium.clientScript();

https.listen(process.env.PORT || port, () => {
  console.log('server started');
});