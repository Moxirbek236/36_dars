import { Router } from "express";
import CarController from "../controllers/cars.controller.js";
import validateCar from "../middleware/validation.cars.js";
const router = Router()
router.get('/cars', CarController.getAllCars)
router.post('/cars', validateCar, CarController.carCreate)
router.delete('/cars/:id', CarController.deleteCar)
router.put('/cars/:id', validateCar, CarController.updateCar)
export default router