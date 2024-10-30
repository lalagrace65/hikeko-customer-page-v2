
import { Package } from "@/models/Package";


// Fetch packages by trailId
export async function GET(req) {
  const url = new URL(req.url); // Create a URL object
  const trailId = url.searchParams.get("trailId"); // Extract trailId from query parameters
  
  try {
    // Fetch packages where trailId matches the parameter
    const packages = await Package.find({ trailId });
    return Response.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return Response.json({ error: "Error fetching packages" }, { status: 500 });
  }
}
