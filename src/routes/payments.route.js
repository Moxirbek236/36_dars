import { Router } from "express";
import paymentsController from "../controllers/payments.controller.js";
import validatepayments from "../middleware/validation.payments.js";

const router = Router()
router.get('/payments', paymentsController.getAllPayments)
router.post('/payments', validatepayments, paymentsController.createPayment)
export default router