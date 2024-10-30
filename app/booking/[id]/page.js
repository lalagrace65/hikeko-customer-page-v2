'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Center from '@/components/layout/Center';
import { JoinerDetailsForm } from '@/components/forms/JoinerDetails';
export default function BookingPage({ params }) {
  const { id } = params; // Get the package ID from dynamic params
  const [pkg, setPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailId, setTrailId] = useState(null); 
  useEffect(() => {
    if (id) {
      // Fetch the specific package by ID
      fetch(`/api/package/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setPackage(data); // Set the fetched package data
          setTrailId(data.trailId);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching package data:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading package details...</p>;
  }

  if (!pkg) {
    return <p>Package not found.</p>;
  }

  return (
    <Center>
      <div className="container mx-auto p-4">
        {/* Header Section with Back Button */}
        <div className="flex items-center mb-4">
          {/* Using window.history.back() for back navigation */}
          <button onClick={() => window.history.back()} className="text-blue-500 font-semibold">
            &lt; Back
          </button>
        </div>

        {/* Booking Info Section */}
        <h1 className="text-2xl font-bold mb-6">You are Booking To: <span className="text-gray-700">{pkg.agencyName || 'Agency Name'}</span></h1>

        {/* Package Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column for Package Details */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{pkg.eventname}</h2>
            <h3 className="text-lg mb-4">Price: <span className="text-green-600 font-bold">{pkg.price}</span></h3>
            <p className="mb-2"><strong>Inclusions:</strong> {pkg.packageinclusions}</p>
            <p className="mb-2"><strong>Exclusions:</strong> {pkg.exclusions}</p>
            <p className="mb-2"><strong>Pick-up Points:</strong> {pkg.pickupPoints}</p>
          </div>

          {/* Right column for Image and Payment Info */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Image
              src={pkg.image || "/default-image.jpg"} // Placeholder if no image available
              alt={pkg.eventname}
              width={400}
              height={250}
              className="rounded-lg mb-4"
            />
            <div>
              <p className="mb-2"><strong>Travel Agency Info:</strong> {pkg.travelagencyinfo}</p>
              <p className="mb-2"><strong>Contact:</strong> {pkg.contactNumber}</p>
              <p className="mb-2"><strong>Email:</strong> {pkg.email}</p>
              <p className="mb-2"><strong>Payments:</strong> {pkg.paymentInfo}</p>
            </div>
          </div>
        </div>

        {/* Joiner Details Form */}
        <h3 className="text-xl mt-4 font-semibold mb-4">Joiner Details:</h3>
        {trailId && pkg._id ? (
        <JoinerDetailsForm trailId={trailId} packageId={pkg._id}/>
        ) : (
          <p>Loading joiner details form...</p> // Fallback message while loading
        )}
        
      </div>
    </Center>
  );
}
