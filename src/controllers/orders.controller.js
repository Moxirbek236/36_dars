import orderService from "../services/orders.service.js";
class OrdersController {
  constructor() {}

  async getAllorders(req, res) {
    const orders = await (await orderService.getAllorders()).rows;
    res.status(200).json({
      status: 200,
      message: "Query OK",
      data: orders,
    });
  }

  async orderCreate(req, res) {
    const data = await orderService.ordersCreate(req.body);
    console.log(data);
    
    if (data != undefined) {
        res.status(data.status).json({
          status: data.status,
          message: data.message,
          // orderID: data.ordersID
        });
    } else {
        res.status(400).json({
          status: 200,
          message: "ERROR: ID yaratilmadi",
        });
    }
  }

  async deleteorder(req, res) {
    const data = await orderService.deleteorders(req.params.id);
    res.status(data.status).json({
      status: data.status,
      message: data.message,
    });
  }

  async updateorder(req, res) {
    const data = await orderService.updateorders(req.params.id, req.body);
    res.status(data.status).json({
      status: data.status,
      message: data.message,
      updatedorder: data.updatedorder,
    });
  }
}

const orderController = new OrdersController();

export default orderController;
