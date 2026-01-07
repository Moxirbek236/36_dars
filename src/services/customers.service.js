import pool from "../database/config.js";

class Customerservice {
  constructor() {}

  async getAllCustomers() {
    let data = await pool.query('SELECT * FROM "Customers"');
    return data;
  }

  async customerCreate(data) {
    const {
      customer_name,
      phone_number,
      address,
      passport_seriya,
      passport_number,
    } = data;

    let temp = await pool.query(
      'insert into "Customers" (customer_name, phone_number, address, passport_seriya, passport_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [customer_name, phone_number, address, passport_seriya, passport_number]
    );
    return { status: 201, message: "query ok", customerID: temp.rows[0].id };
  }

  async deleteCustomer(id) {
      let status, message;
      if (!id || isNaN(id) || id <= 0) {
        status = 400;
        message = "Invalid ID";
      } else {
        status = 200;
        message = `customer deleted successfully with ID: ${id}`;
      }
      await pool.query('DELETE FROM "Customers" WHERE id=$1', [id]);

      return { status, message };
    } 

  async updatecustomer(id, data) {
    try {
      if (!id || isNaN(id) || id <= 0) {
        return { status: 400, message: "Invalid ID" };
      } else if (
        !(await pool.query('SELECT * FROM "Customers" WHERE id=$1', [id]))
          .rowCount
      ) {
        return { status: 404, message: "customer not found" };
      }
      const { name, phone_number, address } = data;
      let temp = await pool.query(
        'UPDATE "Customers" SET customer_name=$1, phone_number=$2, address=$3 WHERE id=$4 RETURNING *',
        [name, phone_number, address, id]
      );
      return {
        status: 200,
        message: "query ok",
        updatedcustomer: temp.rows[0],
      };
    } catch (error) {
      return { status: 400, message: "Internal Server Error" };
    }
  }
}

const customerservice = new Customerservice();

export default customerservice;
