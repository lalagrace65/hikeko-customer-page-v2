// /api/register.js
import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const body = await req.json();
    const { email, password } = body;

    if (!password || password.length < 5) {
      return new Response(JSON.stringify({ error: 'Password must be at least 5 characters' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(password, salt);

    const createdUser = await User.create(body);
    return new Response(JSON.stringify({ message: "User created successfully", user: createdUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
