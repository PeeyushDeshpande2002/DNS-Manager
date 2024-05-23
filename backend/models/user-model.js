import mongoose from "mongoose";
import pkg from "jsonwebtoken";
import { compare, genSalt, hash } from "bcrypt";
// import * as bcrypt from 'bcrypt';

const {sign} = pkg;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  }, 
},
{
  timestamps : true,
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await genSalt(10);
    const hash_password = await hash(user.password, saltRound);
    console.log(hash_password);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateToken = function () {
  const user = this;
  try {
    return sign(
      { userId: user._id.toString(), email: user.email, isAdmin: user.isAdmin },
      'Peeyush',
      // {
      //   expiresIn: "30d",
      // }
    );
  } catch (error) {
    console.error(error);
  }
};

export const User = new mongoose.model("User", userSchema);

