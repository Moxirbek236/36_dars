import pool from "../database/config.js";

class SmartQueryController {
    async getSmartQuery(req, res) {
        try {
            const result = await pool.query(`
                SELECT 
                  o.id AS order_id,
                  c.customer_name,
                  ca.car_name,
                  o.month,
                  o.end_date,
                  o.total_amount,
                  SUM(p.payment_amount) AS total_paid,
                  (o.total_amount - SUM(p.payment_amount)) AS outstanding_debt
                FROM "Orders" o
                JOIN "Customers" c ON o.customer_id = c.id
                JOIN "Cars" ca ON o.car_id = ca.id
                LEFT JOIN "Payments" p ON o.id = p.order_id
                GROUP BY o.id, c.customer_name, ca.car_name, o.month, o.end_date, o.total_amount
                HAVING (o.total_amount - SUM(p.payment_amount)) > 0;
            `);
            res.send(JSON.stringify(result.rows, null, 4));
        } catch (error) {
            console.error("Error executing smart query:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

const smartQueryController = new SmartQueryController();
export default smartQueryController;