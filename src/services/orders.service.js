import pool from "../database/config.js";

class Orderservice {
  constructor() {}

  async getAllOrders() {
    let data = await pool.query('SELECT * FROM "Orders"');
    return data;
  }

  async ordersCreate(data) {
    const { car_id, customer_id, month, start_date, end_date, amount } = data;

    const join_datas = await pool.query(
      'SELECT c.price FROM "Cars" c WHERE c.id=$1',
      [car_id]
    );

    let price = +join_datas.rows[0].price;

    if (amount >= price * 0.2) {

        
        let temp = await pool.query(
            'insert into "Orders" (car_id, customer_id, month, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [car_id, customer_id, month, start_date, end_date]
        );

        let id = temp.rows[0].id
        
        pool.query(
            'insert into "Payments" (order_id, payment_amount) VALUES ($1, $2) RETURNING *',
            [id, amount]
        );
        return { status: 201, message: "query ok", ordersID: id };
    } else {
        return { status: 400, message: "kam tolov qildingiz, iltimos 20 % to'lang" };
    }
}

  async deleteorders(id) {
    try {
      let status, message;
      if (!id || isNaN(id) || id <= 0) {
        status = 400;
        message = "Invalid ID";
      } else if (
        !(await pool.query('SELECT * FROM "Orders" WHERE id=$1', [id]))
          .rowCount
      ) {
        status = 404;
        message = "orders not found";
      } else {
        status = 200;
        message = `orders deleted successfully with ID: ${id}`;
      }
      console.log(status);

      let data = await pool.query('DELETE FROM "Orders" WHERE id=$1', [id]);
      return { status, message };
    } catch (error) {
      return { status: 400, message: "Internal Server Error" };
    }
  }

  async updateorders(id, data) {
    try {
      if (!id || isNaN(id) || id <= 0) {
        return { status: 400, message: "Invalid ID" };
      } else if (
        !(await pool.query('SELECT * FROM "Orders" WHERE id=$1', [id]))
          .rowCount
      ) {
        return { status: 404, message: "orders not found" };
      }
      const { name, customer_id, month, start_date, end_date } = data;
      let temp = await pool.query(
        'UPDATE "Orders" SET car_id=$1, customer_id=$2, month=$3, start_date=$4, end_date=$5 WHERE id=$6 RETURNING *',
        [name, customer_id, month, start_date, end_date, id]
      );
      return {
        status: 200,
        message: "query ok",
        updatedorders: temp.rows[0],
      };
    } catch (error) {
      return { status: 400, message: "Internal Server Error" };
    }
  }
}

const orderservice = new Orderservice();

export default orderservice;
