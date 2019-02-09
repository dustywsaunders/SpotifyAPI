const Sequelize = require('sequelize')
const sequelize = require('../db')

const Songs = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    field: 'title',
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    field: 'artist',
    allowNull: false
  },
  album: {
    type: Sequelize.STRING,
    field: 'album',
    allowNull: false
  },
  playlistId: {
    type: Sequelize.INTEGER,
    field: 'playlist_id'
  }
}, {
  timestamps: false,
  tableName: 'songs'
})

module.exports = Songs;