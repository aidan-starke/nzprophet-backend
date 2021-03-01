
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('name')
        table.string('username').unique()
        table.string('email').unique()
        table.string('password_hash')
        table.timestamp('reset_expires_at')
        table.string('reset_password_key')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};