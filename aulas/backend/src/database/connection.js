const knex = require('knex');   // importa o knex
const configuration = require('../../knexfile');    // config DB dentro de knexfile

const connection = knex(configuration.development); // conexão de dev com o DB

module.exports = connection;    // exporta a conexão com o DB