const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, {
    playlistsService,
    playlistSongsService,
    playlistSongsActivitiesService,
    validator,
  }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      playlistsService,
      playlistSongsService,
      playlistSongsActivitiesService,
      validator,
    );

    server.route(routes(playlistSongsHandler));
  },
};
