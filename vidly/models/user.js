const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model("User", new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
  }));

function validateUser(user) {
    return Joi.validate(user, {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().min(5).max(255).required()
      });
}

module.exports = {
    User,
    validate: validateUser
}