import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Make sure this is imported from next/navigation

export default function TrailDetail({ params }) {
  const { id } = params; // Get the ID from the dynamic params
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <p>Trail not found.</p>; // This may not trigger if the API returns data
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{trail.title}</h1>
      <img
        src={trail.trailImages[0]}
        alt={trail.title}
        className="w-full h-64 object-cover my-4"
      />
      <p><strong>Trail Class:</strong> {trail.trailClass}</p>
      <p><strong>Difficulty Level:</strong> {trail.difficultyLevel}</p>
      <p><strong>Elevation:</strong> {trail.elevation} masl</p>
      <p>{trail.description}</p>
    </div>
  );
}
