'use client';
import { SessionProvider } from "next-auth/react";
import { LoadScript } from '@react-google-maps/api';

export default function AppProvider({children}) {
  return (
    <SessionProvider>
      <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                mapId={'16b2c61749498632'}
        >
        {children}
        </LoadScript>
    </SessionProvider>
  )
}
