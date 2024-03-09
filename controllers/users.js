const { User } = require("../models/user");

const { ctrlWrapper } = require("../helpers");

const newOrder = async (req, res) => {
  const { name, email, phone, address, totalPrice, orderedMedicines } =
    req.body;
  const newOrder = await User.create({
    name,
    email,
    phone,
    address,
    totalPrice,
    orderedMedicines,
  });
  res.status(201).json(newOrder);
};

module.exports = {
  newOrder: ctrlWrapper(newOrder),
};