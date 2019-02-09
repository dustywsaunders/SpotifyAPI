const {
  Router
} = require('express')
const Playlist = require('./model')
const Songs = require('../songs/model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/playlists', auth, (req, res, next) => {
  let limit = req.query.limit || 25;
  const offset = req.query.offset || 0;
  limit = Math.min(200, limit);

  Promise.all([
      Playlist.count(),
      Playlist.findAll({
        where: { userId: req.user.id },
        limit,
        offset
      })
    ])
    .then(([total, playlists]) => {
      res.send({
        playlists,
        total
      })
    })
    .catch(error => next(error))
})

router.get('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findAll({
      where: { userId: req.user.id },
      include: [Songs]
    })
    // Playlist
    // .findById(req.params.id, {
    //   include: [Songs]
    // })
    .then(playlist => {
      if (!playlist || playlist.userId !== req.user.id) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.status(200).send(playlist)
    })
    .catch(error => next(error))
})

router.post('/playlists', auth, (req, res, next) => {
  Playlist
    .create({
      ...req.body,
      userId: req.user.id})
    .then(playlist => {
      // console.log(req.user);
      
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.status(201).send({
        playlist,
        message: 'Playlist was created'
      })
    })
    .catch(error => next(error))
})


// router.put('/playlists/:id', auth, (req, res, next) => {
//   Playlist
//     .findById(req.params.id)
//     .then(playlist => {
//       if (!playlist) {
//         return res.status(404).send({
//           message: `Playlist does not exist`
//         })
//       }
//       return playlist.update(req.body).then(playlist => res.send(playlist))
//     })
//     .catch(error => next(error))
// })

router.delete('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist || playlist.userId !== req.user.id) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.status(200).send({
          message: `Playlist was deleted`
        }))
    })
    .catch(error => next(error))
})


module.exports = router