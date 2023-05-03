/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      reference: '"playlists"',
    },
    song_id: {
      type: 'VARCHAR(50)',
      reference: '"songs"',
    },
  });

  pgm.addConstraint(
    'playlist_songs',
    'fk_playlist_songs.playlist_id_playlists.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'playlist_songs',
    'fk_playlist_songs.song_id_songs.id',
    'FOREIGN KEY(song_id) REFERENCES songs ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('playlist_songs');
};
