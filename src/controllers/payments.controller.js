import paymentService from "../services/payments.service.js";

class PaymentsController {
  constructor() {}
  async getAllPayments(req, res) {
    try {
      const payments = await paymentService.getAllPayments();
      return res.status(200).json({
        status: 200,
        message: "query ok",
        data: payments.rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
  async createPayment(req, res) {
    try {
      const data = await paymentService.paymentCreate(req.body);
      return res.status(data.status).json({
        status: data.status,
        message: data.message,
        paymentID: data.paymentID,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

const paymentController = new PaymentsController();
export default paymentController;
