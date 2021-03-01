
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('name')
        table.string('username')
        table.string('email')
        table.string('password_hash')
        table.timestamp('reset_expires_at')
        table.string('reset_password_key')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
