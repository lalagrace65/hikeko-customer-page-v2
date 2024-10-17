"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import Right from '../icons/Right';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Main FeaturePage Component
export default function FeaturePage() {
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const response = await fetch('/api/feature'); // Fetching from the API route
        const data = await response.json();
        setFeature(data);
      } catch (error) {
        console.error('Error fetching feature:', error);
      }
    };

    fetchFeature();
  }, []);   

  return (
    <>
      <section className="bg-gray-200 text-white py-12">
        <div className="container mx-auto grid grid-cols-2 gap-12 items-center">
          {/* Left Column - Text and Buttons */}
          <div>
            {feature ? (
              <>
                <h1 className="text-4xl font-semibold text-black">
                  {feature.titleText_1}
                </h1>
                <p className="text-gray-700 text-sm mb-6">
                  {feature.description_1}
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center bg-primary-500 px-4 py-2 rounded-full text-sm gap-2">
                    Learn more
                    <Right />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Skeleton height={32} width="80%" className="mb-4" />
                <Skeleton height={20} width="60%" className="mb-6" />
                <Skeleton height={40} width={150} className="rounded-full" />
              </>
            )}
          </div>

          {/* Right Column - Image */}
          <div className="relative h-64">
            {feature ? (
              feature.bannerImage_1 ? (
                <Image
                  src={feature.bannerImage_1[0]}
                  layout="fill"
                  objectFit="contain"
                  alt={feature.titleText_1}
                />
              ) : (
                <p>No image available</p>
              )
            ) : (
              <Skeleton height="100%" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
