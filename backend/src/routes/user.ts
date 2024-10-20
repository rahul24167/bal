import express, { Request, Response, NextFunction} from 'express';
const router = express.Router();
import zod from 'zod';
import {User} from '../db/db';
import { sendOtp, verifyOtp } from './otpVerifier';
import * as jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET

//signup
const signupBody = zod.object({
    username: zod
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,15}$/, "Username must contain at least one letter, one number, and be up to 15 characters long.")
    .max(15, "Username must not exceed 15 characters."),
    email: zod.string().email()
})
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
        })
    }
    //verify email by otp
    const otpResult = await sendOtp(req.body.email);
    if (!otpResult.success) {
        return res.status(500).json({ message: otpResult.message });
    }
    const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        verifacationStatus: false
    })
    // Send a success response indicating that the OTP has been sent
    return res.json({
        message: "OTP sent successfully to your email. Please verify to complete signup."
    });
});
//signin
const signinBody = zod.object({
    email: zod.string().email()
})
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
    //verify email by otp
    const otpResult = await sendOtp(req.body.email);
    if (!otpResult.success) {
        return res.status(500).json({ message: otpResult.message });
    }
    // Send a success response indicating that the OTP has been sent
    return res.json({
        message: "OTP sent successfully to your email. Please verify to complete signup."
    });    
});
router.post("/verify-otp", async (req:Request, res:Response ):Promise<any>=> {  
    // Verify the OTP
    const verificationResult = await verifyOtp(req.body.email, req.body.otp);
    if (!verificationResult.success) {
        return res.status(400).json({ message: verificationResult.message });
    }
    const existingUser = await User.findOne({
        email: req.body.email
    })
    let message= "Signin Completed successfully";
    if(!existingUser?.verificationStatus){
        //signup
        const existingUser = await User.findOneAndUpdate(
            {
                email: req.body.email
            },
            {
                verifacationStatus: true
            },
            {
                new:true
            }
        )
        message = "Signup Completed successfully";
    }
    //jwttoken
    const userId = existingUser?._id;
    const token= jwt.sign({
        userId
    },
    JWT_SECRET as string)
    res.json({
        message: message,
        token: token
    })
});
export default router;