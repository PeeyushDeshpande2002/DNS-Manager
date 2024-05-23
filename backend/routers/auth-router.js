import express from 'express'; 
const authRouter = express.Router();
import {home, register, login, user} from '../controllers/auth-controller.js'
import {loginSchema,signupSchema} from "../validators/auth-validators.js";
import  {validate} from "../middleware/validate-middleware.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

authRouter.route("/").get(home);
authRouter.route("/register").post(validate(signupSchema), register);
authRouter.route("/login").post(validate(loginSchema), login);
authRouter.route("/user").get(authMiddleware, user);

export default authRouter;