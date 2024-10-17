'use client';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
    const session = useSession();

    const [userName, setUserName] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {status} = session;
    const [image, setImage] = useState('');
    const { toast } = useToast()

      useEffect(() => {
        if (status === 'authenticated') {
          setUserName(session.data.user.name);
          setImage(session.data.user.image);
        }
      }, [session, status]);

    async function handleProfileInfoUpdate(ev){
      ev.preventDefault();
      
      setSaved(false);
      setIsSaving(true);
      const response =  await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name:userName}),
      });
      setIsSaving(false);
      if (response.ok) {
        // toast({
        //   description: "Your profile has been updated",
        setSaved(true);
      }
    }
  
  async function handleFileChange(ev) {
    const files= ev.target.files;
    if (files?.length === 1) {
      const data = new FormData;
      data.set('file', files[0]);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
        //headers: {'Content-Type': 'multipart/form-data'}
      });
      // const link = await response.json();
      // setImage(link);
      const link = await response.json();
      setImage(link);
    }
  }

  if (status === 'loading') {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }


  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Profile
      </h1>
      <div className="max-w-md mx-auto">
        {/*notify user if saved */}
        {saved && (
          <h2 className="text-center bg-green-300 text-primary text-2xl mb-4">
            Profile Saved
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-300 text-primary text-2xl mb-4">
            Saving...
          </h2>
        )}
        <div className="flex gap-2 items-center">
            <div className=" p-2">
              {image && (
                <Image src={image} width={250} height={250} 
                className="rounded-lg w-full h-full mb-1" alt={'avatar'} />
              )}
                
                <Label htmlFor="picture">
                  <Input id="picture" type="file" className="hidden" onChange={handleFileChange} />
                  <span className="block border rounded-lg p-2 text-center cursor-pointer">
                    Edit
                  </span>
                </Label>
            </div>
            <form className="grow" onSubmit={handleProfileInfoUpdate}>
                <Input type="text" placeholder="First and Last Name" 
                value={userName} onChange={ev => setUserName(ev.target.value)}/>
                <Input type="email" disabled={true} value={session.data.user.email} />
                <Button type="submit">Save</Button>
            </form>
        </div>
      </div>
    </section>
  );
}