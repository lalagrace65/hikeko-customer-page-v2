'use client';
import Image from "next/image";
import SectionHeaders from "../layout/SectionHeaders";
import MenuItem from "../menu/MenuItem";
export default function HomeMenu() {
  
  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        
      </div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={'check out'}
          mainHeader={'Our Best Sellers'} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />    
      </div>
    </section>
  );
}