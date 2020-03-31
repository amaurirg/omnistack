const request = require('supertest');  // importa o supertest para chamadas à api
const app = require('../../src/app');
const connection = require('../../src/database/connection');

// async e await para aguardar essa função finalizar para continuar com o código
// onde a resposta será o id:
// {
//     "id": "497e5b5f"
// }
// faz um rollback (desfaz as migrations zerando o DB teste) e depois faz as migrations
describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    afterAll(async () => {
        await connection.destroy();
    })
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            // .set('Authorization', 'an38fos9')   // se tivesse que passar o header
            .send({
                name: "ONG Teste Amauri",
                email: "amauri.giovani@gmail.com",
                whatsapp: "5513999998888",
                city: "Praia Grande",
                uf: "SP"
            });
        // console.log(response.body);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});