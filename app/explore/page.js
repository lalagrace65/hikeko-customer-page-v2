"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import GlobalApi from "@/Shared/GlobalApi";
import CategoryList from "@/components/menu/CategoryList";
import RangeSelect from "@/components/menu/RangeSelect";
import SelectRating from "@/components/menu/SelectRating";
import GoogleMapView from "@/components/menu/GoogleMapView";
import TrailList from "@/components/menu/TrailList";
export default function ExplorePage() {
  const { data: session } = useSession();
  const [trailList, setTrailList] = useState([]);
  const router = useRouter();
  
useEffect(()=>{
  getGooglePlace();
},[])
  const getGooglePlace=()=>{
  GlobalApi.getGooglePlace().then((res)=>{
    console.log(res.data.product.results)
  })
}

  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-4 justify-center">
      <div className="p-3">
        <CategoryList/>
        <RangeSelect/>
        <SelectRating/>
      </div>
      <div className="col-span-3">
        <GoogleMapView trailList={trailList}/>
        <div className='md:absolute mx-2 w-[90%] md:w-[74%]  
           bottom-36 relative md:bottom-3'>
           <TrailList trailList={trailList}/>
        </div>
      </div>
    </div>
  );
}

