// /api/login/route.js
import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    
    const token = jwt.sign(tokenData, process.env.SECRET, { expiresIn: "1h" });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set the cookie using NextResponse
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      maxAge: 60 * 60, // 1 hour
      path: '/', // cookie path
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
