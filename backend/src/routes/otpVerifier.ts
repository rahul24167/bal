import nodemailer from 'nodemailer';
import crypto from 'crypto';

import {OtpStore} from '../db/db';

export const sendOtp = async (email: string) => {
    // 1. Generate a random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);
  
    // 2. Store the OTP temporarily (in-memory for now)
     await OtpStore.create({
      email: email,
      otp: otp,
      createdAt: Date.now() 
     });
  
    // 3. Set up nodemailer to send the OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Email Verification',
      text: `Your OTP for email verification is ${otp}. It is valid for 10 minutes.`,
    };
  
    // 4. Send email and return status
    try {
      await transporter.sendMail(mailOptions);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      console.error('Error sending OTP: ', error);
      return { success: false, message: 'Failed to send OTP' };
    }
};
  
  // Helper to verify OTP
export const verifyOtp = async (email: string, otp: number) => {
    const storedOtpData = await OtpStore.findOne({
        email: email
    });
  
    if (!storedOtpData) {
      return { success: false, message: 'OTP expired or invalid' };
    }

    const { otp: storedOtp, createdAt } = storedOtpData; // Correctly destructuring the stored OTP
    const timeElapsed = Date.now() - new Date(createdAt).getTime();
  
    // Check if the OTP is valid and within the 10-minute expiration window
    if (parseInt(otp.toString(), 10) !== storedOtp) {
      return { success: false, message: 'Invalid OTP' };
    } else if (timeElapsed > 10 * 60 * 1000) { // 10 minutes
      await OtpStore.deleteOne({email}); // Remove expired OTP
      return { success: false, message: 'OTP expired' };
    }
  
    // OTP is valid
    await OtpStore.deleteOne({email}); // Optionally clear OTP after validation
    return { success: true };
};
  