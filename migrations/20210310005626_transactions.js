
exports.up = function (knex) {
    return knex.schema.createTable('transactions', table => {
        table.increments('id').primary()
        table.foreign('user_id').references('users.id')
        table.integer('user_id')
        table.string('crypto_sent')
        table.integer('coins_sent')
        table.string('crypto_received')
        table.integer('coins_received')
        table.string('timestamp')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('transactions')
};
