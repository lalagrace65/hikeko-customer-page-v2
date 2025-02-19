import React, { useRef, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import TrailItem from './TrailItem';

export default function TrailList() {
  const [trailData, setTrailData] = useState([]);
  const router = useRouter();

  const elementRef=useRef(null);
    //const {selectedBusiness,setSelectedBusiness}=useContext(SelectedBusinessContext)

    const slideRight=(element)=>{
        element.scrollLeft+=500;
    }
    const slideLeft=(element)=>{
        element.scrollLeft-=500;
    }

  useEffect(() => {
    fetch('/api/trails')
      .then(response => response.json())
      .then(data => {
        console.log('Received trail data:', data);
        setTrailData(data);
      })
      .catch(error => console.error('Error fetching trail data:', error));
  }, []);

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg"  
            fill="none" viewBox="0 0 24 24" 
            onClick={()=>slideLeft(elementRef.current)} 
            strokeWidth={1.5} stroke="currentColor" 
            className="w-8 h-8 absolute rotate-180 top-[35%]
            bg-gray-300 cursor-pointer p-1 rounded-full text-white">
            <path strokeLinecap="round" 
            strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>

      <h2 className="text-xl font-bold">Trail List</h2>
      {trailData.length > 0 ? (
        <div className="flex overflow-x-auto gap-2 
        scrollbar-hide scroll-smooth" ref={elementRef}>
          {trailData.map((trail) => (
            <TrailItem key={trail._id} trail={trail} />
          ))}
        </div>
      ) : (
        <p>No trails found.</p>
      )}
      <svg xmlns="http://www.w3.org/2000/svg"
      onClick={()=>slideRight(elementRef.current)} 
      fill="none" viewBox="0 0 24 24" 
      strokeWidth={1.5} stroke="currentColor" 
      className="w-8 h-8 absolute right-0 top-[35%]
      bg-gray-300 cursor-pointer p-1 rounded-full text-white">
      <path strokeLinecap="round" 
      strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
}