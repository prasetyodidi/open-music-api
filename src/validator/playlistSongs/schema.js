const Joi = require('joi');

const PostPlaylistSongPayload = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PostPlaylistSongPayload };
