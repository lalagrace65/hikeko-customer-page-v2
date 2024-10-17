'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Center from "./Center";

export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email?.split('@')[0];
  if (userName && userName.includes(' ')){
    userName = userName.split(' ')[0];
  }
  return (
  <Center>
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
        Hikeko
        </Link>
          <Link href={'/'}>Home</Link>
            <Link href={'/explore'}>Explore</Link>
            <Link href={'/#about'}>About</Link>
            <Link href={'/contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
            {status === 'authenticated' && (
              <>
              <Link href={'/profile'} className="whitespace-nowrap">
                Hello, {userName}
              </Link>
              <button 
                onClick={() => signOut()} 
                className="bg-red-500 text-white py-2 px-8 rounded-full">
              Logout
              </button>
              </>
              
            )}
            {status === 'unauthenticated' && (
              <>
              <Link href={'/login'}>Login</Link>
              <Link href={'/register'} className="bg-red-500 text-white py-2 px-8 rounded-full">
                  Register
              </Link>
              </>
            )}
        </nav>
    </header>
  </Center>
  )
}
