import {User} from '../models/user-model.js'
import pkg from "jsonwebtoken";


const {verify} = pkg;
export const authMiddleware = async(req, res, next) =>{
    const token = req.header('Authorization');
    
    if(!token){
        return res.status(401).json({
            msg: "Erorr"
        })
    }
    
    var jwtToken = token.replace("Bearer", "").trim();
    //console.log(jwtToken);
    
    try {
        const isVerified = verify(jwtToken, 'Peeyush');
        //console.log(isVerified, "User Verified");

        const userData = await User.findOne({email : isVerified.email}).select({
            password : 0,
        });
      //console.log(userData);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        req.username = userData.username
        //console.log(req.username);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
    
};

