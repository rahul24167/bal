import express, { Request, Response} from 'express';
const router = express.Router();
import zod from 'zod';
import {User} from '../db/db';
import { sendOtp, verifyOtp } from './otpVerifier';


const signupBody = zod.object({
    username: zod
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,15}$/, "Username must contain at least one letter, one number, and be up to 15 characters long.")
    .max(15, "Username must not exceed 15 characters."),
    email: zod.string().email()
})
router.post("/signup", async (req: Request, res: Response ) => {
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Invalid username or email"
        })
       
    }
    const existingUser1 = await User.findOne({
        email: req.body.email
    })
    if(existingUser1){
        res.status(411).json({
            message: "Email already exists, use another email"
        })
    }
    const existingUser2 = await User.findOne({
        username: req.body.username
    })
    if(existingUser2){
        res.status(411).json({
            message: "Username already exists, use another username"
        })
    }
    //verify email by otp
    const otpResult = await sendOtp(req.body.email);
    if (!otpResult.success) {
        res.status(500).json({ message: otpResult.message });
    }

    // Send a success response indicating that the OTP has been sent
    res.status(200).json({
        message: "OTP sent successfully to your email. Please verify to complete signup."
    });
    
    

    const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        verifacationStatus: false
    })

    
})


router.post("/signin", async (req,res )=>{
    
})

router.post("/verify-otp", async (req:Request, res:Response )=> {
    
    // Verify the OTP
    const verificationResult = await verifyOtp(req.body.email, req.body.otp);
    if (!verificationResult.success) {
        res.status(400).json({ message: verificationResult.message });
    }
    const existingUser = await User.findOne({
        email: req.body.email
    })
    if(!existingUser?.verificationStatus){
        const user = await User.findOneAndUpdate(
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
        res.status(201).json({
            message: "Email verifation successfully",   
        });

    }


    //jwttoken
   

    

    res.status(201).json({
        message: "User created successfully",
        user: { email: req.body.email, username: req.body.username } // Return the created user info
    });
    
    if(!existingUser?.verificationStatus){

        const user = await User.create({ 
            email: req.body.email,
            username: req.body.username });
    
        res.status(201).json({
            message: "User created successfully",
            user: { email: user.email, username: user.username } // Return the created user info
        });
    }
});

export default router;