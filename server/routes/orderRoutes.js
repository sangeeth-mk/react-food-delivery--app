import express from 'express';
import authMiddleware from '../middleware/auth.js';
import orderControllers from '../controllers/orderControllers.js';

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,orderControllers.placeOrder)

orderRouter.post("/verify",orderControllers.verifyOrder)

orderRouter.post("/userorders",authMiddleware,orderControllers.userOrders)

orderRouter.get("/list",orderControllers.listOrders)

orderRouter.post("/status",orderControllers.updateStatus)

export default orderRouter;