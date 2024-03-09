const { httpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(req.body)
      next(httpError(400, "missing required name field"));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
