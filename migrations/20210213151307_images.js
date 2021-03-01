
exports.up = function (knex) {
    return knex.schema.createTable('images', table => {
        table.increments('id')
        table.integer('crypto_id').references('id')
        table.foreign('crypto_id').references('cryptos.id')
        table.string('src')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('images')
};