/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.playlist_id_playlists.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('collaborations');
};
