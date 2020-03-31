const express = require('express');     // importa o express e armazena na variável
const cors = require('cors');           // importa o módulo de segurança
const {errors} = require('celebrate');  // importa errors de celebrate, evitando erro 500
const routes = require('./routes');     // importa as rotas / arquivo routes

const app = express();   // instancia app para acessar os métodos de express

// todas as apps frontend poderão acessar esse backend
app.use(cors());    // como estamos em dev, deixaremos assim mas poderá ser
// app.use(cors({      // dessa forma em produção
//     origin: 'http://meuapp.com'
// }));
app.use(express.json());    // Para body em json tem que informar ao node
app.use(routes);    // tem que informar que usará routes logo abaixo de express.json()
app.use(errors());  // abaixo de app.use(routes);, evitando erro 500

// app.listen(3333);   // escuta a porta 3333
module.exports = app; // para testes criaremos outro arquivo para o listen


/*
exemplo de criação de ONG pelo Insomnia com email errado

Requisição:
{
	"name": "ONG Teste Amauri",
	"email": "amauri.giovani",
	"whatsapp": "5511999999999",
	"city": "São Paulo",
	"uf": "SP"
}


Resposta:
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"email\" must be a valid email",
    "validation": {
      "source": "body",
      "keys": [
        "email"
      ]
    }
  }
*/