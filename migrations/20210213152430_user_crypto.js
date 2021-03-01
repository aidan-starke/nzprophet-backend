
exports.up = function (knex) {
    return knex.schema.createTable('user_crypto', table => {
        table.increments('id')
        table.string('user_id')
        table.foreign('user_id').references('users.id')
        table.string('crypto_id')
        table.foreign('crypto_id').references('cryptos.id')
        table.int('coins_owned')
        table.int('investment')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_crypto')
};
