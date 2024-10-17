import mongoose from "mongoose";
import { Trails } from "@/models";
import { NextResponse } from 'next/server';

export async function GET() {
  mongoose.connect(process.env.MONGODB_URI);
  const trailData = await Trails.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  console.log('Fetched trail data:', trailData);
  return NextResponse.json(trailData);
}