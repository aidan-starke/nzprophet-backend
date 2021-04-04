
exports.seed = function (knex) {
  return knex('users').insert([
    { name: 'Aidan', username: 'el coacho', email: 'starke.aidan@gmail.com', password_hash: '', reset_password_key: '' },
    { name: 'Bradley', username: 'muthaphukknge', email: '19bradley97@gmail.com', password_hash: '', reset_password_key: '' },
    { name: 'Demo', username: 'demo', email: 'demo@mail.com', password_hash: '', reset_password_key: '' }
  ]);
};
