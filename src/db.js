//Entity framework for Nodejs
var Sequelize = require('sequelize');
//Our global DB and Table variables
var db = null;
var Message = null;

//Connect to the database and load the data on start up
function init(){
	db = new Sequelize('ChatRoom', 'BradGit', 'MemberThe90s', {
	  host: 'project2-chatroom.database.windows.net',
	  dialect: 'mssql',
	  pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	  },
	  dialectOptions: {
	    encrypt: true
	  }
	});

	Message = db.define('nodeMessage', {
	  id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	  },
	  username: Sequelize.STRING,
		body: Sequelize.STRING(1000),
	});

	// {force: true} drops the table before running
	Message.sync({force: true});
}

//Test stuff, nothing important
exports.test = function (req, res) {
		var newMessage = Message.build({
		  username: "Test",
		  body: "Fug :DDDDDD"
		});

		newMessage.save().then(function () {
		  exports.getMessages(req,res);
		});
};

//API function for getting all of the messages from the database
exports.getMessages = function (req, res) {
	Message.findAll().then(function (records) {
		res.setHeader('content-type', 'text/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.status(200).json(records);
	});
};

//API function for posting a message to the database
exports.postMessage = function (req, res) {
	var userName = req.body.username;
	var message = req.body.message;

	var newMessage = Message.build({
	  username: userName,
	  body: message
	});

	newMessage.save().then(function() {
		exports.getMessages(req,res);
	});
};

//Run init as soon as main.js:Line 4 is run.
init();
