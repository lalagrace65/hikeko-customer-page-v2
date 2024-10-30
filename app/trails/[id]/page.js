'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function TrailDetail({ params }) {
  const { id } = params; // Get the ID from the dynamic params
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const router = useRouter();

  // Function to fetch packages based on the trail ID
  const fetchPackages = async (trailId) => {
    setLoadingPackages(true); // Set loading state
    try {
      const response = await fetch(`/api/package?trailId=${trailId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched packages:', data); // Log the fetched packages
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoadingPackages(false); // Reset loading state
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`/api/trails/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setTrail(data);
          setLoading(false);
          // Fetch packages associated with the trail
          fetchPackages(id);
        })
        .catch((error) => {
          console.error('Error fetching trail data:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading trail details...</p>;
  }

  if (!trail) {
    return <p>Trail not found.</p>;
  }

  return (
    <div className="p-4">
      {/* Full-width Image */}
      <h1 className="text-2xl font-bold mb-4">{trail.title}</h1>
      <img
        src={trail.trailImages[0]}
        alt={trail.title}
        className="w-full h-64 object-cover my-4"
      />
      
      {/* Two-column layout for trail details and description */}
      <div className="lg:flex lg:gap-2">
        {/* Left Column: Trail Details */}
        <div className="lg:w-1/3">
          <p><strong>Trail Class:</strong> {trail.trailClass}</p>
          <p><strong>Difficulty Level:</strong> {trail.difficultyLevel}</p>
          <p><strong>Elevation:</strong> {trail.elevation} masl</p>
          <p><strong>Location:</strong> {trail.trailLocation}</p>
          <p><strong>Coordinates:</strong> {trail.coordinates.lat}, {trail.coordinates.lng}</p>
          <p><strong>Features:</strong> {trail.features}</p>
        </div>

        {/* Right Column: Description */}
        <div className="lg:w-2/3 mt-4 lg:mt-0">
          <h2 className="text-xl font-semibold mb-4">Trail Description</h2>
          <p className="text-justify">{trail.description}</p>
        </div>
      </div>

      {/* Packages */}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Create Packages</h2>
        {loadingPackages ? (
          <p>Loading packages...</p>
        ) : packages.length > 0 ? (
          <ul className="space-y-4">
            {packages.map((pkg) => (
              <li key={pkg._id} className="p-4 border rounded">
                <h3 className="font-bold">{pkg.eventname}</h3>
                <p><strong>Price:</strong> {pkg.price}</p>
                <p><strong>Inclusions:</strong> {pkg.packageinclusions}</p>
                <p><strong>Exclusions:</strong> {pkg.exclusions}</p>
                <p><strong>Payment Info:</strong> {pkg.paymentInfo}</p>
                <Button onClick={() => router.push(`/booking/${pkg._id}`)} >Book</Button>
              </li>
                
            ))}
          </ul>
        ) : (
          <p>No packages found for this trail.</p>
        )}
      </div>
    </div>
  );
}
