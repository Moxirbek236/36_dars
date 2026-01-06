import customerService from "../services/customers.service.js";
class CustomersController {
  constructor() {}

  async getAllCustomers(req, res) {
    const Customers = await (await customerService.getAllCustomers()).rows;
    res.status(200).json({
      status: 200,
      message: "Query OK",
      data: Customers,
    });
  }
  async customerCreate(req, res) {
    const data = await customerService.customerCreate(req.body);
    if (data.customerID != undefined) {
        res.status(200).json({
          status: 200,
          message: "Query OK",
          customerID: data.customerID
        });
    } else {
        res.status(400).json({
          status: 200,
          message: "ERROR: ID yaratilmadi",
        });
    }
  }
  async deletecustomer(req, res) {
    const data = await customerService.deletecustomer(req.params.id);
    res.status(data.status).json({
      status: data.status,
      message: data.message,
    });
  }
  async updatecustomer(req, res) {
    const data = await customerService.updatecustomer(req.params.id, req.body);
    res.status(data.status).json({
      status: data.status,
      message: data.message,
      updatedcustomer: data.updatedcustomer,
    });
  }
}

const customerController = new CustomersController();

export default customerController;
