const express = require('express'); // importa o express
// importa as ferramentas de forma desestruturada para faciltar
const {celebrate, Segments, Joi} = require('celebrate');
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
// o celebrate tem que validar antes da inserção ocorrer (create)
routes.post('/ongs', celebrate({
    // sempre que o objeto for uma variável do JS tem que ser passado em colchetes
    // string: verifica se é string
    // required: verifica se é obrigatório
    // email: verifica se o format é doo tipo email
    // number: verifica se é número
    // min: verifica se tem no mínimo a qtde de números entre () 
    // max: verifica se tem no máximo a qtde de números entre ()
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

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


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

module.exports = routes;    // exporta o módulo routes