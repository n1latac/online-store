const User = require('./User')
const Basket = require('./Basket')
const BasketDevice = require('./BasketDevice')
const Device = require('./Device')
const Type = require('./Type')
const Brand = require('./Brand')
const Rating = require('./Rating')
const DeviceInfo = require('./DeviceInfo')
const TypeBrand = require('./TypeBrand')



User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

BasketDevice.hasOne(Device)
Device.belongsTo(BasketDevice)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Brand.belongsToMany(Type, {through: TypeBrand})
Type.belongsToMany(Brand, {through: TypeBrand})

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    DeviceInfo
}