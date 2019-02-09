const {
  Router
} = require('express')
const Songs = require('./model')
const Playlist = require('../playlists/model')
const auth = require('../auth/middleware')
const router = new Router()

router.post('/playlists/:id/songs', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist || playlist.userId !== req.user.id) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      Songs
        .create({
          ...req.body,
          playlistId: req.params.id
        })
        .then(song => {
          if (!song) {
            return res.status(404).send({
              message: `Song does not exist`
            })
          }
          return res.status(201).send({
            song,
            message: 'Song has been added to the playlist'
          })
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

router.put('/playlists/:id/songs/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist || playlist.userId !== req.user.id) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      Songs
        .findById(req.params.id)
        .then(song => {
          if (!song) {
            return res.status(404).send({
              message: `Song does not exist`
            })
          }
          return song
            .update(req.body)
            .then(song => res.status(200).send({
              song,
              message: 'Song details have been revised'
            }))
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id/songs/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist || playlist.userId !== req.user.id) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      Songs
        .findById(req.params.id)
        .then(song => {
          if (!song) {
            return res.status(404).send({
              message: `Song does not exist`
            })
          }
          return song.destroy()
            .then(() => res.status(200).send({
              message: `Song was deleted`
            }))
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

module.exports = router