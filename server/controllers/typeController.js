const {Type} = require('../models/model')
class TypeController {
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name: name})
        return res.json(type)
    }
    async getAll(req, res){

    }
}

module.exports = new TypeController()