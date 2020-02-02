const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    isGold: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 11
    }
  });

  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean(),
      phone: Joi.string().min(10).max(11)
    };
  
    return Joi.validate(customer, schema);
  }
  
  const Customer = mongoose.model("Customer", customerSchema);

  module.exports = {
    Customer,
    validate: validateCustomer
  };