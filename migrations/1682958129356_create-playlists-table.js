exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      required: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      reference: '"users"',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('playlists');
};
