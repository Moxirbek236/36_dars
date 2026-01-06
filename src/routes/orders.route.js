import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";
import validateorders from "../middleware/validation.orders.js";

const router = Router()
router.get('/orders', ordersController.getAllorders)
router.post('/orders', validateorders, ordersController.orderCreate)
router.delete('/orders/:id', ordersController.deleteorder)
router.put('/orders/:id', validateorders, ordersController.updateorder)
export default router