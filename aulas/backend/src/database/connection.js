const knex = require('knex');   // importa o knex
const configuration = require('../../knexfile');    // config DB dentro de knexfile

// se for test, usará a config de kenfile.js e se for dev usará development mesmo
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config); // conexão de dev com o DB

module.exports = connection;    // exporta a conexão com o DB