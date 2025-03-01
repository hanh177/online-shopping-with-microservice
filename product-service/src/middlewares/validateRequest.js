const { BadRequest } = require("../core/errorResponse");

const validate = (schema) => (req, res, next) => {
  const dataToValidate = req.method === "GET" ? req.query : req.body;
  const { error } = schema.validate(dataToValidate, { abortEarly: false });

  if (error) {
    const details = error.details.map((err) => err.message);
    return next(BadRequest(details.join(", ")));
  }

  next();
};

module.exports = validate;
