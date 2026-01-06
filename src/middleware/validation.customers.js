import validate from "../utils/validation.js";
export default async (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" && req.url.includes("/customers")) {
  const { error } = await validate.validateCustomer(req.body);
  if (error) {    
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
    next();
  }
  next();
};