const express = require('express')
const bodyParser = require('body-parser')
const playlistsRouter = require('./playlists/routes')
const songsRouter = require('./songs/routes')
const loginsRouter = require('./auth/routes')
const usersRouter = require('./users/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(
    playlistsRouter, 
    songsRouter, 
    loginsRouter, 
    usersRouter
  )
  .listen(port, () => console.log(`Listening on port ${port}`))
