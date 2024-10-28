import { Package } from "@/models/Package";

// Fetch a specific package by ID
export async function GET(req, { params }) {
  const { id } = params; // Get the package ID from the route parameters

  try {
    const packageData = await Package.findById(id); // Fetch package by ID
    if (!packageData) {
      return Response.json({ error: "Package not found" }, { status: 404 });
    }
    return Response.json(packageData);
  } catch (error) {
    console.error("Error fetching package:", error);
    return Response.json({ error: "Error fetching package" }, { status: 500 });
  }
}
