
exports.up = function (knex) {
    return knex.schema.createTable('cryptos', table => {
        table.increments('id').primary()
        table.string('name').unique()
        table.integer('image_id').references('id')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('cryptos')
};