/**
 * Created by Rober on 06/05/15.
 */
var http = require('http');
var counter = 0;
var server = http.createServer(function(req, res) {
    counter++;
    res.write('Server has been accessed ' + counter + ' times.');
    res.end();
}).listen(8888);