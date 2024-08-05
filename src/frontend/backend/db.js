const PouchDB = require('pouchdb');
const db = new PouchDB('lms');

module.exports = db;
