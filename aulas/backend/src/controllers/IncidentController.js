// importa o arquivo configuration dentro dos arquivos que precisa conectar com o DB
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query; // paginação, por padrão será 1

        // retorna o total de casos (incidents)
        // [count] = count[0] para pegar o primeiro registro
        const [count] = await connection('incidents').count();

        // o total será retornado pelo header como X-Total-Count (nome qualquer)
        response.header('X-Total-Count', count['count(*)']);

        // paginação limitado a 5 registros/página onde offset pula de 5 em 5
        // join relaciona dados das tabelas
        // 'ongs' => tabela
        // 'ongs.id' =>             onde o id da tabela ongs
        //'=' =>                    seja igual
        //'incidents.ongs_id' =>    ao ong_id da tabela incidents
        // como a ONG também possui id, ele sobrepõe o id de incidents e nesse
        // caso o select terá que ter todos os campos que desejamos
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        // envia o ong_id como autenticação através de headers
        // O mesmo Authorization enviado no header do Insomnia
        const ong_id = request.headers.authorization;

        // [id] se refere a variável id, o mesmo que
        // const id = result[0]
        // já que só teremos um único registro inserido por vez
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        // enviado com {} para o frontend saber que é um id porque ficará com o nome id
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params; // recebe o id de params
        const ong_id = request.headers.authorization;   // para saber se ong_id pertence a ONG

        // seleciona o 1º ong_id encontrado no DB e compara com o id recebido em params
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        // se o ong_id da tabela for diferente do recebido (não pertence a ONG)
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        // compara 'id' com id e deleta a ONG
        await connection('incidents').where('id', id).delete();

        // envia o status 204 - No Content como resposta
        return response.status(204).send();
    }
};
