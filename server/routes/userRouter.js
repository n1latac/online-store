const Router = require('express')
const userController = require('../controllers/userController')

const router = Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.auth)

module.exports = router
