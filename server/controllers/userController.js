const ApiError = require('../error/ApiError')
class UserController { // так лучше групирует 
    async registration(req, res) {

    }
    async login(req, res) {

    }
    async auth(req, res, next) {
        const {id} = req.query
        if(!id){
            return next(ApiError.forbiden('no id!'))
        }
        res.json(id)
    }
}

module.exports = new UserController()