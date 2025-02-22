const { BadRequest } = require("../../core/errorResponse");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const details = error.details.map((err) => err.message);
    return next(BadRequest(details.join(", ")));
  }

  next();
};

module.exports = validate;
