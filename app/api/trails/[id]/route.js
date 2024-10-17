import mongoose from 'mongoose';
import { Trails } from '@/models';

export async function GET(req, { params }) {
  const { id } = params; // Get the trail ID from the route parameters

  try {
    // Ensure the database connection is established
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const trail = await Trails.findById(id); // Fetch trail by ID

    if (!trail) {
      return new Response(JSON.stringify({ error: 'Trail not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(trail), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching trail:', error); // Log the error for debugging
    return new Response(JSON.stringify({ error: 'Error fetching trail' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
