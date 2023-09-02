import _sequelize from 'sequelize'
const DataTypes = _sequelize.DataTypes
import _Food from './Food.js'
import _FoodType from './FoodType.js'
import _LikeRes from './LikeRes.js'
import _Order from './Order.js'
import _RateRes from './RateRes.js'
import _Restaurant from './Restaurant.js'
import _SubFood from './SubFood.js'
import _User from './User.js'

export default function initModels(sequelize) {
  const Food = _Food.init(sequelize, DataTypes)
  const FoodType = _FoodType.init(sequelize, DataTypes)
  const LikeRes = _LikeRes.init(sequelize, DataTypes)
  const Order = _Order.init(sequelize, DataTypes)
  const RateRes = _RateRes.init(sequelize, DataTypes)
  const Restaurant = _Restaurant.init(sequelize, DataTypes)
  const SubFood = _SubFood.init(sequelize, DataTypes)
  const User = _User.init(sequelize, DataTypes)

  Food.belongsToMany(User, {
    as: 'userIdUserOrders',
    through: Order,
    foreignKey: 'foodId',
    otherKey: 'userId',
  })
  Restaurant.belongsToMany(User, {
    as: 'userIdUsers',
    through: LikeRes,
    foreignKey: 'resId',
    otherKey: 'userId',
  })
  Restaurant.belongsToMany(User, {
    as: 'userIdUserRateRes',
    through: RateRes,
    foreignKey: 'resId',
    otherKey: 'userId',
  })
  User.belongsToMany(Food, {
    as: 'foodIdFoods',
    through: Order,
    foreignKey: 'userId',
    otherKey: 'foodId',
  })
  User.belongsToMany(Restaurant, {
    as: 'resIdRestaurants',
    through: LikeRes,
    foreignKey: 'userId',
    otherKey: 'resId',
  })
  User.belongsToMany(Restaurant, {
    as: 'resIdRestaurantRateRes',
    through: RateRes,
    foreignKey: 'userId',
    otherKey: 'resId',
  })
  Order.belongsTo(Food, { foreignKey: 'foodId' })
  Food.hasMany(Order, { foreignKey: 'foodId' })
  SubFood.belongsTo(Food, { foreignKey: 'foodId' })
  Food.hasMany(SubFood, { foreignKey: 'foodId' })
  Food.belongsTo(FoodType, { foreignKey: 'typeId' })
  FoodType.hasMany(Food, { foreignKey: 'typeId' })
  LikeRes.belongsTo(Restaurant, { foreignKey: 'resId' })
  Restaurant.hasMany(LikeRes, { foreignKey: 'resId' })
  RateRes.belongsTo(Restaurant, { foreignKey: 'resId' })
  Restaurant.hasMany(RateRes, { foreignKey: 'resId' })
  LikeRes.belongsTo(User, { foreignKey: 'userId' })
  User.hasMany(LikeRes, { foreignKey: 'userId' })
  Order.belongsTo(User, { foreignKey: 'userId' })
  User.hasMany(Order, { foreignKey: 'userId' })
  RateRes.belongsTo(User, { foreignKey: 'userId' })
  User.hasMany(RateRes, { foreignKey: 'userId' })

  return {
    Food,
    FoodType,
    LikeRes,
    Order,
    RateRes,
    Restaurant,
    SubFood,
    User,
  }
}
