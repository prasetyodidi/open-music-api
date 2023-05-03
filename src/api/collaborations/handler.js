const autoBind = require('auto-bind');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, usersService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._usersService = usersService;
    this._validator = validator;

    autoBind(this);
  }

  async postCollaborationsHandler(request, h) {
    this._validator.validatePostCollaborationPayload(request.payload);
    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistExist(playlistId);
    await this._usersService.verifyUserExistById(userId);
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    const collaborationId = await this._collaborationsService.addCollaborator(playlistId, userId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan collaborator',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCollaborationsHandler(request) {
    this._validator.validatePostCollaborationPayload(request.payload);
    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistExist(playlistId);
    await this._usersService.verifyUserExistById(userId);
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    await this._collaborationsService.deleteCollaborator(playlistId, userId);

    return {
      status: 'success',
      message: 'Berhasil menghapus collaborator',
    };
  }
}

module.exports = CollaborationsHandler;
