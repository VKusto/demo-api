const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World ' + new Date());
});

app.get('/timeStamp', function (req, res) {
    //res.send('' + Date.now());
    res.send(`${Date.now()}`);
});

app.listen(80);
