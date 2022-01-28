const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    enc_passwd: {
      type: String,
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      default: "USER",
    }
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual("password")
  .set(function (pwd) {
    this._password = pwd;
    this.salt = uuidv4();
    this.enc_passwd = this.hashedPassword(pwd);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (password) {
    return this.hashedPassword(password) === this.enc_passwd;
  },
  hashedPassword: function (password) {
    this.salt = this.salt ? this.salt : uuidv4();
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = User = mongoose.model("users", userSchema);