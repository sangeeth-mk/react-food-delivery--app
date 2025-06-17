import express from 'express'
import cartControllers from '../controllers/cartControllers.js'
import authMiddleware  from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post("/get",authMiddleware,cartControllers.getCart)
cartRouter.post("/add",authMiddleware,cartControllers.addToCart)
cartRouter.post("/remove",authMiddleware,cartControllers.removeFromCart)

export default cartRouter;