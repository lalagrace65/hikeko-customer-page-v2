import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useContext } from 'react'


function Markers({trail}) {
  return (
    <div>
        <MarkerF 
            position={trail.geometry.location} // Updated to use centerCoordinates
            icon={{
                url: '/marker.png',
                scaledSize: {
                    width: 50,
                    height: 50,
                }
            }}
        />
    </div>
  )
}

export default Markers