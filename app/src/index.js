const express = require('express');
const app = express();
const parseXML = require('./parser')

app.get('/', function (req, res) {
  res.sendFile('index.html', { root : __dirname + '/../public' });
});

app.get('/index.php', function(req, res) {
  const { url } = req.query
  res.redirect('/podcast?url=' + url)
})

app.get('/podcast', function(req, res) {
  const { url } = req.query
  parseXML(url, xml => {
    res.set('Content-Type', 'text/xml');
    res.send(xml);
  })
})

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
