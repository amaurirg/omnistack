// Cria a tabela incidents
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments(); // chave primária automática

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        // coluna para armazenar qual ONG criou o caso/incident 
        table.string('ong_id').notNullable();
        
        // chave estrangeira para sempre que o campo ong_id estiver preenchido,
        // precisa ser um id que esteja cadastrado dentro da tabela ongs
        // campo ong_id referencia campo id na tabela ongs
        table.foreign('ong_id').references('id').inTable('ongs');
    })
  };
  
  // Se algo der errado, deleta a tabela incidents
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  };
  