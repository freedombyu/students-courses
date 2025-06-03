// Validation middleware generator
module.exports = function validate(validatorFn) {
  return (req, res, next) => {
    const errors = validatorFn(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });
    next();
  };
};