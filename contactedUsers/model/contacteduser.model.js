const mongoose = require("../../common/services/mongoose.service").mongoose;

let { Schema } = mongoose;
const opts = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
};

let contactedUserSchema = new Schema(
  {
    email: String,
    name: String,
    message: String,
  },
  opts
);

let ContactedUser = mongoose.model("contacteduser", contactedUserSchema);

exports.saveContactedUser = (userData) => {
  const contactedUser = new ContactedUser(userData);
  return contactedUser.save();
};
