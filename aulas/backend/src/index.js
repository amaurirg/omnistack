const express = require('express');     // importa o express e armazena na variável
const cors = require('cors');           // importa o módulo de segurança
const routes = require('./routes');     // importa as rotas / arquivo routes

const app = express();   // instancia app para acessar os métodos de express

// todas as apps frontend poderão acessar esse backend
app.use(cors());    // como estamos em dev, deixaremos assim mas poderá ser
// app.use(cors({      // dessa forma em produção
//     origin: 'http://meuapp.com'
// }));
app.use(express.json());    // Para body em json tem que informar ao node
app.use(routes);    // tem que informar que usará routes logo abaixo de express.json()

app.listen(3333);   // escuta a porta 3333
