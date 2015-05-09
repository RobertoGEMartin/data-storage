/**
 * Created by Rober on 09/05/15.
 */
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tasks');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskId = args.shift();
var taskProject = args.shift();
var taskDescription = args.shift();

//var file = path.join(process.cwd(), '/.tasks');

//Data Example
taskId = '4e65b793d0cf5ca508000001';
taskProject = 'Bikeshed';
taskDescription = 'Paint the bikeshed red.';

ProcessOrderToMongoose();

function ProcessOrderToMongoose() {

    //Process command
    switch (command) {
        case 'new':
            newSchema();
            break;
        case 'add':
            addTask(taskId, taskProject, taskDescription);
            break;
        case 'find':
            findTask(taskId, taskProject, taskDescription);
            break;
        case 'delete':
            deleteTask(taskId, taskProject, taskDescription);
            break;
        case 'update':
            updateTask(taskId, taskProject, taskDescription);
            break;
        default:
            console.log('Usage: ' + process.argv[0]
            + ' list|add [taskDescription]');
            mongoose.disconnect();
    }
}

//REGISTERING A SCHEMA
function registerSchema() {
    var Schema = mongoose.Schema;
    var Tasks = new Schema({
        project: String,
        description: String
    });
    mongoose.model('Task', Tasks);
}

//ADDING A TASK
function addTask(taskId, taskProject, taskDescription) {
    registerSchema();
    var Task = mongoose.model('Task');
    var task = new Task();
    task.project = 'Bikeshed';
    task.description = 'Paint the bikeshed red.';
    task.save(function (err) {
        if (err) throw err;
        console.log('Task saved.');
        //close connection
        mongoose.disconnect();
    })
}

//SEARCHING FOR A DOCUMENT
function findTask(taskId, taskProject, taskDescription) {
    registerSchema();
    var Task = mongoose.model('Task');
    Task.find({'project': 'Bikeshed'}, function (err, tasks) {
        for (var i = 0; i < tasks.length; i++) {
            console.log('ID:' + tasks[i]._id);
            console.log(tasks[i].description);
        }
        //close connection
        mongoose.disconnect();
    });
}
//UPDATING A DOCUMENT
function updateTask(taskId, taskProject, taskDescription) {
    registerSchema();
    var Task = mongoose.model('Task');
    Task.update(
        {_id: '4e65b793d0cf5ca508000001'},
        {description: 'Paint the bikeshed green.'},
        {multi: false},
        function (err, rows_updated) {
            if (err) throw err;
            console.log('Updated.');
            //close connection
            mongoose.disconnect();
        }
    );
}

function deleteTask(taskId, taskProject, taskDescription) {
//REMOVING A DOCUMENT
    registerSchema();
    var Task = mongoose.model('Task');
    Task.findOne({description: 'Paint the bikeshed red.'}, function (err, task) {
        task.remove(function () {
            if (err) throw err;
            console.log('Removed.');
            mongoose.disconnect();
        });
    });
}
