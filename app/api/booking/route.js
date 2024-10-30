import { Booking } from "@/models/Booking";
import { NextResponse } from 'next/server';
import mongoose from "mongoose";

export async function POST(req) {
  try {
    // Ensure the MongoDB connection is established
    mongoose.connect(process.env.MONGODB_URI);

    // Parse the request body
    const {
      joinerName,
      email,
      contactNumber,
      pickupLocation,
      age,
      sex,
      homeAddress,
      emergencyContactPerson,
      emergencyContactNumber,
      medicalCondition,
      conditionDetails,
      proofOfPayment,
      termsAccepted,
      trailId,
      packageId,
      
    } = await req.json();
    
    
    const booking = await Booking.create({
        joinerName,
        email,
        contactNumber,
        pickupLocation,
        age,
        sex,
        homeAddress,
        emergencyContactPerson,
        emergencyContactNumber,
        medicalCondition,
        conditionDetails,
        proofOfPayment,
        termsAccepted,
        trailId,
        packageId,
      
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
