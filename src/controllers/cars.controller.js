import { log } from "console";
import carservice from "../services/cars.service.js";

class CarsController {
  constructor() {}

  async getAllCars(req, res) {
    const cars = await (await carservice.getAllCars()).rows;
    res.status(200).json({
      status: 200,
      message: "Query OK",
      data: cars,
    });
  }
  async carCreate(req, res) {
    const data = await carservice.carCreate(req.body);
    if (data.carID != undefined) {
        res.status(200).json({
          status: 200,
          message: "Query OK",
          carID: data.carID
        });
    } else {
        res.status(400).json({
          status: 200,
          message: "ERROR: ID yaratilmadi",
        });
    }
  }
  async deleteCar(req, res) {
    const data = await carservice.deleteCar(req.params.id);
    res.status(data.status).json({
      status: data.status,
      message: data.message,
    });
  }
  async updateCar(req, res) {
    const data = await carservice.updateCar(req.params.id, req.body);
    res.status(data.status).json({
      status: data.status,
      message: data.message,
      updatedCar: data.updatedCar,
    });
  }
}

const CarController = new CarsController();

export default CarController;
