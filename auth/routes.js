const {
  Router
} = require('express')
const router = new Router()
const {
  toJWT,
} = require('./jwt')
const User = require('../users/model')
const bcrypt = require('bcrypt')



router.post('/tokens', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(422).send({
      message: 'Please supply a valid email and password'
    })
  } else {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(404).send({
            message: 'User with that email does not exist'
          })
        }
        if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.status(200).send({
            jwt: toJWT({
              userId: entity.id
            }),
            userId: entity.id,
            message: 'User has logged in'
          })
        } else {
          res.status(422).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(401).send({
          message: 'User is not authenticated'
        })
      })
  }
});

module.exports = router