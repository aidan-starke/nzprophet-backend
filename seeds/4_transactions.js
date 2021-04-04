
exports.seed = function (knex) {
  return knex('transactions').del()
    .then(function () {
      return knex('transactions').insert([
        { id: 1, user_id: 3, crypto_sent: 'BTC', coins_sent: 0.001464, crypto_received: 'ADA', coins_received: 82.071889, timestamp: 'Fri Mar 12 2021 18:04' }
      ]);
    });
};
