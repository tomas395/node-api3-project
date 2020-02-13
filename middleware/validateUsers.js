function validateUser(req, res, next) {
  const { body } = req;
  if (!body) {
    status(400).json({ message: "Missing user data." });
  } else if (!body.name) {
    status(400).json({ message: "Missing required name field." });
  } else {
    next();
  }
}

module.exports = validateUser;
