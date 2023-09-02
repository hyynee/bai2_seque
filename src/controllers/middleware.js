import initModels from '../models/init-models.js'
import DBConnection from '../sequelize-config.js'

const model = initModels(DBConnection)

/* Check User ID In Database */
export const checkUserId = async (req, res, next) => {
  const { userId } = req.body
  const isUserInDB = await model.User.findByPk(userId)
  if (isUserInDB) return next()
  res.status(404).send('User Not Found')
}

/* Check Restaurant ID In Database */
export const checkResId = async (req, res, next) => {
  const { resId } = req.body
  const isResInDB = await model.User.findByPk(resId)
  if (isResInDB) return next()
  res.status(404).send('Restaurant Not Found')
}

/* Check Food ID In Database */
export const checkFoodId = async (req, res, next) => {
  const { foodId } = req.body
  const isFoodInDB = await model.User.findByPk(foodId)
  if (isFoodInDB) return next()
  res.status(404).send('Food Not Found')
}

/* Check Sub Food ID In Database */
export const checkSubFoodId = async (req, res, next) => {
  try {
    const { arrSubId } = req.body
    if (!arrSubId) return next()

    const arrSubFood = JSON.parse(arrSubId)
    if (arrSubFood instanceof Array && arrSubFood.length !== 0) {
      const arrSubFoodPromise = arrSubFood.map((subFoodId) => {
        return model.SubFood.findByPk(subFoodId)
      })
      const arrSubFodInDB = await Promise.all(arrSubFoodPromise)
      if (!arrSubFodInDB.includes(null)) return next()
      res.status(404).send('Sub Food Not Found')
    } else {
      res.status(400).send('Sub Food Data Invalid')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}
