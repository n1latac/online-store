const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {User, Basket} = require('../models/model')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController { // так лучше групирует 
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('eamil and password is required!'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('this email is already taken.'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJWT(user.id, email, user.role)
        res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.badRequest('Email is incorrect!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Password is incorrect!'))
        }
        const token = generateJWT(user.id, email, user.role)
        return res.json({token})
    }
    async auth(req, res, next) {
        
    }
}

module.exports = new UserController()