
exports.seed = function (knex) {
  return knex('transactions').del()
    .then(function () {
      return knex('transactions').insert([
        { id: 1, user_id: 1, crypto_sent: 'XRP', coins_sent: 241.57155, crypto_received: 'ADA', coins_received: 138.41937, timestamp: 'Fri Feb 12 2021 18:04' }
      ]);
    });
};
