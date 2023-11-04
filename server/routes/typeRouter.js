const Router = require('express')
const typeController = require('../controllers/typeController')
const {checkRoleMiddleware} = require('../middleware/checkRoleMiddleware')

const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

module.exports = router
