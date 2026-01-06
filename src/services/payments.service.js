import pool from "../database/config.js";

class PaymentService {
  constructor() {}
    async getAllPayments() {
    let data = await pool.query('SELECT * FROM "Payments"');
    return data;
  }
    async paymentCreate(data) {
    const { order_id, payment_amount } = data;

    let temp = await pool.query(
        'insert into "Payments" (order_id, payment_amount) VALUES ($1, $2) RETURNING *',
        [order_id, payment_amount]
    );
    return { status: 201, message: "query ok", paymentID: temp.rows[0].id };
    }
}

const paymentService = new PaymentService();
export default paymentService;