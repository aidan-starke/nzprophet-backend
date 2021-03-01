
exports.up = function (knex) {
    return knex.schema.createTable('cryptos', table => {
        table.increments('id')
        table.string('name')
        table.integer('image_id').references('id')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('cryptos')
};