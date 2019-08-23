// server entry point file
const express = require('express');
const router  =  require('./api');
var   app       = express();
var   history = require('connect-history-api-fallback');

app.use(router);
app.use(history());
app.use('/images', express.static(__dirname + '/server/images'))
app.use('/', express.static(__dirname + '/dist'));

let port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Started on port ' + port);
})