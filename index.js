const express = require('express'),
    app = express();


app.use(express.json());

app.post('/login1', function(req, res) {
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

app.post('/login', function (req, res) {

    var userName = req.body.user_name;
    var pw = req.body.pw;

    console.log('Post login attempt User Name:' + userName);

    if(!userName || !pw) {
        res.send(404, 'USER_NOT_FOUND');
        return;
    }

    var sql = require("mssql");

    // config for your database
    var config = {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_HOST,
        database: process.env.SQL_DB_NAME,
        encrypt: true
    };

    // connect to your database
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.send(500, 'ERROR OF DATABASE CONNECTION: ' + err.message);
            return;
        }

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`SELECT id FROM UserProfile WHERE user_name = '${userName}' and password_hash = '${pw}';`, function (err, data) {

            if (err) {
                console.log(err);
                res.send(500, 'ERROR OF SQL EXECUTION: ' + err.message);
                return;
            }

            // send records as a response
            if(data && data.recordsets && data.recordsets.length > 0 ) {
                res.json({token: Date.now()});
            } else{
                res.status(404).send('USER_NOT_FOUND');
            }
        });
    });
});


app.listen(process.env.PORT || 8081);
