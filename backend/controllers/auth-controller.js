import {User} from '../models/user-model.js'
import { compare } from 'bcrypt';
export const home = async (req, res) => {
  try {
    res.status(200).send("Server started");
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, phone, email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    const userCreated = await User.create({
      username,
      phone,
      email,
      password,
    });
    res.status(200).json({
      msg: "userCreated successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    //res.status(500).json("error");
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    //console.log(userExist);
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await compare(password, userExist.password);
    console.log(user);
    if (user) {
      console.log(user);
        res.status(200).json({
        msg: "Login successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      next(error);
    }
  } catch (error) {
        console.log;(error);
  }
};
export const user = async (req, res, next) =>{
  try {
    const userData = req.user;
   // console.log(userData);
    res.status(200).json({userData})
  } catch (error) {
    console.log(`"error form user route ${error}"`);
  }
};