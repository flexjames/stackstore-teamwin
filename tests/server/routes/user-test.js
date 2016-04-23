// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var db = require('../../../server/db/seed');

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var User = mongoose.model('User');

var supertest = require('supertest');
var app = require('../../../server/app');