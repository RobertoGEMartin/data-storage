/**
 * Created by Rober on 09/05/15.
 */
//A simple chat server implemented with Redis pub/sub functionality
var net = require('net');
var redis = require('redis');

//Define setup logic for each user connecting to chat server
var server = net.createServer(function (socket) {
    var subscriber;
    var publisher;
    socket.on('connect', function () {
        //Create subscriber client for each user
        subscriber = redis.createClient();
        //Subscribe to a channel
        subscriber.subscribe('main_chat_room');
        // When a message is received from a channel, show it to user
        subscriber.on('message', function (channel, message) {
            socket.write('Channel ' + channel + ': ' + message);
        });
        ///Create publisher client for each user
        publisher = redis.createClient();
    });
    //When user enters a message, publish it
    socket.on('data', function (data) {
        publisher.publish('main_chat_room', data);
    });
    //If user disconnects, end client connections*/
    socket.on('end', function () {
        subscriber.unsubscribe('main_chat_room');
        subscriber.end();
        publisher.end();
    });
});
server.listen(3000);