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
        >
            <OverlayView
                position={trail.geometry.location} // Updated to use centerCoordinates
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <h2>{trail.title}</h2>
            </OverlayView>
        </MarkerF>
    </div>
  )
}

export default Markers