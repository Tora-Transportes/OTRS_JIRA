require('dotenv').config();

// Mysql HELP DESK
const mysql_config = {
  client: 'mysql',
  connection: {
    database: process.env.DB_DATABASE_MYSQL_DESK,
    port: process.env.DB_PORT_MYSQL_DESK,
    user: process.env.DB_USER_MYSQL_DESK,
    server: process.env.DB_HOST_MYSQL_DESK,
    password: process.env.DB_PASS_MYSQL_DESK,
  },
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
  debug: true,
  pool: {
    min: 2,
    max: 10,
  },
};

// Sql Bi_Desenv
const sql_config = {
  client: 'mssql',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    connectTimeout: 90000,
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
  },
  debug: true,
};

const Sql_Conn = require('knex')(sql_config);
const Mysql_Conn = require('knex')(mysql_config);

module.exports = {
  Mysql_Conn,
  Sql_Conn
};
