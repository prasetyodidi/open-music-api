const autoBind = require('auto-bind');

class PlaylistSongsHandler {
  constructor(
    playlistsService,
    playlistSongsService,
    playlistSongsActivitiesService,
    validator,
  ) {
    this._playlistsService = playlistsService;
    this._playlistSongsService = playlistSongsService;
    this._playlistSongActivitiesService = playlistSongsActivitiesService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistSongHandler(request, h) {
    await this._validator.validatePostPlaylistSongPayload(request.payload);

    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAndSongExist(playlistId, songId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const id = await this._playlistSongsService.addPlaylistSong({ playlistId, songId });
    await this._playlistSongActivitiesService.addPlaylistActivity({
      playlistId, songId, userId: credentialId, action: 'add',
    });

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan lagu',
      data: {
        id,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongHandler(request) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistExist(playlistId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const playlist = await this._playlistSongsService.getPlaylistSongs(playlistId);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deleteSongHandler(request) {
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.deleteSong(playlistId, songId);
    await this._playlistSongActivitiesService.addPlaylistActivity({
      playlistId, songId, userId: credentialId, action: 'delete',
    });

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }

  async getPlaylistSongActivitiesHandler(request) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistExist(playlistId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const activities = await this._playlistSongActivitiesService
      .getActivitiesByPlaylistId(playlistId);

    return {
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    };
  }
}

module.exports = PlaylistSongsHandler;
