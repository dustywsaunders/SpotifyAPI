const {
  Router
} = require('express')
const Songs = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/playlists/:id/songs', auth, (req, res, next) => {
  let limit = req.query.limit || 25;
  const offset = req.query.offset || 0;
  limit = Math.min(200, limit);

  Promise.all([
      Songs.count(),
      Songs.findAll({
        limit,
        offset
      })
    ])
    .then(([total, songs]) => {
      res.send({
        songs,
        total
      })
    })
    .catch(error => next(error))
})


// router.get('/songs/:id', auth, (req, res, next) => {
//   Songs
//     .findById(req.params.id)
//     .then(song => {
//       if (!song) {
//         return res.status(404).send({
//           message: `Song does not exist`
//         })
//       }
//       return res.send(song)
//     })
//     .catch(error => next(error))
// })

router.post('/playlists/:id/songs', auth, (req, res, next) => {
  Songs
    .create(req.body)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.status(201).send(song)
    })
    .catch(error => next(error))
})

router.put('/playlists/:id/songs/:id', auth, (req, res, next) => {
  Songs
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.update(req.body).then(song => res.send(song))
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id/songs/:id', auth, (req, res, next) => {
  Songs
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.destroy()
        .then(() => res.send({
          message: `Song was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router