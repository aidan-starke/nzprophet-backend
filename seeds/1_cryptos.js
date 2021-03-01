
exports.seed = function (knex) {
  return knex('cryptos').insert([
    { id: 1, name: 'ALGO', image_id: 1 },
    { id: 2, name: 'ADA', image_id: 2 },
    { id: 3, name: 'DOGE', image_id: 3 },
    { id: 4, name: 'ETH', image_id: 4 },
    { id: 5, name: 'LTC', image_id: 5 },
    { id: 6, name: 'XRP', image_id: 6 }
  ]);
};
