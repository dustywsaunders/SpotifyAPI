const {
	Router
} = require('express')
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

module.exports = router