require('dotenv').config();

var config = {};

config.node_env = process.env.NODE_ENV;
config.dbUrl = process.env.DB_URL;
config.port = process.env.PORT;

module.exports = config;