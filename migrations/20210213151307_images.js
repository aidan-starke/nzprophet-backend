
exports.up = function (knex) {
    return knex.schema.createTable('images', table => {
        table.increments('id')
        table.int('crypto_id').references('id')
        table.foreign('crypto_id').references('crypto.id')
        table.string('src')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('images')
};
