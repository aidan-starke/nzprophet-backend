
exports.seed = function (knex) {
  return knex('user_crypto').insert([
    { id: 1, user_id: 1, crypto_id: 1, coins_owned: 102.27108, investment: 177.95 },
    { id: 2, user_id: 1, crypto_id: 4, coins_owned: 1775.8793, investment: 169.77 },
    { id: 3, user_id: 1, crypto_id: 6, coins_owned: 0.6858259, investment: 177.42 },
    { id: 4, user_id: 1, crypto_id: 7, coins_owned: 261.571548, investment: 208.44 },
    { id: 5, user_id: 1, crypto_id: 2, coins_owned: 138.41937, investment: 174.66 },
    { id: 6, user_id: 2, crypto_id: 1, coins_owned: 140.303272, investment: 196.61 },
    { id: 7, user_id: 2, crypto_id: 4, coins_owned: 8950.036169, investment: 750.91 },
    { id: 8, user_id: 2, crypto_id: 5, coins_owned: 0.10953209, investment: 272.47 },
    { id: 9, user_id: 2, crypto_id: 7, coins_owned: 339.858957, investment: 243.75 },
    { id: 12, user_id: 3, crypto_id: 1, coins_owned: 680.272109, investment: 1000 },
    { id: 13, user_id: 3, crypto_id: 2, coins_owned: 82.071889, investment: 0 },
    { id: 10, user_id: 3, crypto_id: 3, coins_owned: 0.013179, investment: 1000 },
    { id: 11, user_id: 3, crypto_id: 5, coins_owned: 0.382004, investment: 1000 }
  ]);
};
