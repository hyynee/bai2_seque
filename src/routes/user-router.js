import express from 'express'
import {
  checkFoodId,
  checkResId,
  checkSubFoodId,
  checkUserId,
} from '../controllers/middleware.js'
import {
  getRestaurantUserLike,
  getRestaurantUserRate,
  userLikeRes,
  userOrder,
  userRateRes,
} from '../controllers/user-controller.js'

const userRouter = express.Router()

userRouter.get('/get-restaurants-user-like', checkUserId, getRestaurantUserLike)
userRouter.get('/get-restaurants-user-rate', checkUserId, getRestaurantUserRate)
userRouter.post('/like-restaurant', checkUserId, checkResId, userLikeRes)
userRouter.post('/rate-restaurant', checkUserId, checkResId, userRateRes)
userRouter.post(
  '/user-order',
  checkUserId,
  checkFoodId,
  checkSubFoodId,
  userOrder
)

export default userRouter
