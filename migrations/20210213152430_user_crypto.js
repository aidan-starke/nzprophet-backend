
exports.up = function (knex) {
    return knex.schema.createTable('user_crypto', table => {
        table.increments('id')
        table.integer('user_id')
        table.foreign('user_id').references('users.id')
        table.integer('crypto_id')
        table.foreign('crypto_id').references('cryptos.id')
        table.double('coins_owned')
        table.double('investment')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_crypto')
};