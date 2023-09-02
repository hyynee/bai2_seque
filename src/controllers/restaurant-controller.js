import initModels from '../models/init-models.js'
import DBConnection from '../sequelize-config.js'

const model = initModels(DBConnection)

/* Get Users Like Restaurant */
export const getUsersLikeRestaurant = async (req, res) => {
  const { resId } = req.body
  const usersLikeRestaurant = await model.Restaurant.findByPk(resId, {
    attributes: {
      exclude: ['desc'],
    },
    include: {
      model: model.LikeRes,
      attributes: {
        exclude: ['resId'],
      },
    },
  })
  res.status(200).send(usersLikeRestaurant)
}

/* Get Users Rate Restaurant */
export const getUsersRateRestaurant = async (req, res) => {
  const { resId } = req.body
  const usersRateRestaurant = await model.Restaurant.findByPk(resId, {
    attributes: {
      exclude: ['desc'],
    },
    include: {
      model: model.RateRes,
      attributes: {
        exclude: ['resId'],
      },
    },
  })
  res.status(200).send(usersRateRestaurant)
}
