import initModels from '../models/init-models.js'
import DBConnection from '../sequelize-config.js'

const model = initModels(DBConnection)

/* Get Restaurants User Like */
export const getRestaurantUserLike = async (req, res) => {
  const { userId } = req.body
  const restaurantsUserLike = await model.User.findByPk(userId, {
    attributes: {
      exclude: ['passWord', 'facebookAppId'],
    },
    include: {
      model: model.LikeRes,
      attributes: {
        exclude: ['userId'],
      },
    },
  })
  res.status(200).send(restaurantsUserLike)
}

/* Get Restaurants User Rate */
export const getRestaurantUserRate = async (req, res) => {
  const { userId } = req.body
  const restaurantsUserRate = await model.User.findByPk(userId, {
    attributes: {
      exclude: ['passWord', 'facebookAppId'],
    },
    include: {
      model: model.RateRes,
      attributes: {
        exclude: ['userId'],
      },
    },
  })
  res.status(200).send(restaurantsUserRate)
}

/* User Like, Unlike Restaurant */
export const userLikeRes = async (req, res) => {
  try {
    const userQuery = (({ userId, resId }) => ({ userId, resId }))(req.body)
    const [userLike, created] = await model.LikeRes.findOrCreate({
      where: userQuery,
      defaults: {
        dateLike: Date.now(),
      },
    })

    if (created) {
      res.status(200).send({ mess: 'User Like Restaurant Success', userLike })
      return
    }
    await model.LikeRes.destroy({ where: userLike.dataValues })
    res.status(200).send({ mess: 'User Unlike Restaurant Success' })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

/* User Rate Restaurant */
export const userRateRes = async (req, res) => {
  try {
    const { userId, resId, amount } = req.body
    const [userRate, created] = await model.RateRes.findOrCreate({
      where: {
        userId,
        resId,
      },
      defaults: {
        amount,
        dateRate: Date.now(),
      },
    })
    if (created) {
      res.status(200).send({ mess: 'User Rate Restaurant Success', userRate })
      return
    }
    await model.RateRes.update(
      {
        amount,
        dateRate: Date.now(),
      },
      {
        where: {
          userId: userId,
          resId: resId,
        },
      }
    )
    res.status(200).send({ mess: 'User Update Rate Restaurant Success' })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

/* User Order */
export const userOrder = async (req, res) => {
  try {
    const { userId, foodId, amount, code, arrSubId } = req.body
    const [userOrder, created] = await model.Order.findOrCreate({
      where: {
        userId,
        foodId,
      },
      defaults: {
        amount: amount || 1,
        code,
        arrSubId,
      },
    })
    if (created) {
      res.status(200).send({ mess: 'User Order Success', userOrder })
    } else {
      res.status(400).send({ mess: 'The User Ordered This Food ' })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}
