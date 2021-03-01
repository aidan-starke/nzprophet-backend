
exports.seed = function (knex) {
  return knex('users').insert([
    { id: 1, name: 'Aidan', username: 'el coacho', email: 'starke.aidan@gmail.com', password_hash: '', reset_password_key: '' },
    { id: 2, name: 'Bradley', username: 'muthaphukknge', email: '19bradley97@gmail.com', password_hash: '', reset_password_key: '' }
  ]);
};
