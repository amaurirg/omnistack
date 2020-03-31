// Exemplo de como fazer um teste
// describe('Generate Unique ID', () => {
//     it('should generate an unique ID', () => {
//         expect(2+2).toBe(4);    // espera-se que 2+2 seja 4
//     });
// });

// describe => nome do teste
// it => descrição do teste

const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId();  // gera um id
        expect(id).toHaveLength(8); // precisa conter (n) caracteres
    });
});