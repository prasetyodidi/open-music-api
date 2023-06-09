exports.up = (pgm) => {
  pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('fk_playlists.owner_users.id');
};
