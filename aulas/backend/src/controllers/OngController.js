const generateUniqueId = require('../utils/generateUniqueId');

// pacote que vem com o node, usaremos um método para gerar uma string aleatória
const crypto = require('crypto');

// importa o arquivo configuration dentro dos arquivos que precisa conectar com o DB
const connection = require('../database/connection');

// async e await para esperar a execução da função para depois então executar o return
// porque a conexão e inserção irão demorar para serem executadas
// Quando chegar em await, irá executar todo esse bloco para depois retornar
module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        // const data = request.body;    // acessa o corpo enviado do tipo json (ex. no Insomnia)
        // desestruturação para pegar cada dado em uma variável separada
        const { name, email, whatsapp, city, uf } = request.body;
        // Para body em json tem que informar ao node: app.use(express.json());
        // console.log(data);    // { name: 'Amauri', idade: 45 }
        // return response.send(params);

        // gera uma string com 4 bytes hexadecimais
        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });   // retorna o id da ONG para ela saber qual será seu login
    }
};