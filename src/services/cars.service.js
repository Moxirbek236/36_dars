import pool from "../database/config.js";

class CarService {
  constructor() {}

  async getAllCars() {
    let data = await pool.query('SELECT * FROM "Cars"');
    return data;
  }

  async carCreate(data) {
    const { name, price, year } = data;

    let temp = await pool.query(
      'insert into "Cars" (car_name, price, year) VALUES ($1, $2, $3) RETURNING *',
      [name, price, year]
    );
    return { status: 201, message: "query ok", carID: temp.rows[0].id };
  }

  async deleteCar(id) {
    let status, message;
    if (!id || isNaN(id) || id <= 0) {
      status = 400;
      message = "Invalid ID";
    } else if (
      !(await pool.query('SELECT * FROM "Cars" WHERE id=$1', [id])).rowCount
    ) {
      status = 404;
      message = "Car not found";
    } else {
      status = 200;
      message = `Car deleted successfully with ID: ${id}`;
      await pool.query('DELETE FROM "Cars" WHERE id=$1', [id]);
    }

    return { status, message };
  }

  async updateCar(id, data) {
    try {
      if (!id || isNaN(id) || id <= 0) {
        return { status: 400, message: "Invalid ID" };
      } else if (
        !(await pool.query('SELECT * FROM "Cars" WHERE id=$1', [id])).rowCount
      ) {
        return { status: 404, message: "Car not found" };
      }
      const { name, price, year } = data;
      let temp = await pool.query(
        'UPDATE "Cars" SET car_name=$1, price=$2, year=$3 WHERE id=$4 RETURNING *',
        [name, price, year, id]
      );
      return { status: 200, message: "query ok", updatedCar: temp.rows[0] };
    } catch (error) {
      return { status: 400, message: "Internal Server Error" };
    }
  }
}

const carservice = new CarService();

export default carservice;
