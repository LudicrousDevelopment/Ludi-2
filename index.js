const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const {port, prefix, alloyprefix} = require('./config.json');

atob = str => new Buffer.from(str, 'base64').toString('utf-8')

btoa = str => new Buffer.from(str, 'utf-8').toString('base64')

const Alloy = new (require('./proxy/alloy/index'))(alloyprefix)
const Smoke = new (require('./proxy/smoke/smoke'))(prefix)
const Corrosion = new (require('./lib/server'))({
  codec: 'xor',
  forceHttps: true,
  prefix: '/service/'
})

app.use(bodyParser.json())
app.use(express.static('./public'))
const server = require('http').createServer(app)

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: './public'})
});

app.get('*', (req, res) => {
  req.headers.useragent === 'googlebot' && r.writeHead(403).end();
  req.pathname = req.url.split('#')[0].split('?')[0];
  req.query = {};
  req.url.split('#')[0].split('?').slice(1).join('?').split('&').forEach(query => req.query[query.split('=')[0]] = query.split('=').slice(1).join('='));
  if (req.url.startsWith(prefix + "gateway")) {
    if (!req.query.url.startsWith('http')) {
      req.query.url = 'https://google.com/search?q='+req.query.url
    }
    new URL(req.query.url) ? res.redirect(prefix + btoa(req.query.url)) : (atob(req.query.url) ? res.redirect(prefix + btoa(req.query.url)) : res.end("URL Parse Error"))
  } else/* if (req.url.startsWith(prefix)) {return Smoke.request(req, res)} else*/ if (req.url.startsWith(alloyprefix)) {
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
}).post('*', (req, res) => {
  if (req.url.startsWith(prefix)) return Smoke.post(req, res)
})

server.listen(process.env.PORT || port, () => {
  console.log('server started');
});
