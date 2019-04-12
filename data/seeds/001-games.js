exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('games')
    .truncate()
    .then(function () {
      return knex('games').insert([
        { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 },
        { title: 'Adventure Island', genre: 'Snes', releaseYear: 1995 },
        { title: 'Arkanoid', genre: 'Arcade', releaseYear: 1984 },
        { title: 'Mario', genre: 'Arcade', releaseYear: 1986 },
      ]);
    });
};
