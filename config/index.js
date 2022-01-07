require('dotenv').config();

var config = {};

config.node_env = process.env.NODE_ENV;
config.db_url = process.env.DB_URL;
config.port = process.env.PORT;

module.exports = config;