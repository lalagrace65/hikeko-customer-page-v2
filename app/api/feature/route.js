import mongoose from "mongoose";
import { Feature } from "@/models/Feature";
import { NextResponse } from 'next/server';

export async function GET() {
  
    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URI);

    // Fetch the specific feature by ID
    const featuredProductId = '66c9e7dcc26604328135007d'; // Replace with your actual feature ID
    const feature = await Feature.findById(featuredProductId);

    // Log feature data for debugging
    console.log('Fetched feature data:', feature);

    // Return the feature data as JSON
    return NextResponse.json(feature);
  
}
