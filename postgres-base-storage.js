/**
 * Created by Rober on 06/05/15.
 */
/**Postgres in localhost **/

var pg = require('pg');
var conString = "tcp://Rober@localhost:5432/Rober";
var client = new pg.Client(conString);
client.connect();

client.query(
    "INSERT INTO users " +
    "(name, age) VALUES ($1, $2)",
    ['Tom', 19]
);

var query = client.query(
    "SELECT * FROM users WHERE age < $1",
    [20],
    function(err, result) {
        if (err) throw err;
        console.log(result);
        client.end();
    }
);
query.on('row', function(row) {
    console.log(row.name + ' .Age:' + row.age)
});
query.on('end', function() {
    client.end();
});