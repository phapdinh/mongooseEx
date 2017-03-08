'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BookSchema = new Schema({
	title: String,
	author: String,
	category: String
});

module.exports = mongoose.model('Book',BookSchema);
