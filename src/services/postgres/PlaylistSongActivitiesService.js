const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistSongActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistActivity({
    playlistId, songId, userId, action,
  }) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan activity');
    }

    return result.rows[0].id;
  }

  async getActivitiesByPlaylistId(playlistId) {
    const query = {
      text: `SELECT u.username, s.title, psa.action, psa.time FROM playlist_song_activities psa
            LEFT JOIN songs s on s.id = psa.song_id
            LEFT JOIN users u on u.id = psa.user_id
            WHERE psa.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistSongActivitiesService;
