// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var db = require('../../../server/db/seed');

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var User = mongoose.model('User');

var app = require('../../../server/app');


describe('Users Route', function () {

	var userInfo = {
		email: 'joe@gmail.com',
		password: 'shoopdawoop'
	};

	beforeEach('Establish a DB connection', function (done) {
		if (mongoose.connection.db) return done;
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test DB', function (done) {
		clearDB(done);
	});

	describe('Add a user', function () {
		it('should return the user with a new password', function (done) {
			app.post('/api/users', userInfo).expect(201);
		});
	});

	describe('Edit a user', function () {
		var userId;

		beforeEach('Create test user', function (done) {
			Users.create(testUserInfo)
			.then(function (user) {
				userId = user._id;
				done();
			});
		});

		it('should return the user with a new password', function (done) {
			app.put('/api/users/' + userId, {email: 'joe@gmail.com', password: 'newpass'})
			.then(function (updatedUser) {
				expect(201);
				expect(updatedUser.password).to.equal('newpass');
				done();
			});
		});
	});

	describe('Remove a user', function () {
		var userId;

		beforeEach('Create test user', function (done) {
			Users.create(testUserInfo)
			.then(function (user) {
				userId = user._id;
				done();
			});
		});

		it('should return a 204 response', function (done) {
			app.delete('/api/users/' + userId).expect(204);
		});
	});
});