const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToSong } = require('../../utils');
const ClientError = require('../../exceptions/ClientError');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong({ playlistId, songId }) {
    const id = `playlist_song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT p.name, u.username, s.id, s.title, s.performer FROM playlists p
            LEFT JOIN users u on u.id = p.owner
            LEFT JOIN playlist_songs ps on p.id = ps.playlist_id
            LEFT JOIN songs s on s.id = ps.song_id
            WHERE p.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    const playlistInfo = result.rows[0];
    const songs = result.rows.map(mapDBToSong);

    return {
      id: playlistId,
      name: playlistInfo.name,
      username: playlistInfo.username,
      songs,
    };
  }

  async deleteSong(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new ClientError('Lagu gagal dihapus');
    }
  }
}

module.exports = PlaylistSongsService;
