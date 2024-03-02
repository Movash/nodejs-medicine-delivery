const Drugstore = require("../models/drugstore");

const { ctrlWrapper } = require("../helpers");

const allDrugstores = async (req, res) => {
  const allDrugstores = await Drugstore.find();
  res.json(allDrugstores);
};

module.exports = {
  allDrugstores: ctrlWrapper(allDrugstores),
};
