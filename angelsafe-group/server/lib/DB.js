const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

class DB {
  constructor(config) {
    this.log = config.log();
    this.HOST = config.dbHost;
    this.PORT = config.dbPort;
    this.NAME = config.dbName;
    this.DB = null;
    MongoClient.connect(`mongodb://${this.HOST}:${this.PORT}/${this.NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (err, client) => {
      if (!err) {
        this.DB = client.db(this.NAME);
        this.log.info('******** DB CONNECTED ********');
        this.log.info(`DB connected on port ${this.PORT}`);
      } else {
        this.log.error(err.message);
      }
    });
  }

  static getObjectId(id) {
    return new ObjectId(id);
  }

  getCollection(collectionName) {
    try {
      return this.DB.collection(collectionName);
    } catch (error) {
      this.log.error(error.message);
      return false;
    }
  }
}
module.exports = DB;