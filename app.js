var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var db = 'mongodb://localhost/example';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/',function(req,res) {
	res.send('happy to be here');
})

app.get('/books',function(req,res) {
	console.log('getting all books');
	Book.find({}).exec(function(err,books) {
		if(err) {
			res.send(err.message);
		}
		else {
			console.log(books);
			res.json(books);
		}
	});
})

app.get('/books/:id', function(req,res) {
	console.log('getting one book');
	Book.findOne({
		_id: req.params.id
	})
	.exec(function(err,book) {
		if(err) {
			res.send(err.message);
		}
		else {
			res.json(book);
		}
	})
})

app.post('/book',function(req, res) {
	var newBook = new Book();
	
	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.category = req.body.category;
	
	newBook.save(function(err,book) {
		if(err) {
			res.send(err.message);
		}
		else {
			console.log(book);
			res.send(book);
		}
	});
})

app.post('/book2', function(req, res) {
	Book.create(req.body, function(err, book) {
		if(err) {
			res.send(err.message);
		} else {
			console.log(book);
			res.send(book);
		}
	});
})

app.put('book/:id',function(req, res) {
	Book.findOneAndUpdate({
			_id:req.params.id
		},
		{ $set: {title: req.body.title}},
		{upsert: true},
		function(err, newBook) {
			if(err) {
				console.log(err.message);
			} else {
				res.status(204);
			}
		});
})

app.delete('/book/:id', function() {
	Book.findOneAndRemove({
		_id:req.params.id
	}, function(err, book) {
		if(err) {
			res.send('error');
		}
		else {
			console.log(book);
			res.status(204);
		}
	});
})

var port = 8090;

app.listen(port, function() {
	console.log('app listening on ' + port);
});