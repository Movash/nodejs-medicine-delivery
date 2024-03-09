const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const orderSchema = new Schema({
  medicine: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
  },
  orderedMedicines: {
    type: [orderSchema],
    required: true,
  },
});

userSchema.post("save", handleMongooseError);

const orderJoiSchema = Joi.object({
  medicine: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailPattern).required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  totalPrice: Joi.number().required(),
  orderedMedicines: Joi.array().items(orderJoiSchema).required(),
});

const schemas = {
  addSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
