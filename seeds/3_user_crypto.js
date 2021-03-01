
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_crypto').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_crypto').insert([
        { id: 1, user_id: 1, crypto_id: 1, coins_owned: 102.27108, investment: 177.95 },
        { id: 2, user_id: 1, crypto_id: 3, coins_owned: 1775.8793, investment: 169.77 },
        { id: 3, user_id: 1, crypto_id: 5, coins_owned: 0.6858259, investment: 177.42 },
        { id: 4, user_id: 1, crypto_id: 6, coins_owned: 503.1434, investment: 365.63 },
        { id: 5, user_id: 2, crypto_id: 1, coins_owned: 140.303272, investment: 196.61 },
        { id: 6, user_id: 2, crypto_id: 3, coins_owned: 8950.036169, investment: 750.91 },
        { id: 7, user_id: 2, crypto_id: 4, coins_owned: 0.10953209, investment: 272.47 },
        { id: 8, user_id: 2, crypto_id: 6, coins_owned: 339.858957, investment: 243.75 }
      ]);
    });
};
