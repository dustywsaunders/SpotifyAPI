const {
  Router
} = require('express')
const Songs = require('./model')

const router = new Router()

router.get('/songs', (req, res, next) => {
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


router.get('/songs/:id', (req, res, next) => {
  Songs
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.send(song)
    })
    .catch(error => next(error))
})

router.post('/songs', (req, res, next) => {
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

router.put('/songs/:id', (req, res, next) => {
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

router.delete('/songs/:id', (req, res, next) => {
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