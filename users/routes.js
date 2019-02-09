const {Router} = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const router = new Router()

router.post('/users', (req, res, next) => {
  const user = {
  	email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
		passwordConfirmation: bcrypt.hashSync(req.body.passwordConfirmation, 10)
  }
  User
    .create(user)
    .then(entity => {
			console.log(req.body.password);
			
			if (req.body.passwordConfirmation === req.body.password) {
				return res.status(201).send({
					id: entity.id,
					email: entity.email,
					message: 'User was created'
				})
			}
    	return res.status(400).send({
				message: 'Passwords do not match'
			})
    })
    .catch(err => {
    	console.error(err)
    	res.status(500).send({
    		message: 'Something went wrong'
    	})
    })
})


// router.get('/users', (req, res, next) => {
//   let limit = req.query.limit || 25;
//   const offset = req.query.offset || 0;
//   limit = Math.min(200, limit);

//   Promise.all([
//     User.count(),
//     User.findAll({
//       limit,
//       offset
//     })
//   ])
//   .then(([total, users]) => {
//     res.send({
//       users,
//       total
//     })
//   })
//   .catch(error => next(error))    
// })

module.exports = router