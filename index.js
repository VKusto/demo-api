const express = require('express'),
    app = express();


app.use(express.json());

app.post('/login', function(req, res) {
    var userName = req.body.user_name;
    var pw = req.body.pw;

    if(userName === 'test' && pw === '1234') {
        res.json({token: Date.now()});

    }
    else {
        res.send(404, 'USER_NOT_FOUND');
    }
});

app.get('/timeStamp', function (req, res) {
    //res.send('' + Date.now());
    res.send(`${Date.now()}`);
});

app.listen(process.env.PORT || 8081);
