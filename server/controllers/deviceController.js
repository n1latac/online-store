const path = require('path')
const uuid = require('uuid')
const Device = require('../models/Device')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, typeId, brandId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({ name, price, typeId, brandId, img: fileName })
            res.json(device)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getOne(req, res) {

    }
    async getAll(req, res){

    }
}

module.exports = new DeviceController()