import Joi from "joi";

class Validations {
  validateCar(data) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(30).required(),
      year: Joi.number()
        .integer()
        .min(2020)
        .max(new Date().getFullYear())
        .required(),
      price: Joi.number().positive().required(),
    });

    return schema.validate(data);
  }

  validateCustomer(data) {
    const schema = Joi.object({
      customer_name: Joi.string().min(1).max(50).required(),
      phone_number: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required(),
      address: Joi.string().min(5).max(100).required(),
      passport_seriya: Joi.string().alphanum().length(2).required(),
      passport_number: Joi.number().required(),
    });

    return schema.validate(data);
  }

  validateOrders(data) {
    const schema = Joi.object({
      car_id: Joi.number().integer().positive().required(),
      customer_id: Joi.number().integer().positive().required(),
      start_date: Joi.string().required(),
      end_date: Joi.string().required(),
      month: Joi.number().integer().valid(1, 3, 6).required(),
      amount: Joi.number().positive().required(),
    });

    return schema.validate(data);
  }

  validatePayment(data) {
    const schema = Joi.object({
      order_id: Joi.number().integer().positive().required(),
      payment_amount: Joi.number().positive().required(),
    });
    return schema.validate(data);
  }
}

export default new Validations();
