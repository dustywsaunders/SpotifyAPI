const Sequelize = require('sequelize')
const sequelize = require('../db')
const Songs = require('../songs/model')
const User = require('../users/model')


const Playlist = sequelize.define('playlists', {
  title: {
    type: Sequelize.STRING,
    field: 'playlist_title',
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  }
}, {
  timestamps: false,
  tableName: 'playlists'
})

Playlist.hasMany(Songs, {foreignKey: 'playlistId'})
Playlist.belongsTo(User)


module.exports = Playlist;