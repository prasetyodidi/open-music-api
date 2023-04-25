/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('songs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        title: {
          type: 'VARCHAR(100)',
          notNull: true
        },
        year: {
            type: 'INT',
            notNull: true
        },
        performer: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        genre: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        duration: {
            type: 'INT',
            notNull: true
        },
        album_id: {
            type: 'VARCHAR(50)',
            reference: '"albums"'
        }
    })
};

exports.down = pgm => {};
