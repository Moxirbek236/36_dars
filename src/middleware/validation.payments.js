import validate from "../utils/validation.js";

export default async (req, res, next) => {
  if (req.method === "POST" && req.url.includes("/payments")) {
    const { error } = await validate.validatePayment(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
  }
  next();
};
