const express = require('express'); // importa o express
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();    // desacopla o módulo de rotas do express


// app.get('/', (request, response) => {
//     // return response.send('Hello World');    // mensagem de retorno para o GET
//     return response.json({
//         evento: 'Semana Omnistack 11.0',
//         aluno: 'Amauri Rossetti Giovani'
//     });
// });

// app.get('/users', (request, response) => {
    // return response.send('Hello World');    // mensagem de retorno para o GET

    // app.get('/users', (request, response) => {
    // const params = request.query;   // acessa todos os params vindo de query
    // console.log(params);    // { name: 'Amauri' }

// app.get('/users/:id', (request, response) => {
//     const params = request.params;   // acessa todos os route params vindo de query
//     console.log(params);    // { id: '1' }

// Lista todos os registros de ongs
routes.get('/ongs', OngController.index);
// Insere os dados na tabela
routes.post('/ongs', OngController.create);

// Enviado no Insomnia como POST e Body = JSON
// {
// 	"name": "APAD",
// 	"email": "contato@apad.com.br",
// 	"whatsapp": "47000000000",
// 	"city": "Rio do Sul",
// 	"uf": "SC"
// }

// Resposta do Insomnia
// {
//     "id": "42a057c4"
// }

routes.post('/sessions', SessionController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;    // exporta o módulo routes