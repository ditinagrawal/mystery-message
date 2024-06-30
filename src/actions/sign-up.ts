"use server"
import connectDB from "@/db/dbConnect";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/resend/send-verification-email";

export const signUp = async (
    username: string,
    email: string,
    password: string
) => {
    await connectDB();
    try {
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "User already exists",
            }, { status: 400 })
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({
            email
        })
        if (existingUserVerifiedByEmail) {
            if (existingUserVerifiedByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists",
                }, { status: 400 })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1);
                const code = Math.floor(100000 + Math.random() * 900000).toString();
                existingUserVerifiedByEmail.password = hashedPassword;
                existingUserVerifiedByEmail.verifyCode = code;
                existingUserVerifiedByEmail.verifyCodeExpiry = expiryDate;
                await existingUserVerifiedByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: code,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save();
            const emailResponse = await sendVerificationEmail(email, username, code);
            if (!emailResponse.success) {
                return Response.json({
                    success: false,
                    message: emailResponse.message,
                }, { status: 500 })
            }
            return Response.json({
                success: true,
                message: "User registered successfully. Please verify your Email",
            }, { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: "Failed to sign up",
        }, { status: 500 })
    }
}