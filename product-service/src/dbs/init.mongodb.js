const { default: mongoose } = require("mongoose");
const { db: config } = require("../configs/app.config");
const env = process.env.NODE_ENV || "dev";

const connectString = `mongodb://${config.host}:${config.port}/${config.name}`;
class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose
      .connect(connectString)
      .then(() => {
        console.log("Connected MongoDB");
      })
      .catch((err) => console.error("Error connecting MongoDB::: ", err));

    if (env === "dev") {
      // print mongo queries
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
