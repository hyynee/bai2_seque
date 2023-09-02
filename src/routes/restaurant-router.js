import express from 'express'
import { checkResId } from '../controllers/middleware.js'
import {
  getUsersLikeRestaurant,
  getUsersRateRestaurant,
} from '../controllers/restaurant-controller.js'

const restaurantRouter = express.Router()

restaurantRouter.get(
  '/get-users-like-restaurant',
  checkResId,
  getUsersLikeRestaurant
)

restaurantRouter.get(
  '/get-users-rate-restaurant',
  checkResId,
  getUsersRateRestaurant
)

export default restaurantRouter
