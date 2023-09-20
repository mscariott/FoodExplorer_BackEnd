exports.up = knex => knex.schema.createTable("itens", table => {
  table.increments("id")
  table.integer("dish_id").references("id").inTable("dish").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("user").onDelete("CASCADE")
  table.integer("quantity")
});

exports.down =  knex => knex.schema.dropTable("itens");