import express, { Request, Response, NextFunction} from 'express';
const router = express.Router();
import zod from 'zod';
import {User} from '../db/db';
import { sendOtp, verifyOtp } from './functions/otpVerifier';
import * as jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET
import { signupBody, signinBody} from '@rahul24167/bal-common';

//signup
router.post("/signup", async (req: Request, res: Response ):Promise<any>=> {
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Invalid username or email"
        })   
    }
    const existingUser1 = await User.findOne({
        email: req.body.email
    })
    if(existingUser1){
        return res.status(411).json({
            message: "Email already exists, use another email"
        })
    }
    const existingUser2 = await User.findOne({
        username: req.body.username
    })
    if(existingUser2){
        return res.status(411).json({
            message: "Username already exists, use another username"
        });
        
    }
    const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        verifacationStatus: false
    });
    const userId = user?._id;
    const token= jwt.sign({
        userId
    },
    JWT_SECRET as string);
    res.json({
        message:"Signup succssful",
        token: token
    });
    return;
});
//signin
router.post("/signin", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {success} = signinBody.safeParse(req.body);
    if(!success) {
        return res.status(401).json({
            message: "Invalid email"
        })
    }
    const existingUser = await User.findOne({
        email: req.body.email
    })
    if(!existingUser){
        return res.status(401).json({
            message: "User not found. Please SignUp first"
        })
    }
    if(!(existingUser.password==req.body.password)){
        return res.status(401).json({
            message: "wrong password"
        });
    }
    const userId = existingUser?._id;
    const token= jwt.sign({
        userId
    },
    JWT_SECRET as string);
    res.json({
        message:"Signin succssful",
        token: token
    });
    return;
});
// router.post("/verify-otp", async (req:Request, res:Response ):Promise<any>=> {  
//     // Verify the OTP
//     const verificationResult = await verifyOtp(req.body.email, req.body.otp);
//     if (!verificationResult.success) {
//         return res.status(400).json({ message: verificationResult.message });
//     }
//     const existingUser = await User.findOne({
//         email: req.body.email
//     })
    
//     let message= "Signin Completed successfully";
//     if(!existingUser?.verificationStatus){
//         //signup
//         const existingUser = await User.findOneAndUpdate(
//             {
//                 email: req.body.email
//             },
//             {
//                 verifacationStatus: true
//             },
//             {
//                 new:true
//             }
//         )
//         message = "Signup Completed successfully";
//     }
//     //jwttoken
//     const userId = existingUser?._id;
//     const token= jwt.sign({
//         userId
//     },
//     JWT_SECRET as string)
//     res.json({
//         message: message,
//         token: token
//     })
// });
export default router;