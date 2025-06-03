const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('DB already initialized!');
    return callback(null, _db);
  }
  const url = process.env.MONGODB_URL;
  if (!url) {
    return callback(new Error('MONGODB_URL environment variable not set!'));
  }
  MongoClient.connect(url)
    .then((client) => {
      _db = client.db(); 
      console.log('Database initialized!');
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db; 
};

module.exports = {
  initDb,
  getDatabase,
};