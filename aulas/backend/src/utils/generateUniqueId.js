const crypto = require('crypto');   // importa crypto

// // gera uma string com 4 bytes hexadecimais
module.exports = function generateUniqueId() {
        return crypto.randomBytes(4).toString('HEX');
    }
       