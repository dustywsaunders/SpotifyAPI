const Sequelize = require('sequelize')
const sequelize = require('../db')
const Songs = require('../songs/model')


const Playlist = sequelize.define('playlists', {
  title: {
    type: Sequelize.STRING,
    field: 'playlist_title',
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'playlists'
})

Playlist.hasMany(Songs, {foreignKey: 'playlistId'});


module.exports = Playlist;