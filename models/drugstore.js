const { Schema, model } = require("mongoose");

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const drugstoreSchema = new Schema({
  pharmacy: {
    type: String,
    required: [true, "Set name for pharmacy"],
  },
  medicines: {
    type: [medicineSchema],
    required: true,
  },
});

const Drugstore = model("drugstore", drugstoreSchema);

module.exports = Drugstore;
