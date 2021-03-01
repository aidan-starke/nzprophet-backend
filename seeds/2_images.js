
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        { id: 1, crypto_id: 1, src: './ALGO.png' },
        { id: 2, crypto_id: 2, src: './ADA.png' },
        { id: 3, crypto_id: 3, src: './DOGE.png' },
        { id: 4, crypto_id: 4, src: './ETH.png' },
        { id: 5, crypto_id: 5, src: './LTC.png' },
        { id: 6, crypto_id: 6, src: './XRP.png' },
      ]);
    });
};
