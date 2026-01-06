import { Router } from "express";
import customerController from "../controllers/customers.controller.js";
import validatecustomer from "../middleware/validation.customers.js";

const router = Router()
router.get('/customers', customerController.getAllCustomers)
router.post('/customers', validatecustomer, customerController.customerCreate)
router.delete('/customers/:id', customerController.deletecustomer)
router.put('/customers/:id', validatecustomer, customerController.updatecustomer)
export default router