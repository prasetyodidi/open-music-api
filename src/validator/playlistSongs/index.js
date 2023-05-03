const { PostPlaylistSongPayload } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const PlaylistSongsValidator = {
  validatePostPlaylistSongPayload: (payload) => {
    const validationResult = PostPlaylistSongPayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistSongsValidator;
